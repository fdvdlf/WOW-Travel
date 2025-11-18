import React from "react";

const phrases = [
  { text: "Conversemos", size: "xl", opacity: "strong" },
  { text: "Let’s talk", size: "lg", opacity: "soft" },
  { text: "Låt oss prata", size: "md", opacity: "soft" },
  { text: "Lass uns reden", size: "lg", opacity: "mid" },
  { text: "Parliamo", size: "md", opacity: "strong" },
  { text: "La oss snakke", size: "sm", opacity: "mid" },
  { text: "Conversemos", size: "lg", opacity: "mid" },
  { text: "Let’s talk", size: "md", opacity: "mid" },
];

export const LanguageCloud = () => {
  return (
    <div className="lang-cloud__area">
      <div className="container">
        <div className="lang-cloud__wrap">
          {phrases.map((phrase, idx) => (
            <span
              key={`${phrase.text}-${idx}`}
              className={`lang-cloud__item lang-cloud__item--${phrase.size} lang-cloud__item--${phrase.opacity}`}
            >
              {phrase.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
