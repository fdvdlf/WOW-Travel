import { NextResponse } from "next/server";

import { ensureContactHistory, hasRecentInteraction } from "@/lib/contact-history";
import { requestWowTravelReply } from "@/lib/openai";
import { sendWhatsAppTextMessage } from "@/lib/whatsapp";

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const FALLBACK_MESSAGE =
  "Gracias por contactarnos. En este momento no puedo procesar tu solicitud, pero un asesor de WOW Travel te apoyará enseguida.";

function extractMessageText(message = {}) {
  if (message.text?.body) {
    return message.text.body;
  }

  if (message.interactive?.list_reply?.title) {
    return message.interactive.list_reply.title;
  }

  if (message.interactive?.button_reply?.title) {
    return message.interactive.button_reply.title;
  }

  if (message.button?.text) {
    return message.button.text;
  }

  if (message.type === "reaction" && message.reaction?.emoji) {
    return `El cliente reaccionó con ${message.reaction.emoji}`;
  }

  return null;
}

function getContactName(contacts = [], waId) {
  const contact = contacts.find((item) => item.wa_id === waId);
  return contact?.profile?.name;
}

async function handleIncomingMessage({ metadata, message, contacts }) {
  const body = extractMessageText(message);
  if (!body) {
    return;
  }

  const phoneNumberId = metadata?.phone_number_id;
  const profileName = getContactName(contacts, message.from) || message.profile?.name;
  const waId = message.from;

  if (hasRecentInteraction(waId)) {
    return;
  }

  ensureContactHistory(waId);

  try {
    const aiReply = await requestWowTravelReply(body, {
      name: profileName,
      channel: "whatsapp",
    });

    await sendWhatsAppTextMessage({
      phoneNumberId,
      to: message.from,
      body: aiReply,
    });
  } catch (error) {
    console.error("Error procesando el mensaje de WhatsApp", error);

    try {
      await sendWhatsAppTextMessage({
        phoneNumberId,
        to: message.from,
        body: FALLBACK_MESSAGE,
      });
    } catch (sendError) {
      console.error("No se pudo enviar el mensaje de respaldo", sendError);
    }
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Token inválido", { status: 403 });
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    console.error("No se pudo parsear el payload del webhook", error);
    return NextResponse.json({ received: false }, { status: 400 });
  }

  if (!payload?.entry) {
    return NextResponse.json({ received: false }, { status: 200 });
  }

  const tasks = [];

  for (const entry of payload.entry) {
    for (const change of entry.changes ?? []) {
      const value = change.value || {};
      const messages = value.messages || [];

      for (const message of messages) {
        tasks.push(
          handleIncomingMessage({
            metadata: value.metadata || {},
            message,
            contacts: value.contacts || [],
          })
        );
      }
    }
  }

  await Promise.all(tasks);

  return NextResponse.json({ received: true }, { status: 200 });
}
