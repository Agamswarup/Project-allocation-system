import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get(
          "https://project-app-backend-1hcz.onrender.com/api/v1/project/getall",
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setProjects(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <div className="categories">
      <h3>LIST OF ALL AVAILABLE PROJECTS</h3>
      <div className="banner_another">
        {projects.projects &&
          projects.projects.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="text">
                  <h1> {element.title.toUpperCase()}</h1>
                  <p>Category : {element.category}</p>
                  <p>Faculty Instructor : {element.facultyName}</p>
                  <p>Department : {element.facultyDepartment}</p>
                  <p>Preferred CGPA: {element.cgpa}</p>
                  <Link to={`/project/${element._id}`}>Project Details</Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Projects;
