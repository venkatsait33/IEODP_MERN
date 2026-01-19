import mongoose from "mongoose";

const idempotencySchema = new mongoose.Schema(
  {
    requestId: { type: String, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    endpoint: String,
    response: Object,
  },
  { timestamps: true },
);

export const IdempotencyKey = mongoose.model(
  "IdempotencyKey",
  idempotencySchema,
);
