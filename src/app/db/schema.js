import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      unique: true,
      min: 2,
      max: 100,
    },
    description: {
      required: false,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    createdAt: {
      type: Date,
    },
    stock: {
      type: Number,
    },
    size: {
      type: Number,
    },
    color: {
      required: true,
      type: String,
    },
    img: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: { type: String },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TransactionSchema = new Schema(
  {
    invoice: {
      required: true,
      type: String,
      unique: true,
    },
    description: {
      required: false,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
    createdAt: {
      type: Date,
    },
    recipient: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);

export const Product = models?.Product || model("Product", ProductSchema);

export const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);
