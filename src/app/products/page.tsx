import React from "react";
import { fetchProducts } from "../actions";
import DataTable from "../ui/Table";
import { GridColDef } from "@mui/x-data-grid";
import Toolbar from "../ui/Toolbar";

export const columns: GridColDef[] = [
  { field: "title", headerName: "Title", minWidth: 150 },
  { field: "desc", headerName: "Description", minWidth: 200 },
  { field: "price", headerName: "Price", minWidth: 120 },
  { field: "stock", headerName: "Stock", minWidth: 120 },
  { field: "createdAt", headerName: "Date Created", minWidth: 170 },
  { field: "color", headerName: "Color", minWidth: 120 },
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
