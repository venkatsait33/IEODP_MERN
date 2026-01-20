import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AuditLog } from "../model/auditLog.model.js";

export const createUser = asyncHandler(async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    gender,
  } = req.body;

  if (
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !mobileNumber ||
    !gender
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const userData = {
    userName,
    firstName,
    lastName,
    email,
    password: hashPassword,
    mobileNumber,
    profile: [{ gender }],
  };

  const userCreate = await User.create(userData);

  res.status(201).json({
    message: "User created successfully",
    userCreate,
    success: true,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
      success: false,
    });
  }

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
      success: false,
    });
  }

  //  Token payload
  const tokenData = {
    id: user._id,
    role: user.role,
  };

  //  Generate JWT
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  //  Safe user object (no password)
  const safeUser = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
    role: user.role,
    profile: user.profile,
  };

  //  Send response
  return res
    .status(200)
    .cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      message: "Login successful",
      user: safeUser,
      success: true,
      token,
    });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const { _id, role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({
      message: "You are not authorized to perform this action",
      success: false,
    });
  }

  const users = await User.find().select("-password");

  return res.status(200).json({
    message: "Users retrieved successfully",
    users,
    success: true,
  });
});

export const changeUserStatus = asyncHandler(async (req, res, next) => {
  const { _id, role } = req.user;
  const { userId, accountStatus } = req.body;

  if (role !== "admin") {
    return res.status(403).json({
      message: "You are not authorized to perform this action",
      success: false,
    });
  }
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  user.accountStatus = accountStatus;
  await user.save();

  return res.status(200).json({
    message: "User status updated successfully",
    user,
    success: true,
  });
});

/**
 * ADMIN: Assign role & status to user
 * PATCH /api/admin/users/:id/assign-role
 */
export const assignUserRole = async (req, res) => {
  try {
    const { role, accountStatus } = req.body;
    const userId = req.params.id;

    // Validate role
    const allowedRoles = [
      "operator",
      "admin",
      "leadership",
      "management",
      "auditor",
    ];

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Validate status
    const allowedStatuses = ["active", "inactive", "pending", "suspended"];
    if (accountStatus && !allowedStatuses.includes(accountStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const previousState = {
      role: user.role,
      accountStatus: user.accountStatus,
    };

    if (role) user.role = role;
    if (accountStatus) user.accountStatus = accountStatus;

    await user.save();

    // 🔐 Audit log
    await AuditLog.create({
      entity: "USER",
      entityId: user._id,
      action: "USER_ROLE_UPDATED",
      performedBy: req.user._id,
      role: req.user.role,
      previousState,
      newState: {
        role: user.role,
        status: user.accountStatus,
      },
    });

    res.json({
      message: "User role/status updated successfully",
      user: {
        id: user._id,
        name: `${user.userName}}`,
        role: user.role,
        status: user.accountStatus,
      },
    });
  } catch (error) {
    console.error("Assign role error:", error);
    res.status(500).json({ message: "Failed to update user role" });
  }
};
