import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useSvgInject = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const SVGInject = require("../../assets/js/svg-inject.min.js");
        SVGInject(document.querySelectorAll("img.injectable"));
      } catch (error) {
        console.log(error);
      }
    }
  }, [pathname]);
};
