"use client";

import React from "react";
import Link from "next/link";
import { useMobileMenu, useSearch } from "../../lib/hooks/useHeader";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderMobileMenu } from "./HeaderMobileMenu";

const wLogo = "/logo/logo.png";

export const HeaderThree = () => {
  const { showSearch, toggleSearch } = useSearch();
  useMobileMenu();

  return (
    <>
      <header>
        <div id="header-fixed-height"></div>

        <div
          id="sticky-header"
          className="tg-header__area tg-header__area-three"
          style={{ backgroundColor: "#ffffff", paddingTop: "20px", paddingBottom: "20px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="tgmenu__wrap">
                  <div className="row align-items-center">
                    <div className="col-xl-5">
                      {/* Menú eliminado */}
                    </div>

                    <div className="col-xl-2 col-md-4">
                      <div className="logo text-center">
                        <Link href="/">
                          <img src={wLogo} alt="Logo" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-xl-5 col-md-8">
                      <div className="tgmenu__action tgmenu__action-two d-none d-md-block">
                        <ul className="list-wrap d-flex justify-content-end align-items-center gap-3">
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
                          <li className="header-btn login-btn">
                            <Link href="/reservar" className="btn" style={{ backgroundColor: "#1d3c80", color: "#fff", borderRadius: "999px", padding: "10px 20px" }}>
                              <i className="flaticon-plane" style={{ marginRight: "8px" }}></i>
                              Reservar vuelo
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mobile-nav-toggler">
                    <i className="flaticon-layout"></i>
                  </div>
                </div>

                {/* Menú móvil */}
                <HeaderMobileMenu />
              </div>
            </div>
          </div>
        </div>

        {/* Buscador */}
        <HeaderSearch active={showSearch} toggleSearch={toggleSearch} />
      </header>
    </>
  );
};
