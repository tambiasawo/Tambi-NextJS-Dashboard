"use client";
import { Session } from "next-auth";
import React from "react";

type Props = {
  user: {
    user: {
      name: string;
      isAdmin: boolean;
      email: string;
      image: string;
    };
  };
};

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
