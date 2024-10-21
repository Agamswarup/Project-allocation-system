import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");

  const [cgpa, setcgpa] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [duration, setduration] = useState("");
  const { isAuthorized, user } = useContext(Context);

  const handleProjectPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Unpaid") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Paid") {
    } else {
      setSalaryFrom("");
      setSalaryTo("");
    }
    await axios
      .post(
        "https://project-app-backend-1hcz.onrender.com/api/v1/project/post",
        salaryFrom.length >= 3
          ? {
              title,
              description,
              category,
              country,
              duration,
              cgpa,
              salaryFrom,
              salaryTo,
            }
          : {
              title,
              description,
              category,
              country,
              duration,
              cgpa,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    navigateTo("/");
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Faculty")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW PROJECT</h3>
          <form onSubmit={handleProjectPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Data science">Data science</option>
                <option value="Web development">Web development</option>
                <option value="Cloud computing">Cloud computing</option>
                <option value="AI and machine learning">
                  AI and machine learning
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Embedded Systems">Embedded Systems</option>
                <option value="Mechanical Design">Mechanical Design.</option>
                <option value="VLSI design">VLSI design</option>
                <option value="Signal processing">Signal processing</option>
                <option value="Digital image processing">
                  Digital image processing
                </option>
                <option value="Blockchain technology">
                  Blockchain technology
                </option>
                <option value="Internet of Things (IoT)">
                  Internet of Things (IoT)
                </option>
                <option value="Robotics">Robotics</option>
                <option value="Augmented Reality (AR)">
                  Augmented Reality (AR)
                </option>
                <option value="Virtual Reality (VR)">
                  Virtual Reality (VR)
                </option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="Number"
                value={cgpa}
                onChange={(e) => setcgpa(e.target.value)}
                placeholder="Enter Preferred CGPA"
              />
            </div>
            <input
              type="Number"
              value={duration}
              onChange={(e) => setduration(e.target.value)}
              placeholder="Please Specify Duration of the Project"
            />
            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Unpaid">Unpaid Project</option>
                <option value="Paid">Stipend Project</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Select Project Type: Paid or Unpaid *</p>
                ) : salaryType === "Paid" ? (
                  <div className="Paid">
                    <input
                      type="number"
                      placeholder="Stipend From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Stipend To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project Description"
            />
            <button type="submit">Create Project</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostProject;
