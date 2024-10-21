import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "200+",
      subTitle: "Live Projects",
      icon: <FaSuitcase />,
    },

    {
      id: 3,
      title: "1000+",
      subTitle: "Students",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "100+",
      subTitle: "Faculties",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Project Hunt Made Easy</h1>
            <h1>Skip the Runaround, Apply Directly!</h1>
            <p>
              Welcome! Tired of chasing projects across faculties? Here, find
              all current opportunities in one place. Apply directly and
              streamline your project search today!"
            </p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
