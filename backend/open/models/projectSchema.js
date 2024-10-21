import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },

  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  projectPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  facultyName: {
    type: String,
    required: true,
  },
  facultyDepartment: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
    min: [4.0, "CGPA must be at least 4.0"],
    max: [10.0, "CGPA must be at most 10.0"],
  },
  duration: {
    type: Number,
    required: true,
    min: [1, "Duration must be at least for 1 month"],
    max: [12, "Duration cannot be more than 12 months"],
  },
});

export const Project = mongoose.model("Project", projectSchema);
