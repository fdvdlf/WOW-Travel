import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/flaticon_pet_care.css";
import "../assets/css/fontawesome-all.min.css";
import "../assets/css/jquery-ui.css";
import "../assets/css/default.css";
import "../assets/css/animate.min.css";
import "../assets/css/responsive.css";
import "../assets/css/main.css";

import { ProviderComponent } from "@/components/provider/Provider";
import { Baloo_Bhaina_2, Plus_Jakarta_Sans } from "next/font/google";

// Font configurations
const balooBhaina2 = Baloo_Bhaina_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Petpal - Pet Care and Pet Shop NextJS Template",
};

export default function RootLayout({ children }) {
  const fontVariables = `
    :root {
      --tg-body-font-family: ${plusJakartaSans.style.fontFamily};
      --tg-heading-font-family: ${balooBhaina2.style.fontFamily};
    }
  `;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontVariables }} />
      </head>
      <body>
        <ProviderComponent>{children}</ProviderComponent>
      </body>
    </html>
  );
}
