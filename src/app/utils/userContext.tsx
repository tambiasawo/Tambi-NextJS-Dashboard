"use client";
import React from "react";

type Props = {
  user: null;
};
const AuthContext = React.createContext<Props>({
  user: null,
});

export const useAuthContext = () => React.useContext(AuthContext);
export const AuthContextProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
