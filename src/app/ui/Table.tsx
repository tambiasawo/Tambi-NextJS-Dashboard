"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Rows } from "../components/Dashboard";
import Link from "next/link";
import { deleteProduct } from "../actions";

type Data<T> = T;
interface Props {
  rows: Data<Rows>[];
  columns: GridColDef[];
  title?: string;
}

const DataTable = ({ rows, columns, title }: Props) => {
  const findActionColumn = columns.find((column) => column.field === "action");
  if (findActionColumn)
    findActionColumn.renderCell = (params: GridRenderCellParams) => {
      return (
        <span className="flex justify-between gap-4">
          <Link href={`/products/${params.id}`}>
            <button className="bg-green-500 px-3 py-1 rounded-md">View</button>
          </Link>
          <form action={deleteProduct}>
            <input type="hidden" value={params.id} name="id" />
            <button className="bg-red-500 px-3 py-1 rounded-md" type="submit">
              Delete
            </button>
          </form>
        </span>
      );
    };
  return (
    <>
      <h1 className="p-2 text-lg semi-bold">{title}</h1>
      <Box
        sx={{ height: 500, width: "100%" }}
        className="bg-softBg overflow-y-scroll"
      >
        <DataGrid
          getRowId={(row) => row._id}
          sx={{
            color: "var(--text)",
            ".MuiTablePagination-displayedRows": { color: "var(--text)" },
            ".MuiTablePagination-actions": { color: "var(--text)" },
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          pageSizeOptions={[6]}
        />
      </Box>
    </>
  );
};

export default DataTable;
