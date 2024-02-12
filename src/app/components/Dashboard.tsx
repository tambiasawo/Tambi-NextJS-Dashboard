import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@/app/ui/Card";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import DataTable from "../ui/Table";
import { Box } from "@mui/material";
import Chart from "../ui/Chart";
import { fetchProducts, fetchTransactions, fetchUsers } from "../actions";
import { columns } from "../products/page";
import { columns as userColumns } from "../users/page";
import { columns as transColumns } from "../transactions/page";

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

const Dashboard = async () => {
  const products = await fetchProducts("");
  const users = await fetchUsers("");
  const transactions = await fetchTransactions("");

  return (
    <Box className="flex flex-col">
      <Grid container columnSpacing={2} rowSpacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            icon={<AnnouncementIcon />}
            heading="Total Users"
            main={products.length}
            footer="12% more than previous year"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            icon={<AnnouncementIcon />}
            heading="Total Users"
            main={users.length}
            footer="12% more than previous year"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card
            icon={<AnnouncementIcon />}
            heading="Total Transactions"
            main={transactions.length}
            footer="-10% more than previous year"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={8}>
          <DataTable
            rows={JSON.parse(JSON.stringify(users))}
            columns={userColumns}
            title={"Users"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Chart title="Groupings" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <DataTable
            rows={JSON.parse(JSON.stringify(products))}
            columns={columns}
            title={"Products"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <DataTable
            rows={JSON.parse(JSON.stringify(transactions))}
            columns={transColumns}
            title={"Transactions"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
