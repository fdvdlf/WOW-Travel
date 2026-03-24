"use client";

import { useAos } from "@/lib/hooks/useAos.js";
import { useCircle } from "@/lib/hooks/useCircles.js";
import { useSvgInject } from "@/lib/hooks/useSvgInject.js";
import { useEffect, useState } from "react";

export const ProviderComponent = ({ children }) => {
  const [isDomReady, setIsDomReady] = useState(false);

  useAos(isDomReady);
  useCircle(isDomReady);
  useSvgInject(isDomReady);

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setIsDomReady(true);
      });
    });

    return () => {
      if (firstFrame) {
        window.cancelAnimationFrame(firstFrame);
      }

      if (secondFrame) {
        window.cancelAnimationFrame(secondFrame);
      }
    };
  }, []);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    require("../../assets/js/jquery-ui.min.js");
    require("../../assets/js/jquery.appear.js");
  }, []);

  return <>{children}</>;
};
