"use client";
import { Session } from "next-auth";
import React from "react";

const AuthContext = React.createContext<Session>({
  user: {
    user: {
      name: "",
      isAdmin: false,
      email: "",
      image: "",
    },
  },
});

export const useAuthContext = () => React.useContext(AuthContext);
export const AuthContextProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: Session;
}) => {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
