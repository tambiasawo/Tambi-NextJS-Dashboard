"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Paper from "@mui/material/Paper";

export default function Chart({ title }: { title: string }) {
  return (
    <>
      <h1 className="p-2 text-lg font-bold ">{title}</h1>
      <Paper className="bg-softBg rounded-md">
        <BarChart
          sx={{
            ".MuiChartsAxis-root .MuiChartsAxis-tickLabel": { fill: "white" },
          }}
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          height={400}
        />
      </Paper>
    </>
  );
}
