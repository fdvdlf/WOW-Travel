import {
  ConversationStatus,
  MessageDirection,
  MessageSource,
  AgentRole,
} from "./prisma-enums";

let contactIdSeq = 1;
let conversationIdSeq = 1;
let messageIdSeq = 1;
let agentIdSeq = 1;

const contacts = [];
const conversations = [];
const messages = [];
const agents = [];

function now() {
  return new Date();
}

function matchesWhere(entity, where = {}) {
  return Object.entries(where).every(([key, value]) => {
    if (value && typeof value === "object" && "not" in value) {
      return entity[key] !== value.not;
    }
    return entity[key] === value;
  });
}

function orderBy(items, order) {
  if (!order) return items;
  const [[field, direction]] = Object.entries(order);
  const dir = direction === "desc" ? -1 : 1;
  return [...items].sort((a, b) => (a[field] > b[field] ? dir : -dir));
}

function take(items, limit) {
  if (typeof limit !== "number") return items;
  return items.slice(0, limit);
}

function includeRelations(entity, include) {
  if (!include) return entity;
  const copy = { ...entity };
  if (include.contact) {
    copy.contact = contacts.find((c) => c.id === entity.contactId) || null;
  }
  if (include.messages) {
    const messageOrder = include.messages.orderBy;
    const limit = include.messages.take;
    copy.messages = take(
      orderBy(messages.filter((m) => m.conversationId === entity.id), messageOrder),
      limit
    );
  }
  return copy;
}

const contact = {
  async findUnique({ where }) {
    const key = Object.keys(where)[0];
    return contacts.find((c) => c[key] === where[key]) || null;
  },
  async create({ data }) {
    const created = {
      id: contactIdSeq++,
      displayName: data.displayName ?? null,
      metadata: data.metadata,
      whatsappNumber: data.whatsappNumber,
      createdAt: now(),
      updatedAt: now(),
    };
    contacts.push(created);
    return created;
  },
  async update({ where, data }) {
    const current = await this.findUnique({ where });
    if (!current) return null;
    Object.assign(current, data, { updatedAt: now() });
    return current;
  },
};

const conversation = {
  async findFirst({ where, orderBy: order }) {
    const filtered = conversations.filter((c) => matchesWhere(c, where));
    return orderBy(filtered, order)[0] || null;
  },
  async findUnique({ where, include }) {
    const entity = conversations.find((c) => c.id === where.id);
    if (!entity) return null;
    return includeRelations(entity, include);
  },
  async findMany({ where = {}, include, orderBy: order }) {
    const filtered = conversations.filter((c) => matchesWhere(c, where));
    const ordered = orderBy(filtered, order);
    return ordered.map((c) => includeRelations(c, include));
  },
  async create({ data }) {
    const created = {
      id: conversationIdSeq++,
      contactId: data.contactId,
      status: data.status || ConversationStatus.open,
      lastMessageAt: now(),
      createdAt: now(),
      updatedAt: now(),
      takenByAgentId: data.takenByAgentId ?? null,
    };
    conversations.push(created);
    return created;
  },
  async update({ where, data }) {
    const entity = conversations.find((c) => c.id === where.id);
    if (!entity) return null;
    Object.assign(entity, data, { updatedAt: now() });
    return entity;
  },
};

const message = {
  async create({ data }) {
    const created = {
      id: messageIdSeq++,
      conversationId: data.conversationId,
      direction: data.direction,
      source: data.source,
      content: data.content,
      rawPayload: data.rawPayload,
      createdAt: now(),
      updatedAt: now(),
    };
    messages.push(created);
    return created;
  },
};

const agentUser = {
  async create({ data }) {
    const created = {
      id: agentIdSeq++,
      ...data,
      createdAt: now(),
      updatedAt: now(),
    };
    agents.push(created);
    return created;
  },
};

const prisma = {
  contact,
  conversation,
  message,
  agentUser,
  _data: { contacts, conversations, messages, agents },
};

export {
  ConversationStatus,
  MessageDirection,
  MessageSource,
  AgentRole,
};

export default prisma;
