import React from "react";
import { TeamOneItem } from "./TeamOneItem";
import Link from "next/link";

const teamImg01 = "/team/team_img01.jpg";
const teamImg02 = "/team/team_img02.jpg";
const teamImg03 = "/team/team_img03.jpg";
const teamImg04 = "/team/team_img04.jpg";
const petIcon = "/icon/pet_icon02.svg";
const rightArrow = "/icon/right_arrow.svg";
const teamShape = "/team/team_shape.png";

export const TeamOne = () => {
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
    <section className="team__area">
      <div className="container">
        {/* top */}
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section__title text-center mb-40">
              <span className="sub-title">
                WE CHANGE YOUR LIFE & WORLD
                <strong className="shake">
                  <img src={petIcon} alt="" className="injectable" />
                </strong>
              </span>
              <h2 className="title">
                Meet Our Expertise <br />
                Pet Doctors
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
          <p>Our Valuable Expert Doctors Team</p>
          <Link href="/team" className="btn">
            See All Doctors
            <img src={rightArrow} alt="right arrow" className="injectable" />
          </Link>
        </div>
      </div>

      {/* shape */}
      <div className="team__shape">
        <img src={teamShape} alt="shape" className="ribbonRotate" />
      </div>
    </section>
  );
};
