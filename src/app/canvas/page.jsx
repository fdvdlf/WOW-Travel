import { Layout } from "@/layouts/Layout";

const canvasData = [
  {
    key: "partners",
    title: "Asociaciones clave",
    accent: "ocean",
    description:
      "Aliados estratégicos que fortalecen la oferta de la plataforma y amplían su alcance.",
    items: [
      "Instituciones de formación",
      "Bolsas de trabajo",
      "Organismos de cooperación",
    ],
  },
  {
    key: "activities",
    title: "Actividades clave",
    accent: "teal",
    description:
      "Procesos centrales que aseguran que los educadores reciben retos reales y acompañamiento.",
    items: [
      "Diseño e integración de retos reales",
      "Calibración de algoritmos de aprendizaje",
      "Evaluación con feedback de expertos",
    ],
  },
  {
    key: "value",
    title: "Propuesta de valor",
    accent: "amber",
    description:
      "Una experiencia de aprendizaje práctica que conecta talento con necesidades reales del mercado.",
    items: [
      "Planificador Inteligente (IA)",
      "Simulador de experiencia",
      "Doble certificación",
    ],
  },
  {
    key: "relationships",
    title: "Relaciones con los clientes",
    accent: "rose",
    description:
      "Acompañamiento personalizado para garantizar adopción y resultados medibles.",
    items: ["Mentoría híbrida", "Ejecutivo de cuentas", "Feedback de expertos"],
  },
  {
    key: "segments",
    title: "Segmentos del mercado",
    accent: "indigo",
    description: "Públicos principales con necesidades diferenciadas.",
    items: ["Recién Egresados (B2C)", "Empresas Privadas (B2B)", "Organismos de cooperación"],
  },
  {
    key: "resources",
    title: "Recursos clave",
    accent: "violet",
    description:
      "Activos tecnológicos y humanos que sostienen la entrega de valor.",
    items: [
      "Plataforma web con almacenamiento propio",
      "Repositorio de casos de cooperación",
      "Staff de expertos",
    ],
  },
  {
    key: "channels",
    title: "Canales",
    accent: "sky",
    description:
      "Puntos de contacto que facilitan la adquisición y la experiencia de los usuarios.",
    items: [
      "Plataforma Web (SaaS)",
      "Suscripción y freemium",
      "Venta directa B2B",
    ],
  },
  {
    key: "costs",
    title: "Estructura de costes",
    accent: "slate",
    description: "Principales inversiones necesarias para operar y escalar.",
    items: [
      "Desarrollo tecnológico in-house",
      "Honorarios de expertos",
      "Relaciones para cooperación internacional",
      "Costo de adquisición de clientes",
    ],
  },
  {
    key: "revenues",
    title: "Fuentes de ingresos",
    accent: "emerald",
    description: "Modelos de monetización que aseguran la sostenibilidad.",
    items: ["Modelo modular", "Suscripción corporativa"],
  },
];

const areaClassnames = {
  partners: "canvas-card canvas-card--partners",
  activities: "canvas-card canvas-card--activities",
  value: "canvas-card canvas-card--value",
  relationships: "canvas-card canvas-card--relationships",
  segments: "canvas-card canvas-card--segments",
  resources: "canvas-card canvas-card--resources",
  channels: "canvas-card canvas-card--channels",
  costs: "canvas-card canvas-card--costs",
  revenues: "canvas-card canvas-card--revenues",
};

const accentMap = {
  ocean: "#4CA6E8",
  teal: "#3FB6A8",
  amber: "#F5A524",
  rose: "#F178B6",
  indigo: "#6C63FF",
  violet: "#9B7BFF",
  sky: "#43C6FF",
  slate: "#6A7C92",
  emerald: "#31C48D",
};

const CanvasCard = ({ title, items, description, accent, className }) => (
  <div className={className}>
    <div className="canvas-card__eyebrow" style={{ color: accentMap[accent] }}>
      {title}
    </div>
    <p className="canvas-card__description">{description}</p>
    <ul className="canvas-card__list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function CanvasLandingPage() {
  return (
    <Layout header={3} footer={1}>
      <section className="canvas-hero section-py">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="canvas-hero__badge">Lienzo estratégico</div>
              <h1 className="canvas-hero__title">
                Visualiza el modelo de negocio de un vistazo
              </h1>
              <p className="canvas-hero__subtitle">
                Integramos innovación educativa, alianzas y tecnología para ofrecer
                experiencias prácticas que conectan talento con necesidades reales.
              </p>
              <div className="canvas-hero__highlights">
                <div className="highlight-chip">Aprendizaje basado en retos</div>
                <div className="highlight-chip">IA que acompaña y optimiza</div>
                <div className="highlight-chip">Certificación con propósito</div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="canvas-hero__panel">
                <p className="canvas-hero__panel-eyebrow">Por qué este lienzo</p>
                <h3>Claridad, foco y decisiones rápidas</h3>
                <p>
                  El modelo condensa la propuesta de valor y los pilares operativos
                  en un formato comprensible para inversionistas, equipos y aliados.
                </p>
                <div className="canvas-hero__stats">
                  <div>
                    <span>+120</span>
                    <small>Casos aplicados</small>
                  </div>
                  <div>
                    <span>98%</span>
                    <small>Satisfacción de alumnos</small>
                  </div>
                  <div>
                    <span>24/7</span>
                    <small>Seguimiento inteligente</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="canvas-grid section-py">
        <div className="container">
          <div className="section__title text-center">
            <span className="sub-title">Modelo Canvas</span>
            <h2 className="title">Así se articula nuestra propuesta</h2>
            <p>
              Cada bloque combina tecnología, acompañamiento y alianzas para
              entregar valor real a estudiantes, empresas y organizaciones.
            </p>
          </div>

          <div className="canvas-grid__layout">
            {canvasData.map((card) => (
              <CanvasCard
                key={card.key}
                title={card.title}
                items={card.items}
                description={card.description}
                accent={card.accent}
                className={areaClassnames[card.key]}
              />
            ))}
          </div>

          <div className="canvas-cta">
            <div>
              <p className="canvas-cta__eyebrow">¿Listo para activarlo?</p>
              <h3>Conversemos sobre cómo adaptar este modelo a tu organización.</h3>
              <p>
                Creamos rutas a medida para equipos corporativos, becas de
                cooperación y programas intensivos para jóvenes profesionales.
              </p>
            </div>
            <a
              className="btn"
              href="https://wa.me/51941482291"
              target="_blank"
              rel="noreferrer"
            >
              Hablemos ahora
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
