import React from "react";

const phrases = [
  { text: "Conversemos", size: "xxl", opacity: "strong", x: 18, y: 30, rotate: -10 },
  { text: "Let's talk", size: "lg", opacity: "soft", x: 72, y: 24, rotate: 9 },
  { text: "Schreib uns", size: "md", opacity: "mid", x: 52, y: 18, rotate: -6 },
  { text: "Écris-nous", size: "lg", opacity: "strong", x: 28, y: 58, rotate: 7 },
  { text: "Scrivici", size: "md", opacity: "mid", x: 64, y: 48, rotate: -7 },
  { text: "Fale conosco", size: "sm", opacity: "soft", x: 44, y: 72, rotate: 10 },
  { text: "Schrijf ons", size: "xl", opacity: "mid", x: 42, y: 38, rotate: 3 },
  { text: "Skriv oss", size: "sm", opacity: "soft", x: 14, y: 60, rotate: -14 },
  { text: "Let's talk", size: "lg", opacity: "mid", x: 78, y: 60, rotate: 6 },
  { text: "Conversemos", size: "md", opacity: "mid", x: 58, y: 34, rotate: -3 },
  { text: "Schreib uns", size: "lg", opacity: "mid", x: 34, y: 80, rotate: -8 },
  { text: "Écris-nous", size: "sm", opacity: "soft", x: 82, y: 40, rotate: 4 },
];

export const LanguageCloud = () => {
  return (
    <div className="lang-cloud__area">
      <div className="container">
        <div className="lang-cloud__wrap">
          <div className="lang-cloud__halo" aria-hidden="true" />
          {phrases.map((phrase, idx) => (
            <span
              key={`${phrase.text}-${idx}`}
              aria-hidden="true"
              className={`lang-cloud__item lang-cloud__item--${phrase.size} lang-cloud__item--${phrase.opacity}`}
              style={{
                top: `${phrase.y}%`,
                left: `${phrase.x}%`,
                "--twist": `${phrase.rotate}deg`,
                "--float-delay": `${(idx % 5) * 0.35}s`,
                zIndex: 2 + (phrase.size === "xxl" ? 2 : phrase.size === "xl" ? 1 : 0),
              }}
            >
              {phrase.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
