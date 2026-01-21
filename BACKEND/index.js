import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import userRoutes from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/utils/errorHandler.js";
import ticketRoutes from "./src/routes/ticket.routes.js";
import auditRoutes from "./src/routes/audit.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(errorHandler);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/ticket", ticketRoutes);
app.use("/api/v1/audit", auditRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
