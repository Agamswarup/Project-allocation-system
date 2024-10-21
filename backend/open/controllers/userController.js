import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
function isLnmiitEmail(email) {
  // Regular expression for validating the specific email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const domain = "@lnmiit.ac.in";

  if (!emailRegex.test(email)) {
    return false;
  }

  const lowercasedEmail = email.toLowerCase();

  // Check if the email ends with '@lnmiit.ac.in'
  if (!lowercasedEmail.endsWith(domain)) {
    return false;
  }

  return true;
}

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role, branch } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const totalprojects = 0;
  const currprojects = 0;
  if (!isLnmiitEmail(email)) {
    return next(new ErrorHandler("Enter valid Lnmiit email address only"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
    totalprojects,
    currprojects,
    branch,
  });
  sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
});
export const getUserdetails = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.params;
  try {
    const userdetails = await User.findOne({ email });
    if (!userdetails) {
      return next(new ErrorHandler("User not found.", 404));
    }
    res.status(200).json({
      success: true,
      userdetails,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
export const getAllFaculties = catchAsyncErrors(async (req, res, next) => {
  const facultydetails = await User.find({ role: "Faculty" });

  res.status(200).json({
    success: true,
    facultydetails,
  });
});
