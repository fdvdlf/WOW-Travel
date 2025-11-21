import { NextResponse } from "next/server";

import { getSessionFromCookies } from "@/lib/admin-auth";
import { updateConversationStatus } from "@/lib/chat-service";

export async function PATCH(request, { params }) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const { status } = payload || {};

  try {
    const conversation = await updateConversationStatus(params.id, status);
    return NextResponse.json({ conversation });
  } catch (error) {
    console.error("No se pudo actualizar el estado de la conversación", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el estado" },
      { status: 400 }
    );
  }
}
