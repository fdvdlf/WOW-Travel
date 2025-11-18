import React from "react";
import { TeamOneItem } from "./TeamOneItem";

const teamImg01 = "/team/team_img01.jpg";
const teamImg02 = "/team/team_img02.jpg";
const teamImg03 = "/team/team_img03.jpg";
const teamImg04 = "/team/team_img04.jpg";
const petIcon = "/icon/pet_icon02.svg";
const teamShape = "/team/team_shape.png";

export const TeamOne = () => {
  const teamMembers = [
    {
      src: teamImg01,
      name: "Felipe Pandolfi",
      designation: "General",
    },
    {
      src: teamImg02,
      name: "Angie Parra",
      designation: "Directora Comercial",
    },
    {
      src: teamImg03,
      name: "Gabriela Rea",
      designation: "Director de Operaciones",
    },
    {
      src: teamImg04,
      name: "Fernando del Valle",
      designation: "Director de Marketing",
    },
  ];

  return (
    <section className="team__area">
      <div className="container">
        {/* top */}
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
                Conoce al equipo <br />
                detrás de WOW Travel
              </h2>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="row justify-content-center">
          {teamMembers.map((member, index) => (
            <TeamOneItem
              key={index}
              src={member.src}
              name={member.name}
              designation={member.designation}
            />
          ))}
        </div>

        <div className="team__bottom-content">
          <p>Nuestro equipo de expertos en viajes para mascotas</p>
        </div>
      </div>

      {/* shape */}
      <div className="team__shape">
        <img src={teamShape} alt="shape" className="ribbonRotate" />
      </div>
    </section>
  );
};
