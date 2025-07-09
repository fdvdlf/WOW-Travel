import React from "react";
import { TeamOneItem } from "./TeamOneItem";
import Link from "next/link";

const teamImg01 = "/team/team_img01.jpg";
const teamImg02 = "/team/team_img02.jpg";
const teamImg03 = "/team/team_img03.jpg";
const teamImg04 = "/team/team_img04.jpg";
const rightArrow = "/icon/right_arrow.svg";
const petIcon02 = "/icon/pet_icon02.svg";
const teamShape = "/team/h2_team_shape.png";

export const TeamTwo = () => {
  const teamMembers = [
    {
      src: teamImg01,
      name: "Daria Andaloro",
      designation: "Veterinary Technician",
    },
    {
      src: teamImg02,
      name: "Michael Brian",
      designation: "Medicine Specialist",
    },
    {
      src: teamImg03,
      name: "Kenroly Gajon",
      designation: "Food Technician",
    },
    {
      src: teamImg04,
      name: "Lizay Arianya",
      designation: "Veterinary Technician",
    },
  ];

  return (
    <section className="team__area-two">
      <div className="container">
        {/* top */}
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section__title text-center mb-40">
              <span className="sub-title">
                WE CHANGE YOUR LIFE & WORLD
                <strong className="shake">
                  <img src={petIcon02} alt="" className="injectable" />
                </strong>
              </span>
              <h2 className="title">
                We’re dedicated to excellent <br />
                service and care
              </h2>
            </div>
          </div>
        </div>

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
          <p>Our Valuable Expert Doctors Team</p>
          <Link href="/team" className="btn">
            See All Doctors
            <img src={rightArrow} alt="right arrow" className="injectable" />
          </Link>
        </div>
      </div>
      <div className="team__shape-two">
        <img src={teamShape} alt="img" className="ribbonRotate" />
      </div>
    </section>
  );
};
