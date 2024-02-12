import React from "react";
import { fetchTransactions } from "../actions";
import DataTable from "../ui/Table";
import Toolbar from "../ui/Toolbar";
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "invoice",
    headerName: "Invoice Number",
    width: 150,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
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
    field: "recipient",
    headerName: "Recipient",
    width: 170,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "description",
    headerName: "Description",
    width: 170,
    headerAlign: "left",
    align: "left",
  },
];

const Transactions = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  const searchTerm = searchParams.q;
  const transactions = await fetchTransactions(searchTerm);

  return (
    <div className="px-4 py-2 bg-softBg rounded-md h-screen">
      <Toolbar />
      <DataTable
        rows={JSON.parse(JSON.stringify(transactions))}
        columns={columns}
      />
    </div>
  );
};

export default Transactions;
