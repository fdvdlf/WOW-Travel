"use client";

import React from "react";
import Link from "next/link";
import { useMobileMenu, useSearch } from "../../lib/hooks/useHeader";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderMobileMenu } from "./HeaderMobileMenu";

const wLogo = "/logo/w_logo.png";

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
                    <div className="col-xl-5">{/* Menú eliminado */}</div>

                    <div className="col-xl-2 col-md-4">
                      <div className="logo text-center">
                        <Link href="/">
                          <img src={wLogo} alt="Logo" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-xl-5 col-md-8">
                      <div className="tgmenu__action tgmenu__action-two d-none d-md-flex justify-content-end">
                        <Link
                          href="/reservar"
                          className="btn"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "12px 28px",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#fff",
                            background: "linear-gradient(90deg, #1d3c80 0%, #9e7efb 100%)",
                            borderRadius: "999px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <i className="flaticon-plane" style={{ fontSize: "18px" }}></i>
                          Reservar vuelo
                        </Link>
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

        {/* Buscador eliminado */}
        {/* <HeaderSearch active={showSearch} toggleSearch={toggleSearch} /> */}
      </header>
    </>
  );
};
