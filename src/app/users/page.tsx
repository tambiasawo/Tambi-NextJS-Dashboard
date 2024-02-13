import React from "react";
import { addUser, fetchUsers } from "../actions";
import DataTable from "../ui/Table";
import Toolbar from "../ui/Toolbar";
import { usersColumns } from "../components/Dashboard";

const Users = async ({ searchParams }: { searchParams: { q: string } }) => {
  const searchTerm = searchParams.q;
  const users = await fetchUsers(searchTerm);

  return (
    <div className="px-4 py-2 bg-softBg rounded-md h-screen">
    <Toolbar
        action={addUser}
        title="User"
        formFields={[
          { type: "email", name: "email", placeholder: "Email Address" },
          { type: "text", name: "username", placeholder: "Username" },
          { type: "text", name: "password", placeholder: "Password" },
          { type: "text", name: "phone", placeholder: "Phone" },
          { type: "text", name: "address", placeholder: "Address" },
          {
            type: "select",
            name: "isAdmin",
            id: "isAdmin",
            options: [
              { value: "0", option: "Is Admin" },
              { value: "true", option: "Yes" },
              { value: "false", option: "No" },
            ],
          },
          {
            type: "select",
            name: "isActive",
            id: "isActive",
            options: [
              { value: "0", option: "Is Active" },
              { value: "true", option: "Yes" },
              { value: "false", option: "No" },
            ],
          },
        ]}
      />
      <DataTable
        rows={JSON.parse(JSON.stringify(users))}
        columns={usersColumns}
      />
    </div>
  );
};

export default Users;
