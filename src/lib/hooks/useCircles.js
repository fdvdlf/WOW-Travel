import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useCircle = (enabled = true) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      try {
        const text = document.querySelector(".circle");

        if (!text || text.querySelector("span")) {
          return;
        }

        text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

        const element = document.querySelectorAll(".circle span");
        for (let i = 0; i < element.length; i++) {
          element[i].style.transform = "rotate(" + i * 14.5 + "deg)";
        }
      } catch (error) {}
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [enabled, pathname]);
};
