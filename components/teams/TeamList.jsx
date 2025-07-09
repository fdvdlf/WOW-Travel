import React from "react";
import { TeamOneItem } from "./TeamOneItem";

const teamImg01 = "/team/team_img01.jpg";
const teamImg02 = "/team/team_img02.jpg";
const teamImg03 = "/team/team_img03.jpg";
const teamImg04 = "/team/team_img04.jpg";
const teamImg05 = "/team/team_img05.jpg";
const teamImg06 = "/team/team_img06.jpg";
const teamImg07 = "/team/team_img07.jpg";
const teamImg08 = "/team/team_img08.jpg";

// Team member data
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
  {
    src: teamImg05,
    name: "Savannah Nguyen",
    designation: "Medicine Specialist",
  },
  {
    src: teamImg06,
    name: "Guy Hawkins",
    designation: "Food Technician",
  },
  {
    src: teamImg07,
    name: "Esther Howard",
    designation: "Food Technician",
  },
  {
    src: teamImg08,
    name: "Wade Warren",
    designation: "Veterinary Technician",
  },
];

export const TeamList = () => {
  return (
    <section className="team__area-three">
      <div className="container">
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
      </div>
    </section>
  );
};
