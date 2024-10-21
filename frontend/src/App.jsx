import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Projects from "./components/Project/Projects";
import ProjectDetails from "./components/Project/ProjectDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostProject from "./components/Project/PostProject";
import NotFound from "./components/NotFound/NotFound";
import MyProjects from "./components/Project/MyProjects";
import Predictors from "./components/Predictor/Predictors";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://project-app-backend-1hcz.onrender.com/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/project/getall" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/project/post" element={<PostProject />} />
          <Route path="/project/me" element={<MyProjects />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/projectstatus" element={<Predictors />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
