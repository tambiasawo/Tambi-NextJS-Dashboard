import { fetchProduct, updateProduct } from "@/app/actions";
import React from "react";
import styles from "@/app/styles/SingleProduct.module.css";
import Image from "next/image";

const SingleProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const product = await fetchProduct(id);

  return (
    <div className="flex gap-12 lg:items-start flex-col  lg:flex-row">
      <div className="rounded-md basis-[25%] h-max flex flex-col gap-5 py-3 px-0 bg-softBg items-center">
        <Image src={product.img} alt={product.name} width={280} height={300} />
        <h1 className="text-lg font-semibold">{product.title}</h1>
      </div>

      <div className="bg-softBg basis-[65%]">
        <form className={styles.form} action={updateProduct}>
          <input type="hidden" name="id" value={product.id} />
          <label>Title</label>
          <input
            type="text"
            placeholder={product.title}
            name="title"
            required
          />
          <label>Price</label>
          <input
            type="number"
            placeholder={product.price}
            name="price"
            required
          />

          <label>Color</label>
          <input type="text" placeholder={product.color} name="color" />
          <label>Stock</label>
          <input
            type="number"
            placeholder={product.stock}
            name="stock"
            required
          />
          <label>Description</label>
          <textarea
            name="description"
            rows={5}
            className=""
            placeholder={product.description}
          />
          <button className="bg-[#5d57c9] py-3 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
