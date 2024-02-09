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

export const Product = models?.Product || model("Product", ProductSchema);
