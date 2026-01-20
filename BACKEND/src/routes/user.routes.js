import express from "express";
import {
  assignUserRole,
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

router.post(
  "/admin/:id/assign-role",
  isAuthenticated,
  authorizeRoles("admin"),
  assignUserRole,
);

export default router;
