import React from "react";
import { fetchProducts } from "../actions";
import DataTable from "../ui/Table";
import { GridColDef } from "@mui/x-data-grid";
import Toolbar from "../ui/Toolbar";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "desc", headerName: "Description", width: 260 },
  { field: "price", headerName: "Price", width: 90 },
  { field: "stock", headerName: "Stock", width: 90 },
  { field: "createdAt", headerName: "Date Created", width: 260 },
  { field: "color", headerName: "Color", width: 120 },
  {
    field: "action",
    headerName: "Action",
    width: 200,
  },
];

const Products = async ({ searchParams }: { searchParams: { q: string } }) => {
  const searchTerm = searchParams.q;
  const products = await fetchProducts(searchTerm);
  return (
    <div className="px-4 py-2 bg-softBg rounded-md h-screen">
      <Toolbar />
      <DataTable
        rows={JSON.parse(JSON.stringify(products))}
        columns={columns}
      />
    </div>
  );
};

export default Products;
