import React from "react";
import {
  MdCloud,
  MdMemory,
  MdWeb,
  MdOutlineDesignServices,
  MdNetworkCheck,
  MdOutlineSettings,
} from "react-icons/md";
import {
  FaMicrochip,
  FaDatabase,
  FaRobot,
  FaCog,
  FaRss,
  FaWrench,
} from "react-icons/fa";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Cloud Computing",
      subTitle: "Computer Science and Engineering",
      icon: <MdCloud />,
    },
    {
      id: 2,
      title: "AI/ML",
      subTitle: "Computer Science and Engineering",
      icon: <MdMemory />,
    },
    {
      id: 3,
      title: "Web Development",
      subTitle: "Computer Science and Engineering",
      icon: <MdWeb />,
    },
    {
      id: 4,
      title: "VLSI Design",
      subTitle: "Electronics and Communication Engineering",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 5,
      title: "Digital Signal Processing",
      subTitle: "Electronics and Communication Engineering",
      icon: <FaMicrochip />,
    },
    {
      id: 6,
      title: "Antenna Engineering",
      subTitle: "Electronics and Communication Engineering",
      icon: <FaRss />,
    },
    {
      id: 7,
      title: "Manufactural Design",
      subTitle: "Mechanical Engineering",
      icon: <FaCog />,
    },
    {
      id: 8,
      title: "Robotics",
      subTitle: "Mechanical Engineering",
      icon: <FaRobot />,
    },
    {
      id: 9,
      title: "Microelectronics",
      subTitle: "Electronics and Communication Engineering",
      icon: <FaMicrochip />,
    },
    {
      id: 10,
      title: "Nanotechnology",
      subTitle: "Electronics and Communication Engineering",
      icon: <FaWrench />,
    },
    {
      id: 11,
      title: "Industrial Automation",
      subTitle: "Mechanical Engineering",
      icon: <FaCog />,
    },
    {
      id: 12,
      title: "Database Systems",
      subTitle: "Computer Science and Engineering",
      icon: <FaDatabase />,
    },
    {
      id: 13,
      title: "Network Security",
      subTitle: "Computer Science and Engineering",
      icon: <MdNetworkCheck />,
    },
    {
      id: 14,
      title: "Robotic Process Automation",
      subTitle: "Computer Science and Engineering",
      icon: <FaRobot />,
    },
    {
      id: 15,
      title: "Embedded Systems",
      subTitle: "Electronics and Communication Engineering",
      icon: <MdOutlineSettings />,
    },
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <h1>{element.title}</h1>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
