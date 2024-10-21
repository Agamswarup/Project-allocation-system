import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { getAllFaculties } from "./controllers/userController.js";

const app = express();
config({ path: ".env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/application", applicationRouter);
app.get("/api/v1/getallfaculties", getAllFaculties);
dbConnection();

app.use(errorMiddleware);
export default app;
