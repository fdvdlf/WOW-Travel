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
          className="tg-header__area tg-header__area-three header-float"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="tgmenu__wrap tgmenu__wrap-centered">
                  <div className="logo text-center">
                    <Link href="/">
                      <img src={wLogo} alt="Logo" />
                    </Link>
                  </div>

                  <div className="mobile-nav-toggler" aria-label="Abrir menú">
                    <i className="flaticon-layout"></i>
                  </div>
                </div>

                {/* Menú móvil */}
                <HeaderMobileMenu />
              </div>
            </div>
          </div>
        </div>

        {/* Buscador eliminado */}
        {/* <HeaderSearch active={showSearch} toggleSearch={toggleSearch} /> */}
      </header>
    </>
  );
};
