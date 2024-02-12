import React from "react";
import { fetchUsers } from "../actions";
import DataTable from "../ui/Table";
import Toolbar from "../ui/Toolbar";
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "username",
    headerName: "Username",
    width: 150,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "email",
    headerName: "Email Address",
    width: 170,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "createdAt",
    headerName: "Date Created",
    width: 170,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "isAdmin",
    headerName: "Role",
    width: 170,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "isActive",
    headerName: "Status",
    width: 170,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "address",
    headerName: "Address",
    width: 170,
    headerAlign: "left",
    align: "left",
  },
];

const Users = async ({ searchParams }: { searchParams: { q: string } }) => {
  const searchTerm = searchParams.q;
  const users = await fetchUsers(searchTerm);

  return (
    <div className="px-4 py-2 bg-softBg rounded-md h-screen">
      <Toolbar />
      <DataTable rows={JSON.parse(JSON.stringify(users))} columns={columns} />
    </div>
  );
};

export default Users;
