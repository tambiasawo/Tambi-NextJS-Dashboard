import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@/app/ui/Card";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DataTable from "../ui/Table";
import { Box } from "@mui/material";
import Chart from "../ui/Chart";

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
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: false,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 80,
    editable: false,
  },
  {
    field: "username",
    headerName: "User name",
    width: 160,
  },
  {
    field: "email",
    headerName: "E-Mail",
    description: "This is the user email.",
    width: 160,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 110,
  },
  {
    field: "login",
    headerName: "Last Login",
    width: 110,
  },
];

const rows: Rows[] = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 14,
    username: "jonsnow",
    email: "jonsnow@gmail.com",
    gender: "Male",
    lastlogin: new Date(),
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 31,
    username: "jonsnow",
    email: "jonsnow@gmail.com",
    gender: "Female",
    lastlogin: new Date(),
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 31,
    username: "jonsnow",
    email: "jonsnow@gmail.com",
    gender: "Male",
    lastlogin: new Date(),
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 11,
    username: "jonsnow",
    email: "jonsnow@gmail.com",
    gender: "Male",
    lastlogin: new Date(),
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 33,
    username: "jonsnow",
    email: "jonsnow@gmail.com",
    gender: "Male",
    lastlogin: new Date(),
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Rachel",
    age: 15,
    username: "jonsnow",
    email: "jonsnow@gmail.com",
    gender: "Male",
    lastlogin: new Date(),
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    username: "jonsnow",
    email: "jonsnow@gmail.com",
    gender: "Male",
    lastlogin: new Date(),
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    username: "jonsnow",
    email: "jonsnow@gmail.com",
    gender: "Male",
    lastlogin: new Date(),
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    username: "jonsnow",
    email: "jonsnow@gmail.com",
    gender: "Male",
    lastlogin: new Date(),
  },
];
const Dashboard = () => {
  return (
    <Box className="flex flex-col">
      <Grid container columnSpacing={2} rowSpacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            icon={<AnnouncementIcon />}
            heading="Total Users"
            main={10.23}
            footer="12% more than previous year"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            icon={<AnnouncementIcon />}
            heading="Total Users"
            main={10.23}
            footer="12% more than previous year"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card
            icon={<AnnouncementIcon />}
            heading="Total Users"
            main={10.23}
            footer="-10% more than previous year"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={8}>
          <DataTable rows={rows} columns={columns} title={"Users"} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Chart title="Groupings" />
        </Grid>
        <Grid item xs={12}>
          <DataTable rows={rows} columns={columns} title={"Products"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
