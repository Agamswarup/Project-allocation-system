import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

function Predictors() {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const { data } = await axios.get(
          "https://project-app-backend-1hcz.onrender.com/api/v1/getallfaculties",
          { withCredentials: true }
        );
        setFaculties(data.facultydetails);
      } catch (error) {
        toast.error(error.response.data.message);
        setFaculties([]);
      }
    };
    fetchFaculties();
  }, []);

  function sortByCurrProjects(a, b) {
    return b.currprojects - a.currprojects; // Descending order
  }
  faculties.sort(sortByCurrProjects);

  return (
    <div className="categories">
      <h3>LIST OF ALL FACULTIES</h3>
      <div className="banner_another">
        {faculties &&
          faculties.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="text">
                  <h1>Dr {element.name.toUpperCase()}</h1>
                  <p>EMAIL : {element.email}</p>
                  <p>PHONE : {element.phone}</p>
                  <p>CURRENT AVAILABLE PROJECTS : {element.currprojects}</p>
                  <p>TOTAL NO OF OFFERED PROJECTS : {element.totalprojects}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Predictors;
