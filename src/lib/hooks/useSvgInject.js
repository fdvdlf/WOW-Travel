import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useSvgInject = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    let observer;
    let frameId = 0;

    const injectSvg = async () => {
      try {
        await import("../../assets/js/svg-inject.min.js");

        if (typeof window.SVGInject !== "function") {
          return;
        }

        const svgImages = document.querySelectorAll("img.injectable");
        if (!svgImages.length) {
          return;
        }

        window.SVGInject(svgImages);
      } catch (error) {
        console.error("SVG inject failed", error);
      }
    };

    const scheduleInjection = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        injectSvg();
      });
    };

    scheduleInjection();

    observer = new MutationObserver((mutations) => {
      const hasNewNodes = mutations.some((mutation) => mutation.addedNodes.length > 0);

      if (hasNewNodes) {
        scheduleInjection();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer?.disconnect();

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [pathname]);
};
