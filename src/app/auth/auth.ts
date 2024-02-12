import NextAuth from "next-auth";
import { authConfig } from "../../../auth.config";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import bcrypt from "bcrypt";
import { User } from "../db/schema";
import connectDB from "../db/conn";

const login = async (username: string, password: string) => {
  try {
    connectDB();
    const user = await User.findOne({ username: username });

    if (!user || !user.isAdmin) throw new Error("Wrong credentials!");
    let isPasswordCorrect;
    if (user.password.startsWith("$2")) {
      isPasswordCorrect = await bcrypt.compare(password, user.password);
    } else {
      isPasswordCorrect = password.localeCompare(user.password) === 0;
    }
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to login!");
  }
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({
              username: z.string().min(2),
              password: z.string().min(6),
            })
            .safeParse(credentials);
          if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data;

            const user = await login(username, password);
            return user;
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // console.log("jwt in callbacks", user._doc, token);
        token.username = user._doc.username;
        token.img = user._doc.img;
        token.email = user._doc.email;
        token.phone = user._doc.phone;
        token.isAdmin = user._doc.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.username;
        session.user.image = token.img;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
      }
      //console.log({ token, session });

      return session;
    },
  },
});
