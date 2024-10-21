import React from "react";

import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla, SiPython } from "react-icons/si";
import { AiFillHtml5 } from "react-icons/ai";
import { IoMdAnalytics } from "react-icons/io";
const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "AI Research",
      openPositions: 8,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Machine Learning",
      openPositions: 5,
      icon: <SiPython />,
    },
    {
      id: 3,
      title: "Web Development",
      openPositions: 10,
      icon: <AiFillHtml5 />,
    },
    {
      id: 4,
      title: "Data Science",
      openPositions: 7,
      icon: <IoMdAnalytics />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP DOMAINS</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
