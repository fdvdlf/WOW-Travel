import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAos = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1000,
        mirror: true,
        once: true,
        disable: "mobile",
      });
    }
  }, [pathname]);
};
