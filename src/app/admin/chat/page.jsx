"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./chat.module.css";

const STATUS_LABELS = {
  open: "Abierta",
  pending: "Pendiente",
  closed: "Cerrada",
};

function formatDate(date) {
  if (!date) return "";
  const parsed = new Date(date);
  return parsed.toLocaleString();
}

function StatusBadge({ status }) {
  const base = `${styles.badge} ${
    status === "open"
      ? styles.badgeOpen
      : status === "pending"
        ? styles.badgePending
        : styles.badgeClosed
  }`;

  return <span className={base}>{STATUS_LABELS[status] || status}</span>;
}

function MessageBubble({ message }) {
  const kind =
    message.source === "bot"
      ? styles.bubbleBot
      : message.source === "agent"
        ? styles.bubbleAgent
        : styles.bubbleInbound;

  const label =
    message.source === "bot"
      ? "Bot"
      : message.source === "agent"
        ? "Agente"
        : "Cliente";

  return (
    <div className={`${styles.messageBubble} ${kind}`}>
      <p className={styles.messageContent}>{message.content}</p>
      <div className={styles.messageMeta}>
        <span className={styles.messageType}>{label}</span>
        <span>{formatDate(message.createdAt)}</span>
      </div>
    </div>
  );
}

function ConversationList({ conversations, selectedId, onSelect, statusFilter, setStatusFilter }) {
  return (
    <div className={styles.panelCard}>
      <div className={styles.headerRow}>
        <div>
          <strong>Conversaciones</strong>
          <p className="text-muted mb-0">Ultimas interacciones</p>
        </div>
        <select
          className={styles.filterSelect}
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">Todas</option>
          <option value="open">Abiertas</option>
          <option value="pending">Pendientes</option>
          <option value="closed">Cerradas</option>
        </select>
      </div>
      <div className={styles.conversationList}>
        {conversations.length === 0 ? (
          <div className={styles.emptyState}>No hay conversaciones para mostrar.</div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`${styles.conversationItem} ${
                selectedId === conversation.id ? styles.active : ""
              }`}
              onClick={() => onSelect(conversation.id)}
            >
              <div className={styles.conversationTitle}>
                <span className={styles.contactName}>
                  {conversation.contact.displayName || conversation.contact.whatsappNumber}
                </span>
                <StatusBadge status={conversation.status} />
              </div>
              <div className={styles.lastActivity}>{formatDate(conversation.lastMessageAt)}</div>
              {conversation.lastMessage?.content ? (
                <div className={styles.lastMessage}>{conversation.lastMessage.content}</div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messageBody, setMessageBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const selectedContact = useMemo(() => conversation?.contact || null, [conversation]);

  useEffect(() => {
    loadConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  useEffect(() => {
    if (selectedId) {
      loadConversation(selectedId);
    } else if (conversations.length > 0) {
      setSelectedId(conversations[0].id);
      loadConversation(conversations[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, conversations.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages?.length]);

  async function loadConversations() {
    const query = statusFilter !== "all" ? `?status=${statusFilter}` : "";
    const response = await fetch(`/api/admin/conversations${query}`);

    if (response.status === 401) {
      window.location.href = "/admin/login";
      return;
    }

    const payload = await response.json();
    setConversations(payload.conversations || []);
  }

  async function loadConversation(id) {
    if (!id) return;
    const response = await fetch(`/api/admin/conversations/${id}`);

    if (response.status === 401) {
      window.location.href = "/admin/login";
      return;
    }

    const payload = await response.json();
    if (response.ok) {
      setConversation(payload.conversation);
    }
  }

  async function sendMessage() {
    if (!messageBody.trim() || !selectedId) return;
    setSending(true);
    setError("");

    const response = await fetch("/api/admin/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: selectedId, content: messageBody.trim() }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      setError(payload?.error || "No se pudo enviar el mensaje");
      setSending(false);
      return;
    }

    setMessageBody("");
    setConversation((previous) =>
      previous
        ? { ...previous, messages: [...(previous.messages || []), payload.message] }
        : previous
    );
    await loadConversations();
    setSending(false);
  }

  async function updateStatus(nextStatus) {
    if (!selectedId || conversation?.status === nextStatus) return;
    const response = await fetch(`/api/admin/conversations/${selectedId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    const payload = await response.json().catch(() => null);
    if (response.ok) {
      setConversation((prev) => (prev ? { ...prev, status: payload.conversation.status } : prev));
      loadConversations();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className={styles.chatLayout}>
      <ConversationList
        conversations={conversations}
        selectedId={selectedId}
        onSelect={setSelectedId}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className={`${styles.panelCard} ${styles.messagePanel}`}>
        <div className={styles.headerRow}>
          <div>
            <strong>{selectedContact?.displayName || selectedContact?.whatsappNumber || "Selecciona un chat"}</strong>
            <p className="text-muted mb-0">
              {selectedContact?.whatsappNumber ? `+${selectedContact.whatsappNumber}` : ""}
            </p>
          </div>
          {conversation?.status ? <StatusBadge status={conversation.status} /> : null}
        </div>

        <div className={styles.messageList}>
          {conversation?.messages?.length ? (
            conversation.messages.map((message) => (
              <MessageBubble message={message} key={message.id} />
            ))
          ) : (
            <div className={styles.emptyState}>No hay mensajes para esta conversación.</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.composer}>
          <textarea
            value={messageBody}
            onChange={(event) => setMessageBody(event.target.value)}
            placeholder="Escribe una respuesta al cliente"
            disabled={!selectedId || sending}
          />
          <button
            className={styles.primaryButton}
            onClick={sendMessage}
            disabled={!selectedId || sending}
          >
            {sending ? "Enviando..." : "Enviar"}
          </button>
        </div>
        {error ? <div className={styles.errorBox}>{error}</div> : null}
      </div>

      <div className={`${styles.panelCard} ${styles.metaPanel}`}>
        <div className={styles.headerRow}>
          <div>
            <strong>Detalles</strong>
            <p className="text-muted mb-0">Contacto y estado</p>
          </div>
          <button className={styles.secondaryButton} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        {conversation ? (
          <div className="p-2">
            <div className={styles.statusControls}>
              {Object.keys(STATUS_LABELS).map((statusKey) => (
                <button
                  key={statusKey}
                  className={styles.secondaryButton}
                  onClick={() => updateStatus(statusKey)}
                  disabled={conversation.status === statusKey}
                >
                  {STATUS_LABELS[statusKey]}
                </button>
              ))}
            </div>

            <div className={styles.metaRow}>
              <span>Contacto</span>
              <span className={styles.metaValue}>
                {selectedContact?.displayName || selectedContact?.whatsappNumber || "Sin nombre"}
              </span>
            </div>
            <div className={styles.metaRow}>
              <span>Número</span>
              <span className={styles.metaValue}>{selectedContact?.whatsappNumber || "-"}</span>
            </div>
            <div className={styles.metaRow}>
              <span>Último mensaje</span>
              <span className={styles.metaValue}>{formatDate(conversation.lastMessageAt)}</span>
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>Selecciona una conversación para ver detalles.</div>
        )}
      </div>
    </div>
  );
}
