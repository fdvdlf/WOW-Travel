import React from "react";
import Link from "next/link";

const marqueeIcon = "/images/marquee_icon.svg";

export const MarqueeOne = () => {
  const box = (
    <div className="marquee__box">
      <Link href="/contact">
        Book For Online Appointment
        <img src={marqueeIcon} alt="Marquee Icon" />
      </Link>
      <Link href="/contact">
        Book For Online Appointment
        <img src={marqueeIcon} alt="Marquee Icon" />
      </Link>
      <Link href="/contact">
        Book For Online Appointment
        <img src={marqueeIcon} alt="Marquee Icon" />
      </Link>
      <Link href="/contact">
        Book For Online Appointment
        <img src={marqueeIcon} alt="Marquee Icon" />
      </Link>
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
