import React from "react";

const shapeOne = "/team/team_img_shape01.svg";
const shapeTwo = "/team/team_img_shape02.svg";

export const TeamOneItem = ({ src, name, designation }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
      <div className="team__item">
        <div className="team__item-img">
          <div className="mask-img-wrap">
            <img src={src} alt="team member" />
          </div>
          <div className="team__item-img-shape">
            <div className="shape-one">
              <img src={shapeOne} alt="shape" className="injectable" />
            </div>
            <div className="shape-two">
              <img src={shapeTwo} alt="shape" className="injectable" />
            </div>
          </div>
        </div>
        <div className="team__item-content">
          <h4 className="title">
            {name}
          </h4>
          <span>{designation}</span>
        </div>
      </div>
    </div>
  );
};
