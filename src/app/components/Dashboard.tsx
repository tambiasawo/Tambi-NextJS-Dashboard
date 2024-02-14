import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@/app/ui/Card";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import DataTable from "../ui/Table";
import { Box } from "@mui/material";
import Chart from "../ui/Chart";
import { fetchProducts, fetchTransactions, fetchUsers } from "../actions";
import { GridColDef } from "@mui/x-data-grid";

export interface Rows {
  id: number;
  lastName: string;
  firstName: string;
  age: number;
  username: string;
  email: string;
  gender: string;
  lastlogin: Date;
}
export const productsColumns: GridColDef[] = [
  { field: "title", headerName: "Title", minWidth: 150 },
  { field: "description", headerName: "Description", minWidth: 200 },
  { field: "price", headerName: "Price", minWidth: 120 },
  { field: "stock", headerName: "Stock", minWidth: 120 },
  { field: "createdAt", headerName: "Date Created", minWidth: 170 },
  { field: "color", headerName: "Color", minWidth: 120 },
];
export const usersColumns: GridColDef[] = [
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

export const transactionsColumns: GridColDef[] = [
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

const Dashboard = async () => {
  const products = await fetchProducts("");
  const users = await fetchUsers("");
  const transactions = await fetchTransactions("");

  return (
    <Box className="flex flex-col w-[35%] sm:w-[80%] md:w-full !overflow-x-hidden">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card
            icon={<AnnouncementIcon />}
            heading="Total Users"
            main={products.length}
            footer="12% more than previous year"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card
            icon={<AnnouncementIcon />}
            heading="Total Users"
            main={users.length}
            footer="12% more than previous year"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Card
            icon={<AnnouncementIcon />}
            heading="Total Transactions"
            main={transactions.length}
            footer="10% less than previous year"
          />
        </Grid>

        {/* Users DataTable */}
        <Grid item xs={12} sm={12} md={8}>
          <DataTable
            rows={JSON.parse(JSON.stringify(users))}
            columns={usersColumns}
            title={"Users"}
          />
        </Grid>

        {/* Chart */}
        <Grid item xs={12} sm={12} md={4}>
          <Chart title="Groupings" />
        </Grid>

        {/* Products DataTable */}
        <Grid item xs={12} md={6}>
          <DataTable
            rows={JSON.parse(JSON.stringify(products))}
            columns={productsColumns}
            title={"Products"}
          />
        </Grid>

        {/* Transactions DataTable */}
        <Grid item xs={12} md={6}>
          <DataTable
            rows={JSON.parse(JSON.stringify(transactions))}
            columns={transactionsColumns}
            title={"Transactions"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
