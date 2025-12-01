import { NextResponse } from "next/server";

import { getSessionFromCookies } from "@/lib/admin-auth";
import { getConversationWithMessages } from "@/lib/chat-service";

export async function GET(request, { params }) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const conversation = await getConversationWithMessages(params.id);

    if (!conversation) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    return NextResponse.json({ conversation });
  } catch (error) {
    console.error("No se pudo cargar la conversación", error);
    return NextResponse.json(
      { error: "No se pudo cargar la conversación" },
      { status: 500 }
    );
  }
}
