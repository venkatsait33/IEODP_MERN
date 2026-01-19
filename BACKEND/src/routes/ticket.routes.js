import express from "express";
import {
  createTicket,
  getTicketById,
  getTickets,
} from "../controllers/ticket.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { idempotencyMiddleware } from "../middleware/idempotency.js";

const routes = express.Router();

routes.post("/create", isAuthenticated, idempotencyMiddleware, createTicket);
routes.get("/", isAuthenticated, getTickets);
routes.get("/:id", isAuthenticated, getTicketById);

export default routes;
