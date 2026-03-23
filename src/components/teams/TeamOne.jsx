import React from "react";
import { TeamOneItem } from "./TeamOneItem";

const teamImg01 = "/team/team_img01.jpg";
const petIcon = "/icon/pet_icon02.svg";
const teamShape = "/team/team_shape.png";

export const TeamOne = () => {
  const teamMembers = [
    {
      src: teamImg01,
      name: "Felipe Padolfi",
      designation: "Direccion General",
      initials: "FP",
    },
    {
      name: "Dr. Victor Quispe",
      designation: "Medico Veterinario - Especialista en Bienestar Animal para Viajes",
      initials: "VQ",
      useFallbackImage: true,
    },
    {
      name: "Lic. Sebastian Velasquez",
      designation: "Psicologo - Evaluacion para Apoyo Emocional en Viajes",
      initials: "SV",
      useFallbackImage: true,
    },
    {
      name: "Gabriel Larrea",
      designation: "Responsable de Operaciones",
      initials: "GL",
      useFallbackImage: true,
    },
  ];

  return (
    <section className="team__area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section__title text-center mb-40">
              <span className="sub-title">
                TRANSFORMAMOS CADA VIAJE EN UNA GRAN HISTORIA
                <strong className="shake">
                  <img src={petIcon} alt="" className="injectable" />
                </strong>
              </span>
              <h2 className="title">
                Conoce a parte del equipo <br />
                detras de WOW Travel
              </h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {teamMembers.map((member) => (
            <TeamOneItem
              key={member.name}
              src={member.src}
              name={member.name}
              designation={member.designation}
              initials={member.initials}
              useFallbackImage={member.useFallbackImage}
            />
          ))}
        </div>

        <div className="team__bottom-content">
          <p>Nuestro equipo de expertos en viajes para mascotas</p>
        </div>
      </div>

      <div className="team__shape">
        <img src={teamShape} alt="shape" className="ribbonRotate" />
      </div>
    </section>
  );
};
