import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAos = (enabled = true) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      AOS.init({
        duration: 1000,
        mirror: true,
        once: true,
        disable: "mobile",
      });

      AOS.refreshHard();
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [enabled, pathname]);
};
