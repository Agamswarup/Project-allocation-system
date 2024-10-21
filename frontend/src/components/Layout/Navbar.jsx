import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://project-app-backend-1hcz.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/lff.jpg" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/project/getall"} onClick={() => setShow(false)}>
              ALL PROJECTS
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Faculty"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Faculty" ? (
            <>
              <li>
                <Link to={"/project/post"} onClick={() => setShow(false)}>
                  POST NEW PROJECT
                </Link>
              </li>
              <li>
                <Link to={"/project/me"} onClick={() => setShow(false)}>
                  VIEW YOUR PROJECTS
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/projectstatus"} onClick={() => setShow(false)}>
                  ALL FACULTIES STATUS
                </Link>
              </li>
            </>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
