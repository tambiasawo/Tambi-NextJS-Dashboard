import React from "react";
import { fetchProducts } from "../actions";
import DataTable from "../ui/Table";
import Toolbar from "../ui/Toolbar";
import { productsColumns } from "../components/Dashboard";
import { addProduct } from "../actions";

const Products = async ({ searchParams }: { searchParams: { q: string } }) => {
  const searchTerm = searchParams.q;
  const products = await fetchProducts(searchTerm);
  return (
    <div className="px-4 py-2 bg-softBg rounded-md h-screen">
      <Toolbar
        title="Product"
        action={addProduct}
        formFields={[
          { type: "text", name: "title", placeholder: "Title" },
          { type: "number", name: "price", placeholder: "Price" },
          { type: "number", name: "size", placeholder: "Size" },
          { type: "number", name: "stock", placeholder: "Stock" },
          { type: "text", name: "color", placeholder: "Color" },
          { type: "text", name: "img", placeholder: "Image Link" },
          {
            type: "textarea",
            name: "description",
            placeholder: "Description",
          },
        ]}
      />
      <DataTable
        rows={JSON.parse(JSON.stringify(products))}
        columns={productsColumns}
      />
    </div>
  );
};

export default Products;
