"use client";

import { useAos } from "@/lib/hooks/useAos.js";
import { useCircle } from "@/lib/hooks/useCircles.js";
import { useSvgInject } from "@/lib/hooks/useSvgInject.js";
import { useEffect } from "react";

export const ProviderComponent = ({ children }) => {
  useAos();
  useCircle();
  useSvgInject();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    require("../../assets/js/jquery-ui.min.js");
    require("../../assets/js/jquery.appear.js");
  }, []);

  return <>{children}</>;
};
