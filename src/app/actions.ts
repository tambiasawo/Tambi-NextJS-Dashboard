"use server";
import connectDB from "@/app/db/conn";
import { Product, Transaction, User } from "@/app/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth/auth";
import { AuthError } from "next-auth";

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

export const fetchProduct = async (id: string) => {
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
  const formValues = Object.fromEntries(values);
  const { id } = formValues;

  const productUpdate = { ...formValues };
  delete productUpdate.id;

  Object.keys(productUpdate).forEach((key) => {
    const value = productUpdate[key];
    if (value === "") delete productUpdate[key];
  });

  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    await Product.findByIdAndUpdate(id, productUpdate);
  } catch (e) {
    throw new Error("Not able to update product: " + e);
  }

  revalidatePath("/products");
  redirect("/products");
};

export const fetchUser = async (id: string) => {
  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    const user = await User.findById(id);

    return user;
  } catch (e) {
    throw new Error("Not able to find user: " + e);
  }
};

export const addUser = async (values: FormData) => {
  connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  const { username, email, password, phone, address, isActive, isAdmin } =
    Object.fromEntries(values);

  try {
    await User.create({
      username,
      email,
      password,
      isActive,
      isAdmin,
      phone,
      address,
    });
  } catch (err) {
    throw new Error("Could not create user" + err);
  }

  revalidatePath("/users");
};

export const fetchUsers = async (searchTerm: string) => {
  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    const regex = new RegExp(searchTerm, "i");
    const users = await User.find({
      username: { $regex: regex },
    });
    return users;
  } catch (e) {
    throw new Error("Could'nt fetch user" + e);
  }
};

export const deleteUser = async (value: FormData) => {
  const { id } = Object.fromEntries(value);

  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    await User.findByIdAndDelete(id);
  } catch (e) {
    throw new Error("Not able to delete user: " + e);
  }

  revalidatePath("/users");
};

export const updateUser = async (values: FormData) => {
  const formValues = Object.fromEntries(values);
  const { id } = formValues;

  const userUpdate = { ...formValues };
  delete userUpdate.id;

  Object.keys(userUpdate).forEach((key) => {
    const value = userUpdate[key];
    if (value === "") delete userUpdate[key];
  });

  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    await User.findByIdAndUpdate(id, userUpdate);
  } catch (e) {
    throw new Error("Not able to update user: " + e);
  }

  revalidatePath("/users");
  redirect("/users");
};

export const fetchTransaction = async (id: string) => {
  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    const trans = await Transaction.findById(id);

    return trans;
  } catch (e) {
    throw new Error("Not able to find trans: " + e);
  }
};

export const fetchTransactions = async (searchTerm: string) => {
  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    const regex = new RegExp(searchTerm);
    const trans = await Transaction.find({ invoice: { $regex: regex } });
    return trans;
  } catch (e) {
    throw new Error("Could'nt fetch trans" + e);
  }
};

export const addTransaction = async (values: FormData) => {
  connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  const { invoice, amount, createdAt, recipient, description } =
    Object.fromEntries(values);

  try {
    await Transaction.create({
      invoice,
      amount,
      description,
      createdAt,
      recipient,
    });
  } catch (err) {
    throw new Error("Could not create Transaction" + err);
  }

  revalidatePath("/transactions");
};
export const deleteTransaction = async (value: FormData) => {
  const { id } = Object.fromEntries(value);

  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    await Transaction.findByIdAndDelete(id);
  } catch (e) {
    throw new Error("Not able to delete trans: " + e);
  }

  revalidatePath("/transactions");
};

export const updateTransaction = async (values: FormData) => {
  const formValues = Object.fromEntries(values);
  const { id } = formValues;

  const userUpdate = { ...formValues };
  delete userUpdate.id;

  Object.keys(userUpdate).forEach((key) => {
    const value = userUpdate[key];
    if (value === "") delete userUpdate[key];
  });

  await connectDB().catch((e) => {
    throw new Error("Could'nt connect to the database", e);
  });
  try {
    await Transaction.findByIdAndUpdate(id, userUpdate);
  } catch (e) {
    throw new Error("Not able to update transaction: " + e);
  }

  revalidatePath("/transactions");
  redirect("/transactions");
};

export const authenticate = async (
  previousState: string | undefined,
  formData: FormData
) => {
  try {
    const { username, password } = Object.fromEntries(formData);
    await signIn("credentials", { username, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut();
};
