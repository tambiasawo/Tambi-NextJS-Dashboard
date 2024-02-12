"use client";
import React from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import styles from "@/app/styles/Login.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../actions";
import { Error } from "@mui/icons-material";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const [state, formAction] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();
  return (
    <section className=" w-1/3  mx-auto py-8 flex flex-col justify-center bg-white mt-60 px-3 rounded-md">
      <h1 className="text-center text-black font-semibold text-4xl">Login</h1>
      <form
        className="flex flex-col gap-7 p-5 justify-center items-center"
        action={formAction}
      >
        <div className="flex gap-4 w-full border rounded-xl  items-center px-2">
          <input
            type="text"
            placeholder="Username"
            name="username"
            className={styles.input_group}
            required
          />

          <span className="text-slate-300">
            <AlternateEmailIcon />
          </span>
        </div>
        <div className="w-full rounded-xl border flex items-center justify-between">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            name="password"
            className={styles.input_group}
          />
          <span
            className="text-slate-300 pr-3 focus:color-bg-formBg cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            <FingerprintIcon />
          </span>
        </div>

        <div
          className="flex h-4 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state && (
            <>
              <Error className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state}</p>
            </>
          )}
        </div>
        <button
          type="submit"
          className="bg-softBg w-full py-2 rounded-xl"
          aria-disabled={pending}
        >
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Login;
