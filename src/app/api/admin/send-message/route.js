import { NextResponse } from "next/server";

import { getSessionFromCookies } from "@/lib/admin-auth";
import { recordAgentMessage } from "@/lib/chat-service";
import prisma from "@/lib/prisma";
import { sendWhatsAppTextMessage } from "@/lib/whatsapp";

function resolvePhoneNumberId(contact) {
  const stored = contact?.metadata?.lastPhoneNumberId;
  return stored || process.env.WHATSAPP_PHONE_NUMBER_ID;
}

export async function POST(request) {
  const session = getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const { conversationId, content } = payload || {};

  if (!conversationId || !content) {
    return NextResponse.json(
      { error: "conversationId y content son obligatorios" },
      { status: 400 }
    );
  }

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: Number(conversationId) },
      include: { contact: true },
    });

    if (!conversation) {
      return NextResponse.json({ error: "La conversación no existe" }, { status: 404 });
    }

    const phoneNumberId = resolvePhoneNumberId(conversation.contact);
    if (!phoneNumberId) {
      return NextResponse.json(
        { error: "No se encuentra phone_number_id para esta conversación" },
        { status: 500 }
      );
    }

    await sendWhatsAppTextMessage({
      phoneNumberId,
      to: conversation.contact.whatsappNumber,
      body: content,
    });

    const message = await recordAgentMessage({
      conversationId: conversation.id,
      content,
      rawPayload: { sentBy: session.username },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error("No se pudo enviar el mensaje manual", error);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje" },
      { status: 500 }
    );
  }
}
