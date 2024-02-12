"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogTitle, DialogProps } from "@mui/material";
import styles from "@/app/styles/FormDialog.module.css";
import { addProduct } from "../actions";
import { useAuthContext } from "../utils/userContext";

const Toolbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [open, setOpen] = React.useState(false);

  const {
    user: { user },
  } = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      params.set("q", e.target.value);
      router.replace(`${pathname}?${params}`);
    } else {
      params.delete("q", e.target.value);
      router.replace(`${pathname}`);
    }
  };
  return (
    <div className="flex justify-between mt-3 items-center">
      <div>
        <input
          type="text"
          placeholder="Search"
          name="search"
          className="px-3 py-2 rounded-md bg-mainBg outline:none focus:outline-none"
          onChange={handleSearch}
        />
      </div>
      {user.isAdmin && (
        <div>
          <button
            className="bg-[#5d57c9] px-3 py-2 rounded-lg"
            onClick={handleClickOpen}
          >
            Add New
          </button>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        PaperProps={{
          style: { backgroundColor: "var(--softBg)" },
        }}
      >
        <DialogTitle className="text-white">Add New Product</DialogTitle>
        <div>
          <form
            className={styles.form}
            action={addProduct}
            onSubmit={handleClose}
          >
            <div className="flex justify-between gap-4">
              <input type="text" placeholder="Title" name="title" />
              <input type="number" placeholder="Price" name="price" />
            </div>
            <div className="flex justify-between gap-4">
              <input type="text" placeholder="Color" name="color" />
              <input type="number" placeholder="Stock " name="stock" />
            </div>

            <div className="flex items-baseline gap-4">
              <input type="url" name="img" placeholder="Photo URL" />
              <textarea
                name="description"
                rows={5}
                className=""
                placeholder="Description"
              />
            </div>
            <button className="bg-[#5d57c9] py-3 rounded" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Toolbar;
