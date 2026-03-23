import React from "react";
import Link from "next/link";

const marqueeIcon = "/images/marquee_icon.svg";
const marqueeItems = [
  {
    label: "¿Tu mascota va a viajar?",
    href: "https://wa.me/51941482291?text=Hola%20WOW%20Travel%2C%20mi%20mascota%20va%20a%20viajar%20y%20quiero%20informacion.",
  },
  {
    label: "Asegura su bienestar con WOW Travel",
    href: "https://wa.me/51941482291?text=Hola%20WOW%20Travel%2C%20quiero%20informacion%20para%20viajar%20con%20mi%20mascota%20de%20forma%20segura.",
  },
  {
    label: "¡Agenda gratis!",
    href: "https://wa.me/51941482291?text=Hola%20WOW%20Travel%2C%20quiero%20agendar%20una%20asesoria%20para%20el%20viaje%20de%20mi%20mascota.",
  },
  {
    label: "Asesoría personalizada",
    href: "https://wa.me/51941482291?text=Hola%20WOW%20Travel%2C%20necesito%20asesoria%20personalizada%20para%20viajar%20con%20mi%20mascota.",
  },
];

export const MarqueeOne = () => {
  const box = (
    <div className="marquee__box">
      {marqueeItems.map((item) => (
        <Link key={`${item.label}-${item.href}`} href={item.href} target="_blank" rel="noreferrer">
          {item.label}
          <img src={marqueeIcon} alt="Marquee Icon" />
        </Link>
      ))}
    </div>
  );

  return (
    <div className="marquee__area">
      <div className="marquee__wrap">
        {box}
        {box}
      </div>
    </div>
  );
};
