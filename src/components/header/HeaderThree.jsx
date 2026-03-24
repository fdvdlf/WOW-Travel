"use client";

import React from "react";
import Link from "next/link";
import { HeaderMobileMenu } from "./HeaderMobileMenu";

const wLogo = "/logo/logo.png";
const showMobileMenu = false;

export const HeaderThree = () => {
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

                  {showMobileMenu ? (
                    <div className="mobile-nav-toggler" aria-label="Abrir menú">
                      <i className="flaticon-layout"></i>
                    </div>
                  ) : null}
                </div>

                {showMobileMenu ? <HeaderMobileMenu /> : null}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
