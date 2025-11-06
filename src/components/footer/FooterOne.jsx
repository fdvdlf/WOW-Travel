import React from "react";
import Link from "next/link";

const wLogo = "/logo/w_logo.png";
const newsletterShape = "/images/footer_newsletter_shape.svg";
const footerShape01 = "/images/footer_shape01.png";
const footerShape02 = "/images/footer_shape02.png";

export const FooterOne = () => {
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
                      <a href="mailto:contacto@wowtravel.pe">
                        contacto@wowtravel.pe
                      </a>
                    </div>
                    <div className="footer__social">
                      <h6 className="title">Síguenos en:</h6>
                      <ul className="list-wrap">
                        <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a></li>
                        <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                  <div className="footer__widget">
                    <h4 className="footer__widget-title">Enlaces útiles</h4>
                    <div className="footer__link">
                      <ul className="list-wrap">
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/servicios">Servicios</Link></li>
                        <li><Link href="/requisitos">Requisitos por país</Link></li>
                        <li><Link href="/historias">Historias de viaje</Link></li>
                        <li><Link href="/faq">Preguntas frecuentes</Link></li>
                        <li><Link href="/contacto">Contáctanos</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ======= BLOQUE MODIFICADO ======= */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                  <div className="footer__widget">
                    <h4 className="footer__widget-title">Atención 24/7</h4>
                    <div className="footer__link">
                      <ul className="list-wrap">
                        <li>Estamos disponibles para ti las 24 horas, los 7 días.</li>
                        <li><strong>Horario de citas:</strong> 
                        09:00 – 19:00 (hora de Lima).</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* ====== FIN BLOQUE MODIFICADO ====== */}

                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="footer__widget">
                    <div className="footer__newsletter">
                      <h2 className="title">Suscríbete a nuestro boletín</h2>
                      <div className="shape">
                        <img src={newsletterShape} alt="newsletter shape" className="injectable" />
                      </div>
                      <form action="#">
                        <input id="email" type="email" placeholder="Ingresa tu correo electrónico" />
                        <button className="btn" type="submit">Suscribirme</button>
                      </form>
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
                      <li><Link href="/contacto">Soporte</Link></li>
                      <li><Link href="/terminos">Términos y condiciones</Link></li>
                      <li><Link href="/privacidad">Política de privacidad</Link></li>
                      <li><Link href="/equipo">Trabaja con nosotros</Link></li>
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
    </>
  );
};
