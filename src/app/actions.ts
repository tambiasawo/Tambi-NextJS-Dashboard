import connectDB from "@/app/db/conn";
import { Product } from "@/app/db/schema";

export type Product = typeof Product;
export const fetchProducts = async (searchTerm: string) => {
  connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });

  const regex = new RegExp(searchTerm, "i");
  const products = await Product.find({ title: { $regex: regex } });

  return products;
};
