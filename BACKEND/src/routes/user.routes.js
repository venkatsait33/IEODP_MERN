import express from "express";
import {
  changeUserStatus,
  createUser,
  getAllUsers,
  login,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);

router.get("/users", isAuthenticated, authorizeRoles("admin"), getAllUsers);
router.post(
  "/admin/change-status",
  isAuthenticated,
  authorizeRoles("admin"),
  changeUserStatus,
);

export default router;
