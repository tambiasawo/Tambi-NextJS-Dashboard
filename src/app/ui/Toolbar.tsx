"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import styles from "@/app/styles/FormDialog.module.css";
import { useAuthContext } from "../utils/userContext";
import { AddCircleOutline } from "@mui/icons-material";

interface Field {
  type: string;
  name: string;
  id?: string;
  options?: { value: string; option: string }[];
  placeholder?: string;
}

type Props = {
  action: (formData: FormData) => void;
  title: string;
  formFields: Field[];
};
const Toolbar = ({ action, title, formFields }: Props) => {
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
    <div className="flex flex-col-reverse gap-2 md:mt-3 mt-0 md:items-between">
      <div className="flex justify-between gap-2 items-center">
        <input
          type="text"
          placeholder="Search"
          name="search"
          className="px-3 py-2 rounded-md bg-mainBg outline:none focus:outline-none w-full md:w-[50%]"
          onChange={handleSearch}
        />
        {user.isAdmin && (
          <div>
            <div className="">
              <button
                className="bg-[#5d57c9] px-3 py-2 rounded-lg hidden md:block"
                onClick={handleClickOpen}
              >
                Add New
              </button>
            </div>
            <div className="md:hidden">
              <IconButton className="p-1" onClick={handleClickOpen}>
                <AddCircleOutline
                  fontSize="large"
                  sx={{ color: "#fff" }}
                  className="hover:scale-125"
                />
              </IconButton>
            </div>
          </div>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        PaperProps={{
          style: { backgroundColor: "var(--softBg)" },
        }}
      >
        <DialogTitle className="text-white">Add New {title}</DialogTitle>
        <div>
          <form className={styles.form} action={action} onSubmit={handleClose}>
            <div className="grid grid-cols-2 gap-5 mb-3">
              {formFields.map((field: Field) => {
                if (field.type === "select") {
                  return (
                    <select key={field.name} name={field.name} id={field.id}>
                      {field.options?.map((option) => (
                        <option key={option.option} value={option.value}>
                          {option.option}{" "}
                        </option>
                      ))}
                    </select>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <textarea
                      key={field.name}
                      rows={2}
                      placeholder={field.placeholder}
                      name={field.name}
                    />
                  );
                }
                return (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                  />
                );
              })}
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
