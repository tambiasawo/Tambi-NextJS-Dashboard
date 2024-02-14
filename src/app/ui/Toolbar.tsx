"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogTitle } from "@mui/material";
import styles from "@/app/styles/FormDialog.module.css";
import { useAuthContext } from "../utils/userContext";

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
        <DialogTitle className="text-white">Add New {title}</DialogTitle>
        <div>
          <form className={styles.form} action={action} onSubmit={handleClose}>
            <div className="grid grid-cols-2 gap-5 mb-3">
              {formFields.map((field: Field) => {
                if (field.type === "select") {
                  return (
                    <select key={field.name} name={field.name} id={field.id}>
                      {field.options?.map((option) => (
                        <option value={option.value}>{option.option} </option>
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
