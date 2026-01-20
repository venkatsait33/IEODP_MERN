import mongoose from "mongoose";
import { Ticket } from "../model/ticket.model.js";
import { TicketAction } from "../model/ticketAction.model.js";
import { createAuditLog } from "../utils/createAuditLog.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateWorkflowAction } from "../utils/validateWorkflowAction.js";

// export const createTicket = async (req, res) => {
//   const ticket = await Ticket.create({
//     ...req.body,
//     raisedBy: req.user._id,
//   });

//   await TicketAction.create({
//     ticketId: ticket._id,
//     performedBy: req.user._id,
//     role: req.user.role,
//     actionType: "CREATED",
//     newStatus: "SUBMITTED",
//   });

//   res.status(201).json(ticket);
// };

export const createTicket = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const ticket = await Ticket.create(
      [
        {
          title: req.body.title,
          description: req.body.description,
          priority: req.body.priority,
          raisedBy: req.user._id,
          status: "SUBMITTED",
        },
      ],
      { session },
    );

    await TicketAction.create(
      [
        {
          ticketId: ticket[0]._id,
          performedBy: req.user._id,
          role: req.user.role,
          actionType: "CREATED",
          newStatus: "SUBMITTED",
        },
      ],
      { session },
    );

    await createAuditLog({
      session,
      entity: "TICKET",
      entityId: ticket[0]._id,
      action: "TICKET_CREATED",
      performedBy: req.user._id,
      role: req.user.role,
      previousState: null,
      newState: ticket[0].toObject(),
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(ticket[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: "Ticket creation failed" });
  }
};

export const getTickets = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.status) query.status = req.query.status;
  if (req.query.priority) query.priority = req.query.priority;
  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: "i" };
  }

  const tickets = await Ticket.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json(tickets);
};

export const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate(
    "raisedBy",
    "userName role",
  );

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  const timeline = await TicketAction.find({ ticketId: ticket._id })
    .populate("performedBy", "userName role")
    .sort({ createdAt: 1 });

  res.json({ ticket, timeline });
});

export const addTicketAction = async (req, res) => {
  const { actionType, comment, auditorDecision } = req.body;

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  try {
    const rule = validateWorkflowAction({
      ticketStatus: ticket.status,
      userRole: req.user.role,
      actionType,
    });

    const previousStatus = ticket.status;

    // Handle auditor decisions
    if (actionType === "AUDITOR_APPROVED") {
      ticket.status = "CLOSED";
      ticket.auditorDecision = "APPROVED";
    }

    if (actionType === "AUDITOR_REJECTED") {
      ticket.status = "CLOSED";
      ticket.auditorDecision = "REJECTED";
    }

    if (actionType === "AUDITOR_REVERIFY") {
      ticket.status = "REVERIFY";
      ticket.auditorDecision = "REVERIFY";
    }

    if (rule.nextStatus && ticket.status === previousStatus) {
      ticket.status = rule.nextStatus;
    }

    await ticket.save();

    await TicketAction.create({
      ticketId: ticket._id,
      performedBy: req.user._id,
      role: req.user.role,
      actionType,
      comment,
      previousStatus,
      newStatus: ticket.status,
    });

    res.json(ticket);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
