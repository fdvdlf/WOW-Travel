import prisma, {
  ConversationStatus,
  MessageDirection,
  MessageSource,
} from "./prisma";

const VALID_STATUSES = new Set([
  ConversationStatus.open,
  ConversationStatus.pending,
  ConversationStatus.closed,
]);

function mergeMetadata(existingMetadata, incomingMetadata = {}) {
  const merged = { ...(existingMetadata || {}), ...incomingMetadata };
  return Object.keys(merged).length ? merged : undefined;
}

export async function upsertContact({ whatsappNumber, displayName, phoneNumberId, metadata }) {
  if (!whatsappNumber) {
    throw new Error("El número de WhatsApp es obligatorio para crear el contacto");
  }

  const existing = await prisma.contact.findUnique({ where: { whatsappNumber } });
  let mergedMetadata = mergeMetadata(existing?.metadata, metadata);
  if (phoneNumberId) {
    const current = mergedMetadata || {};
    mergedMetadata = { ...current, lastPhoneNumberId: phoneNumberId };
  }

  if (existing) {
    return prisma.contact.update({
      where: { id: existing.id },
      data: {
        displayName: existing.displayName || displayName || undefined,
        metadata: mergedMetadata ?? existing.metadata,
      },
    });
  }

  return prisma.contact.create({
    data: {
      whatsappNumber,
      displayName,
      metadata: mergedMetadata,
    },
  });
}

export async function getOrCreateConversation(contactId) {
  const existing = await prisma.conversation.findFirst({
    where: { contactId, status: { not: ConversationStatus.closed } },
    orderBy: { updatedAt: "desc" },
  });

  if (existing) {
    return existing;
  }

  return prisma.conversation.create({ data: { contactId } });
}

export async function recordMessage({ conversationId, direction, source, content, rawPayload }) {
  const message = await prisma.message.create({
    data: {
      conversationId,
      direction,
      source,
      content,
      rawPayload,
    },
  });

  await prisma.conversation.update({
    where: { id: conversationId },
    data: { lastMessageAt: new Date() },
  });

  return message;
}

export async function listConversations(status) {
  const where = status && VALID_STATUSES.has(status) ? { status } : {};

  return prisma.conversation.findMany({
    where,
    include: {
      contact: true,
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { lastMessageAt: "desc" },
  });
}

export async function getConversationWithMessages(id) {
  const conversationId = Number(id);
  if (Number.isNaN(conversationId)) return null;

  return prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      contact: true,
      messages: { orderBy: { createdAt: "asc" } },
    },
  });
}

export async function updateConversationStatus(id, status) {
  const conversationId = Number(id);
  if (!VALID_STATUSES.has(status)) {
    throw new Error("Estado de conversación inválido");
  }

  return prisma.conversation.update({
    where: { id: conversationId },
    data: { status },
  });
}

export async function ensureConversationForContact({ whatsappNumber, displayName, phoneNumberId, metadata }) {
  const contact = await upsertContact({
    whatsappNumber,
    displayName,
    phoneNumberId,
    metadata,
  });

  const conversation = await getOrCreateConversation(contact.id);

  return { contact, conversation };
}

export async function recordInboundMessage({ conversationId, content, rawPayload }) {
  return recordMessage({
    conversationId,
    direction: MessageDirection.inbound,
    source: MessageSource.whatsapp,
    content,
    rawPayload,
  });
}

export async function recordBotMessage({ conversationId, content, rawPayload }) {
  return recordMessage({
    conversationId,
    direction: MessageDirection.outbound,
    source: MessageSource.bot,
    content,
    rawPayload,
  });
}

export async function recordAgentMessage({ conversationId, content, rawPayload }) {
  return recordMessage({
    conversationId,
    direction: MessageDirection.outbound,
    source: MessageSource.agent,
    content,
    rawPayload,
  });
}

export { ConversationStatus, MessageDirection, MessageSource };
