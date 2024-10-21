import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Project } from "../models/projectSchema.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Faculty") {
    return next(
      new ErrorHandler("Faculty not allowed to access this resource.", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  const { name, email, coverLetter, phone, address, projectId, cgpa } =
    req.body;
  const applicantID = {
    user: req.user._id,
    role: "Student",
  };
  if (!projectId) {
    return next(new ErrorHandler("Project not found!", 404));
  }
  //const stu = await User.findById(req.user._id);
  const branch = "ECE";
  const projectDetails = await Project.findById(projectId);
  if (!projectDetails) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  const facultyID = {
    user: projectDetails.postedBy,
    role: "Faculty",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !facultyID ||
    !resume ||
    !projectId
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    facultyID,
    projectId,
    branch,
    cgpa,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

export const facultyGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Student") {
      return next(
        new ErrorHandler("Student not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "facultyID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const studentGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    // if (role === "Faculty") {
    //   return next(
    //     new ErrorHandler("Faculty not allowed to access this resource.", 400)
    //   );
    // }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);
export const studentGetSingleApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      new ErrorHandler("Application Not found", 400);
    }

    res.status(200).json({
      success: true,
      application,
    });
  }
);

export const studentDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    // const { role } = req.user;
    // if (role === "Faculty") {
    //   return next(
    //     new ErrorHandler("Faculty not allowed to access this resource.", 400)
    //   );
    // }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
