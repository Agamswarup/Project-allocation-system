import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Project Allocation System Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Login or register using your official LNMMITT domain address for
                streamlined access to exclusive project opportunities and
                updates.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Project/Post a Project</p>
              <p>
                Discover existing projects or post new ones to connect with
                collaborators and bring innovative ideas to life efficiently
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Project/Allocate Project to Suitable Candidates</p>
              <p>
                Apply for projects or allocate them to suitable candidates
                efficiently, ensuring a seamless workflow and successful project
                outcomes
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
