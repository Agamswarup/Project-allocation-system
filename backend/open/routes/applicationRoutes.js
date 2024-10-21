import express from "express";
import {
  facultyGetAllApplications,
  studentDeleteApplication,
  studentGetAllApplications,
  postApplication,
  studentGetSingleApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/faculty/getall", isAuthenticated, facultyGetAllApplications);
router.get("/student/getall", isAuthenticated, studentGetAllApplications);
router.delete("/delete/:id", isAuthenticated, studentDeleteApplication);
router.post("/post", isAuthenticated, postApplication);
router.get("/:id", studentGetSingleApplication);

export default router;
