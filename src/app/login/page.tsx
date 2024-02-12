import React from "react";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/app/components/LoginForm"), {
  ssr: false,
});

const page = () => {
  return <Login />;
};

export default page;
