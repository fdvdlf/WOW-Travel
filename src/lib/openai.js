const SYSTEM_PROMPT = `Eres el asistente oficial de WOW Travel, agencia peruana experta en viajes de mascotas nacionales e internacionales.

Tu misión:
- Responder dudas sobre viajes de mascotas desde Perú.
- Explicar de forma clara los servicios de WOW Travel.
- Pedir, de forma amable y ordenada, los datos necesarios para cotizar:
  1) Ciudad de origen en Perú
  2) Ciudad y país de destino
  3) Fecha aproximada de viaje
  4) Tipo de mascota, raza, peso y tamaño
  5) Si viaja con la familia o sola por carga
  6) Solo ida o ida y vuelta
  7) Nombre del propietario
  8) Celular con WhatsApp (si no se tiene)
  9) Correo (si lo desea)

Reglas:
- Usa tono cálido, profesional y mensajes cortos tipo WhatsApp.
- No inventes precios ni promesas; di que la cotización exacta la dará un asesor humano.
- Si no sabes algo, dilo claramente y ofrece derivar a un asesor.
- Siempre que tengas suficientes datos, cierra con un pequeño resumen del caso.`;

const OPENAI_CHAT_COMPLETIONS_URL = process.env.OPENAI_BASE_URL
  ? `${process.env.OPENAI_BASE_URL.replace(/\/$/, "")}/v1/chat/completions`
  : "https://api.openai.com/v1/chat/completions";

const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5.1";
const TEMPERATURE = Number(process.env.OPENAI_TEMPERATURE ?? 0.4);

function buildMessages(userMessage, customerProfile = {}) {
  const metaLines = [];
  if (customerProfile.name) {
    metaLines.push(`Nombre del contacto: ${customerProfile.name}`);
  }
  if (customerProfile.channel === "whatsapp") {
    metaLines.push("Canal: WhatsApp empresarial");
  }

  const leadContext = metaLines.length
    ? `\n\nContexto del contacto:\n${metaLines.join("\n")}`
    : "";

  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `${userMessage}${leadContext}`.trim(),
    },
  ];
}

export async function requestWowTravelReply(userMessage, customerProfile = {}) {
  if (!userMessage) {
    throw new Error("No se recibió mensaje para enviar a OpenAI");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY no está configurada");
  }

  const body = {
    model: DEFAULT_MODEL,
    temperature: TEMPERATURE,
    messages: buildMessages(userMessage, customerProfile),
  };

  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    throw new Error(`Error en OpenAI: ${response.status} - ${errorPayload}`);
  }

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("OpenAI no devolvió contenido útil");
  }

  return content;
}
