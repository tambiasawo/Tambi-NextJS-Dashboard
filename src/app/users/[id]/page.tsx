import { fetchUser, updateUser } from "@/app/actions";
import React from "react";
import styles from "@/app/styles/SingleUser.module.css";
import Image from "next/image";

const SingleUser = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await fetchUser(id);

  return (
    <div className={`${styles.container} flex-col lg:flex-row`}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || ""} alt={user.username} fill />
        </div>
        <h1 className="text-lg font-semibold text-center">{user.username}</h1>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} action={updateUser}>
          <label className="text-[22px]">Username</label>
          <input type="text" name="id" hidden value={user.id} readOnly />
          <input
            type="text"
            name="username"
            placeholder={user.username}
            required
          />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} required />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder={user.password}
            required
          />
          <label>Phone</label>
          <input type="phone" name="Phone" placeholder={user.phone} />
          <label>Is Active ?</label>

          <select
            name="isActive"
            id="isActive"
            value={user.isActive ? "true" : "false"}
          >
            <option value="0">Is Active ?</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <label>Is Admin ?</label>
          <select
            name="isAdmin"
            id="isAdmin"
            value={user.isAdmin ? "true" : "false"}
            required
          >
            <option value="0">Is Admin ?</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <label>Address</label>
          <textarea name="address" placeholder={user.address} rows={8} />

          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUser;
