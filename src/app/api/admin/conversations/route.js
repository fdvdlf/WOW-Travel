import { NextResponse } from "next/server";

import { getSessionFromCookies } from "@/lib/admin-auth";
import { listConversations } from "@/lib/chat-service";

export async function GET(request) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    const conversations = await listConversations(status);
    const payload = conversations.map((conversation) => {
      const lastMessage = conversation.messages?.[0];
      return {
        id: conversation.id,
        status: conversation.status,
        lastMessageAt: conversation.lastMessageAt,
        contact: conversation.contact,
        lastMessage: lastMessage
          ? {
              id: lastMessage.id,
              content: lastMessage.content,
              direction: lastMessage.direction,
              source: lastMessage.source,
              createdAt: lastMessage.createdAt,
            }
          : null,
      };
    });

    return NextResponse.json({ conversations: payload });
  } catch (error) {
    console.error("No se pudieron listar las conversaciones", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las conversaciones" },
      { status: 500 }
    );
  }
}
