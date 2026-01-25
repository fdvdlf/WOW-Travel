"use client";

import React, { useState } from "react";
import Link from "next/link";

const wLogo = "/logo/w_logo.png";
const footerShape01 = "/images/footer_shape01.png";
const footerShape02 = "/images/footer_shape02.png";

export const FooterOne = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const openTerms = () => setIsTermsOpen(true);
  const closeTerms = () => setIsTermsOpen(false);
  const openPrivacy = () => setIsPrivacyOpen(true);
  const closePrivacy = () => setIsPrivacyOpen(false);
  const openJobs = () => setIsJobsOpen(true);
  const closeJobs = () => setIsJobsOpen(false);
  const openFaq = () => setIsFaqOpen(true);
  const closeFaq = () => setIsFaqOpen(false);
  const openAbout = () => setIsAboutOpen(true);
  const closeAbout = () => setIsAboutOpen(false);

  const handleOverlayClick = (onClose) => (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <footer>
        <div className="footer__area">
          <div className="footer__top fix">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="footer__widget">
                    <div className="footer__logo">
                      <Link href="/">
                        <img src={wLogo} alt="WOW Travel" />
                      </Link>
                    </div>
                    <div className="footer__content">
                      <p>RUC: 20614994259</p>
                      <a href="tel:+51941482291">+51 941 482 291</a>
                      <a href="mailto:contacto@wowtravel.pe">contacto@wowtravel.pe</a>
                    </div>
                    <div className="footer__social">
                      <h6 className="title">Síguenos en:</h6>
                      <ul className="list-wrap">
                        <li>
                          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/company/wowtravel-pe/" target="_blank" rel="noreferrer">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                  <div className="footer__widget">
                    <h4 className="footer__widget-title">Enlaces útiles</h4>
                    <div className="footer__link">
                      <ul className="list-wrap">
                        <li>
                          <button type="button" className="footer__link-button" onClick={openFaq}>
                            Preguntas frecuentes
                          </button>
                        </li>
                        <li>
                          <button type="button" className="footer__link-button" onClick={openAbout}>
                            Sobre WOW Travel
                          </button>
                        </li>
                        <li>
                          <Link href="/proceso">Cómo funciona el proceso</Link>
                        </li>
                        <li>
                          <Link href="/contacto">Contacto</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                  <div className="footer__widget">
                    <h4 className="footer__widget-title">Atención 24/7</h4>
                    <div className="footer__link">
                      <ul className="list-wrap">
                        <li>Estamos disponibles para ti las 24 horas, los 7 días.</li>
                        <li>
                          <strong>Horario de citas:</strong> 09:00 - 19:00 (hora de Lima).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="footer__widget">
                    <div className="footer__newsletter faq-promo">
                      <h2 className="title">Preguntas frecuentes</h2>
                      <p className="mb-3">
                        Resolvemos las dudas más comunes sobre viajes de mascotas para que tengas claridad en cada paso del proceso.
                      </p>
                      <button className="btn" type="button" onClick={openFaq}>
                        Ver respuestas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer__shape-wrap">
              <img src={footerShape01} alt="footer shape" data-aos="fade-up-right" data-aos-delay="400" />
              <img src={footerShape02} alt="footer shape" data-aos="fade-up-left" data-aos-delay="400" />
            </div>
          </div>

          <div className="footer__bottom">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <div className="footer__bottom-menu">
                    <ul className="list-wrap">
                      <li>
                        <button type="button" className="footer__link-button" onClick={openTerms}>
                          Términos y condiciones
                        </button>
                      </li>
                      <li>
                        <button type="button" className="footer__link-button" onClick={openPrivacy}>
                          Política de privacidad
                        </button>
                      </li>
                      <li>
                        <button type="button" className="footer__link-button" onClick={openJobs}>
                          Trabaja con nosotros
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="copyright-text text-end">
                    <p>© 2025 WOW Travel - Todos los derechos reservados.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {isTermsOpen && (
        <div className="terms-modal__overlay" onClick={handleOverlayClick(closeTerms)}>
          <div className="terms-modal">
            <div className="terms-modal__header">
              <h3 className="terms-modal__title">Términos y condiciones</h3>
              <button type="button" className="terms-modal__close" onClick={closeTerms} aria-label="Cerrar">
                ×
              </button>
            </div>
            <div className="terms-modal__body">
              <p>
                WOW Travel brinda asesoría especializada y gestión documentaria para viajes de mascotas, acompañando a las familias en
                cada paso del proceso. Nuestro objetivo es ayudarte a que el viaje de tu mascota sea claro, ordenado y seguro.
              </p>
              <p>
                Trabajamos con información actualizada sobre requisitos sanitarios, certificaciones, documentos y validaciones
                necesarias para el país de destino. Todas las gestiones se realizan con responsabilidad, transparencia y compromiso.
              </p>
              <p>
                El cliente se compromete a proporcionar información veraz, cumplir los tiempos recomendados y asegurar que su mascota
                reciba la atención veterinaria correspondiente para el viaje.
              </p>
              <p>
                Protegemos tu información personal y la utilizamos exclusivamente para fines relacionados con el proceso de viaje y la
                comunicación contigo.
              </p>
              <p>Para cualquier consulta o apoyo adicional, puedes escribirnos a contacto@wowtravel.pe</p>
            </div>
            <div className="terms-modal__footer">
              <button type="button" className="btn" onClick={closeTerms}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isPrivacyOpen && (
        <div className="terms-modal__overlay" onClick={handleOverlayClick(closePrivacy)}>
          <div className="terms-modal">
            <div className="terms-modal__header">
              <h3 className="terms-modal__title">Política de privacidad</h3>
              <button type="button" className="terms-modal__close" onClick={closePrivacy} aria-label="Cerrar">
                ×
              </button>
            </div>
            <div className="terms-modal__body">
              <p>
                En WOW Travel valoramos tu confianza. La información que compartes con nosotros se utiliza únicamente para ayudarte en
                el proceso de viaje de tu mascota y para mantener una comunicación clara y ordenada contigo.
              </p>
              <p>
                Tratamos tus datos personales con responsabilidad y cuidado. Solo solicitamos la información necesaria para gestionar
                trámites documentarios, coordinar servicios y brindarte una asesoría adecuada según el destino de tu mascota.
              </p>
              <p>
                No compartimos tu información con terceros, excepto cuando sea indispensable para completar un trámite que tú hayas
                solicitado (por ejemplo, validaciones sanitarias o coordinación documentaria).
              </p>
              <p>
                Puedes escribirnos en cualquier momento si deseas actualizar, corregir o consultar los datos que tenemos registrados.
              </p>
              <p>Para dudas o consultas, contáctanos a contacto@wowtravel.pe</p>
            </div>
            <div className="terms-modal__footer">
              <button type="button" className="btn" onClick={closePrivacy}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isAboutOpen && (
        <div className="terms-modal__overlay" onClick={handleOverlayClick(closeAbout)}>
          <div className="terms-modal">
            <div className="terms-modal__header">
              <h3 className="terms-modal__title">Sobre WOW Travel</h3>
              <button type="button" className="terms-modal__close" onClick={closeAbout} aria-label="Cerrar">
                ×
              </button>
            </div>
            <div className="terms-modal__body">
              <p>
                WOW Travel nació después de vivir una experiencia personal muy difícil. Cuando buscamos preparar el viaje de nuestra
                mascota, encontramos servicios confusos, malas prácticas y una atención que complicó todo aún más. La situación terminó
                saliendo peor y llegó a convertirse en una urgencia que tuvimos que resolver por nuestra cuenta, sin orientación ni
                apoyo real.
              </p>
              <p>
                Esa vivencia nos motivó a crear WOW Travel, una empresa que trabaja con transparencia, empatía y responsabilidad,
                acompañando de verdad a quienes desean que su mascota viaje segura, tranquila y con todos sus documentos en regla.
              </p>
              <p>
                Contamos con personal con más de diez años de experiencia en el rubro y con una red de apoyo altamente calificada que
                respalda nuestro trabajo. Esto nos permite gestionar cada caso con claridad, seriedad y atención personalizada.
              </p>
              <p>
                Acompañamos a cada familia paso a paso, explicando cada documento y guiando todo el proceso para que nadie vuelva a
                pasar por la incertidumbre que nosotros vivimos. Nuestro propósito es lograr que cada mascota viaje protegida, cuidada
                y con amor.
              </p>
              <p>contacto@wowtravel.pe</p>
            </div>
            <div className="terms-modal__footer">
              <button type="button" className="btn" onClick={closeAbout}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isJobsOpen && (
        <div className="terms-modal__overlay" onClick={handleOverlayClick(closeJobs)}>
          <div className="terms-modal">
            <div className="terms-modal__header">
              <h3 className="terms-modal__title">Trabaja con nosotros</h3>
              <button type="button" className="terms-modal__close" onClick={closeJobs} aria-label="Cerrar">
                ×
              </button>
            </div>
            <div className="terms-modal__body">
              <h4 className="terms-modal__subtitle">Estamos buscando un Asesor Comercial</h4>
              <p>
                En WOW Travel buscamos sumar a nuestro equipo a una persona comprometida, con actitud proactiva, excelente trato con
                clientes y una verdadera pasión por los animales. Queremos a alguien que disfrute acompañar a las familias en el
                proceso de viaje de sus mascotas, con sensibilidad, paciencia y vocación de servicio.
              </p>
              <p>Ofrecemos:</p>
              <ul className="terms-modal__list">
                <li>Período de prueba de 3 meses</li>
                <li>Luego ingreso a planilla</li>
                <li>Todos los beneficios de ley</li>
                <li>Ambiente de trabajo estable</li>
                <li>Oportunidad real de crecimiento dentro de la empresa</li>
              </ul>
              <p>
                Si tienes experiencia en ventas, atención al cliente o asesoría comercial, y te encanta trabajar con animales y sus
                familias, ¡queremos conocerte!
              </p>
              <p>
                Envíanos tu CV a{" "}
                <a href="mailto:contacto@wowtravel.pe" className="terms-modal__link">
                  contacto@wowtravel.pe
                </a>
              </p>
            </div>
            <div className="terms-modal__footer">
              <button type="button" className="btn" onClick={closeJobs}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isFaqOpen && (
        <div className="terms-modal__overlay" onClick={handleOverlayClick(closeFaq)}>
          <div className="terms-modal">
            <div className="terms-modal__header">
              <h3 className="terms-modal__title">Preguntas frecuentes</h3>
              <button type="button" className="terms-modal__close" onClick={closeFaq} aria-label="Cerrar">
                ×
              </button>
            </div>
            <div className="terms-modal__body">
              <p>
                1. ¿Cuánto tiempo antes debo iniciar el proceso de viaje de mi mascota?
                <br />
                Lo ideal es comenzar el proceso con 4 meses de anticipación, ya que algunos países tienen tiempos específicos para
                vacunas, validaciones y documentos oficiales.
              </p>
              <p>
                2. ¿Mi mascota necesita microchip para viajar?
                <br />
                Para muchos países, sí. Nosotros te guiamos en todo el proceso de microchip y también trasladamos a tu mascota cuando
                sea necesario para los exámenes y validaciones.
              </p>
              <p>
                3. ¿Qué vacunas son obligatorias?
                <br />
                La vacuna antirrábica es indispensable para la mayoría de destinos. En algunos casos se requieren vacunas adicionales.
                Nosotros te indicamos exactamente lo que corresponde.
              </p>
              <p>
                4. ¿WOW Travel lleva a la mascota para sus trámites?
                <br />
                Sí. Nosotros trasladamos a tu mascota para los exámenes, certificados y validaciones necesarias, asegurándonos de que
                todo se realice correctamente y sin estrés para ti.
              </p>
              <p>
                5. ¿Qué documentos necesito?
                <br />
                Depende del país, pero generalmente incluyen certificado sanitario, validaciones, microchip y documentos oficiales. Te
                explicaremos cada paso con claridad.
              </p>
              <p>
                6. ¿Mi mascota puede viajar en cabina conmigo?
                <br />
                La posibilidad de viajar en cabina depende de las políticas de cada aerolínea, el tamaño de la mascota y la
                disponibilidad del vuelo. Nosotros te ayudamos a revisar las opciones más adecuadas según tu caso y a entender los
                requisitos de cada destino.
                <br />
                <br />
                Además, contamos con un psicólogo especializado, quien puede realizar evaluaciones, emitir informes, entre otros,
                cuando la situación lo requiera. Este apoyo facilita que el proceso esté mejor sustentado y resulte más claro y
                tranquilo para la familia.
              </p>
              <p>
                Si tienes más preguntas, puedes escribirnos a contacto@wowtravel.pe
              </p>
            </div>
            <div className="terms-modal__footer">
              <button type="button" className="btn" onClick={closeFaq}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
