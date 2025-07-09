import React from "react";

const featureIcon1 = "/icon/features_icon01.svg";
const featureIcon2 = "/icon/features_icon02.svg";
const featureIcon3 = "/icon/features_icon03.svg";
const featureIcon4 = "/icon/features_icon04.svg";

const featuresList = [
  {
    icon: featureIcon1,
    title: "Free Shipping",
    description: "for orders over $200",
  },
  {
    icon: featureIcon2,
    title: "Money Guarantee",
    description: "30 days for an exchange",
  },
  {
    icon: featureIcon3,
    title: "100% Return Policy",
    description: "Any Time Return Product",
  },
  {
    icon: featureIcon4,
    title: "Best Deal Offer",
    description: "Grab Your Gear and Go",
  },
];

export const FeatureOne = () => {
  return (
    <section className="features__area">
      <div className="container">
        <div className="row justify-content-center">
          {featuresList.map((feature, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
              <div className="features__item">
                <div className="features__icon">
                  <img src={feature.icon} alt="" className="injectable" />
                </div>
                <div className="features__content">
                  <h4 className="title">{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
