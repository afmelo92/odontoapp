import React from "react";
import Header from "./_components/Header";
import Products from "./_components/Products";

const ShopPage: React.FC = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">Shop</h1>
      </div>
      <div className="bg-white w-full max-w-full h-full rounded-lg shadow-sm shadow-gray-500 flex flex-col gap-4 p-6 overflow-auto">
        <Header />
        <Products />
      </div>
    </>
  );
};

export default ShopPage;
