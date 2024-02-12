"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const FormDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>Add New Product</DialogContentText>
        <form className={styles.form} action={"createUser"}>
          <div className="flex justify-between gap-4">
            <input type="text" placeholder="Username" name="username" />
            <input type="email" placeholder="Email Address" name="email" />
          </div>
          <div className="flex justify-between gap-4">
            <input type="password" placeholder="Password" name="password" />
            <input type="phone" placeholder="Phone " name="phone" />
          </div>
          <div className="flex justify-between gap-4">
            <select name="isActive" className="flex-1">
              <option value={0}>Is Active</option>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
            <select name="isAdmin" id="isAdmin" className="flex-1">
              <option value={0}>Is Admin</option>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div className="flex items-baseline">
            {/*         <input type="file" name="photo" accept="image/*" />
             */}{" "}
            <textarea
              name="address"
              rows={5}
              className=""
              placeholder="Address"
            />
          </div>
          <button className="bg-[#5d57c9] py-3 rounded">Submit</button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
