"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Toolbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      params.set("q", e.target.value);
      router.replace(`${pathname}?${params}`);
    } else {
      params.delete("q", e.target.value);
      router.replace(`${pathname}`);
    }
  };

  return (
    <div className="flex justify-between mt-3 items-center">
      <div>
        <input
          type="text"
          placeholder="Search"
          name="search"
          className="px-3 py-2 rounded-md bg-mainBg outline:none focus:outline-none"
          onChange={handleSearch}
        />
      </div>
      <div>
        <button className="bg-[#5d57c9] px-3 py-2 rounded-lg">Add New</button>
      </div>
    </div>
  );
};

export default Toolbar;
