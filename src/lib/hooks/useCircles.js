import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useCircle = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const text = document.querySelector(".circle");
        text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

        const element = document.querySelectorAll(".circle span");
        for (let i = 0; i < element.length; i++) {
          element[i].style.transform = "rotate(" + i * 14.5 + "deg)";
        }
      } catch (error) {}
    }
  }, [pathname]);
};
