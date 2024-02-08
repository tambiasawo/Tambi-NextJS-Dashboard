import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@/app/ui/Card";
import AnnouncementIcon from "@mui/icons-material/Announcement";

const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
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
      </Grid>
    </div>
  );
};

export default Dashboard;
