const GRAPH_API_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v20.0";
const GRAPH_API_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

function buildGraphUrl(phoneNumberId) {
  if (!phoneNumberId) {
    throw new Error("No se recibió phone_number_id desde WhatsApp");
  }
  return `${GRAPH_API_BASE_URL}/${phoneNumberId}/messages`;
}

export async function sendWhatsAppTextMessage({ phoneNumberId, to, body }) {
  const token = process.env.WHATSAPP_TOKEN;
  if (!token) {
    throw new Error("WHATSAPP_TOKEN no está configurado");
  }
  if (!to) {
    throw new Error("El número de destino es obligatorio");
  }
  if (!body) {
    throw new Error("El mensaje a enviar está vacío");
  }

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: {
      preview_url: false,
      body,
    },
  };

  const response = await fetch(buildGraphUrl(phoneNumberId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    throw new Error(`Error al enviar mensaje de WhatsApp: ${response.status} - ${errorPayload}`);
  }

  return response.json();
}
