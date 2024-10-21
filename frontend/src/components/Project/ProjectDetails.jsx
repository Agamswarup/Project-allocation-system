import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(
        `https://project-app-backend-1hcz.onrender.com/api/v1/project/${id}`,
        {
          //to allow cookies we use withCredentials
          withCredentials: true,
        }
      )
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Project Details</h3>
        <div className="banner">
          <p>
            Title: <span> {project.title}</span>
          </p>
          <p>
            Category: <span>{project.category}</span>
          </p>
          <p>
            Instructor: <span>{project.facultyName}</span>
          </p>

          <p>
            Preferred CGPA : <span>{project.cgpa}</span>
          </p>
          <p>
            Duration of project in months : <span>{project.duration}</span>
          </p>
          <p>
            Department: <span>{project.facultyDepartment}</span>
          </p>
          <p>
            Description: <span>{project.description}</span>
          </p>
          <p>
            Project Posted On: <span>{project.projectPostedOn}</span>
          </p>
          <p>
            Stipend:{" "}
            {project.salaryFrom ? (
              <span>
                {project.salaryFrom} - {project.salaryTo}
              </span>
            ) : (
              <span>Stipend is Not Available in this project</span>
            )}
          </p>
          {user && user.role === "Faculty" ? (
            <></>
          ) : (
            <Link to={`/application/${project._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
