"use client";

import React, { useEffect } from "react";

export const ScrollToTop = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const $ = require("jquery");

      $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
          $("#sticky-header").removeClass("sticky-menu");
          $(".scroll-to-target").removeClass("open");
          $("#header-fixed-height").removeClass("active-height");
        } else {
          $("#sticky-header").addClass("sticky-menu");
          $(".scroll-to-target").addClass("open");
          $("#header-fixed-height").addClass("active-height");
        }
      });

      if ($(".scroll-to-target").length) {
        $(".scroll-to-target").on("click", function () {
          var target = $(this).attr("data-target");

          // animate
          $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
        });
      }
    }
  }, []);

  return (
    <>
      <button className="scroll__top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
    </>
  );
};
