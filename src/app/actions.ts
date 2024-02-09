"use server";
import connectDB from "@/app/db/conn";
import { Product } from "@/app/db/schema";
import { revalidatePath } from "next/cache";

export type Product = typeof Product;
export const fetchProducts = async (searchTerm: string) => {
  connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });

  const regex = new RegExp(searchTerm, "i");
  const products = await Product.find({ title: { $regex: regex } });

  return products;
};

export const addProduct = async (values: FormData) => {
  connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  const { title, price, color, stock, description, img } =
    Object.fromEntries(values);

  try {
    await Product.create({
      title,
      price,
      color,
      desc: description,
      stock,
      img,
    });
  } catch (err) {
    throw new Error("Could not create Product" + err);
  }

  revalidatePath("/products");
};

export const deleteProduct = async (value: FormData) => {
  const { id } = Object.fromEntries(value);

  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    await Product.findByIdAndDelete(id);
  } catch (e) {
    throw new Error("Not able to delete product: " + e);
  }

  revalidatePath("/products");
};

export const getProduct = async (id: string) => {
  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    const product = await Product.findById(id);
    return product;
  } catch (e) {
    throw new Error("Not able to find product: " + e);
  }
};

export const updateProduct = async (values: FormData) => {
  const { id, stock, color, description, title } = Object.fromEntries(values);

  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    //const product = await Product.findById(id);
    //return product;
  } catch (e) {
    throw new Error("Not able to find product: " + e);
  }
};
