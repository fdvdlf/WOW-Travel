export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/51941482291"
      target="_blank"
      rel="noreferrer"
      aria-label="Conversemos por WhatsApp"
    >
      <i className="fab fa-whatsapp" aria-hidden="true"></i>
      <span className="whatsapp-label">Conversemos</span>
    </a>
  );
}
