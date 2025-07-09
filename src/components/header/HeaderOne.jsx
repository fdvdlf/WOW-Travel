"use client";

import React from "react";
import Link from "next/link";
import { HeaderNav } from "./HeaderNav";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderOffcanvas } from "./HeaderOffcanvas";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import {
  useMobileMenu,
  useOffCanvas,
  useSearch,
} from "../../lib/hooks/useHeader";

const LOGO = "/logo/logo.png";

export const HeaderOne = () => {
  const { showSearch, toggleSearch } = useSearch();
  const { showCanvas, toggleCanvas } = useOffCanvas();
  useMobileMenu();

  return (
    <>
      <header>
        {/* Top bar */}
        <div className="header__top">
          <div className="container custom-container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-8">
                <div className="header__info">
                  <ul className="list-wrap d-flex flex-wrap gap-3">
                    <li>
                      <i className="fas fa-map-marker-alt me-1"></i>
                      Calle Las Palomas 580, Surquillo, Lima – Perú
                    </li>
                    <li>
                      <i className="fas fa-envelope me-1"></i>
                      contacto@wowtravelmascotas.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-4 text-md-end">
                <div className="header__right d-flex justify-content-end align-items-center gap-3">
                  <span>
                    <i className="fas fa-clock me-1"></i>
                    Atención: 8:00 a. m. – 9:00 p. m.
                  </span>
                  <div className="header__social">
                    <a href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/" target="_blank"><i className="fab fa-twitter"></i></a>
                    <a href="https://wa.me/" target="_blank"><i className="fab fa-whatsapp"></i></a>
                    <a href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="header-fixed-height"></div>

        {/* Main Header */}
        <div id="sticky-header" className="tg-header__area">
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="tgmenu__wrap">
                  <nav className="tgmenu__nav">
                    <div className="logo">
                      <Link href="/">
                        <img src={LOGO} alt="Logo" />
                      </Link>
                    </div>

                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-lg-flex">
                      <HeaderNav />
                    </div>

                    <div className="tgmenu__action d-none d-md-block">
                      <ul className="list-wrap">
                        <li className="header-search">
                          <a
                            href="#"
                            className="search-open-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleSearch();
                            }}
                          >
                            <i className="flaticon-loupe"></i>
                          </a>
                        </li>
                        <li className="header-cart">
                          <a href="#">
                            <i className="flaticon-shopping-bag"></i>
                            <span>0</span>
                          </a>
                        </li>
                        <li className="offCanvas-menu">
                          <a
                            href="#"
                            className="menu-tigger"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleCanvas();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="16"
                              viewBox="0 0 26 16"
                              fill="none"
                            >
                              <rect width="9" height="2" rx="1" fill="currentcolor" />
                              <rect x="11" width="15" height="2" rx="1" fill="currentcolor" />
                              <rect y="14" width="26" height="2" rx="1" fill="currentcolor" />
                              <rect y="7" width="16" height="2" rx="1" fill="currentcolor" />
                              <rect x="17" y="7" width="9" height="2" rx="1" fill="currentcolor" />
                            </svg>
                          </a>
                        </li>
                        <li className="header-btn">
                          <Link href="/contact" className="btn">
                            <i className="flaticon-calendar-1"></i>Appointment
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="mobile-nav-toggler">
                      <i className="flaticon-layout"></i>
                    </div>
                  </nav>
                </div>

                {/* Mobile Menu */}
                <HeaderMobileMenu />
              </div>
            </div>
          </div>
        </div>

        {/* Header Search */}
        <HeaderSearch active={showSearch} toggleSearch={toggleSearch} />

        {/* Off Canvas */}
        <HeaderOffcanvas active={showCanvas} toggleCanvas={toggleCanvas} />
      </header>
    </>
  );
};
