import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import emailjs from "emailjs-com";
const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Faculty") {
        axios
          .get(
            "https://project-app-backend-1hcz.onrender.com/api/v1/application/faculty/getall",
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get(
            "https://project-app-backend-1hcz.onrender.com/api/v1/application/student/getall",
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(
          `https://project-app-backend-1hcz.onrender.com/api/v1/application/delete/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Student" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <StudentCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Student</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <FacultyCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const StudentCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Branch:</span> {element.branch}
          </p>
          <p>
            <span>CGPA:</span> {element.cgpa}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>

        <button
          className="delete_btn"
          onClick={() => deleteApplication(element._id)}
        >
          Delete Application
        </button>
      </div>
    </>
  );
};
const handleApproveApplication = async (applicationId) => {
  try {
    // Fetch application data
    const { data: applicationData } = await axios.get(
      `https://project-app-backend-1hcz.onrender.com/api/v1/application/${applicationId}`,
      { withCredentials: true }
    );

    // Fetch project data
    const { data: projectData } = await axios.get(
      `https://project-app-backend-1hcz.onrender.com/api/v1/project/${applicationData.application.projectId}`,
      { withCredentials: true }
    );

    // Prepare email template parameters
    const templateParams = {
      to_email: applicationData.application.email,
      applicant_name: applicationData.application.name,
      faculty_name: projectData.project.facultyName,
    };

    // Send email using emailjs
    try {
      await emailjs.send(
       "PROCESS.ENV.EMAILJS_SERVICE_ID",
        "PROCESS.ENV.EMAILJS_SERVICE_ID",
        templateParams,
        "PROCESS.ENV.EMAILJS_TEMPLATE_ID_2"
      );
      console.log("Email sent successfully!");
    } catch (emailError) {
      console.log("Failed to send email.", emailError);
    }

    // Delete application
    await axios.delete(
      `hhttps://project-app-backend-1hcz.onrender.com/api/v1/application/delete/${applicationId}`,
      { withCredentials: true }
    );

    // Attempt to delete the project
    try {
      await axios.delete(
        `https://project-app-backend-1hcz.onrender.com/api/v1/project/delete/${applicationData.application.projectId}`,
        { withCredentials: true }
      );
      toast.success("Application Approved");
    } catch (projectError) {
      toast.error("Project Already Closed");
    }
  } catch (error) {
    toast.error(error.message);
  }
  // Optionally reload the page or update the state to reflect the changes
  window.location.reload();
};

const handleRejectApplication = async (applicationId) => {
  try {
    // Fetch application data
    const { data: applicationData } = await axios.get(
      `https://project-app-backend-1hcz.onrender.com/api/v1/application/${applicationId}`,
      { withCredentials: true }
    );

    // Fetch project data
    const { data: projectData } = await axios.get(
      `https://project-app-backend-1hcz.onrender.com/api/v1/project/${applicationData.application.projectId}`,
      { withCredentials: true }
    );

    // Prepare email template parameters
    const templateParams = {
      to_email: applicationData.application.email,
      applicant_name: applicationData.application.name,
      faculty_name: projectData.project.facultyName,
    };

    // Send email using emailjs
    try {
      await emailjs.send(
        "PROCESS.ENV.EMAILJS_SERVICE_ID",
        "PROCESS.ENV.EMAILJS_SERVICE_ID",
        templateParams,
        "PROCESS.ENV.EMAILJS_TEMPLATE_ID_1"
      );
      console.log("Email sent successfully!");
    } catch (emailError) {
      console.log("Failed to send email.", emailError);
    }

    // Delete application
    await axios.delete(
      `https://project-app-backend-1hcz.onrender.com/api/v1/application/delete/${applicationId}`,
      { withCredentials: true }
    );

    // Attempt to delete the project
    try {
      await axios.delete(
        `https://project-app-backend-1hcz.onrender.com/api/v1/project/delete/${applicationData.application.projectId}`,
        { withCredentials: true }
      );
      toast.success("Application Approved");
    } catch (projectError) {
      toast.error("Project Already Closed");
    }
  } catch (error) {
    toast.error(error.message);
  }
  // Optionally reload the page or update the state to reflect the changes
  window.location.reload();
};

const FacultyCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>Branch:</span> {element.branch}
        </p>
        <p>
          <span>CGPA:</span> {element.cgpa}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="edit_btn_wrapper">
        <button
          onClick={() => handleApproveApplication(element._id)}
          className="edit_btn"
        >
          Approve
        </button>
      </div>
      <button
        onClick={() => handleRejectApplication(element._id)}
        className="delete_btn"
      >
        Reject
      </button>
    </div>
  );
};
