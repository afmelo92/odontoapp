"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  images: {
    default: string;
  };
};

type ProductRowProps = {
  exhibitor: {
    id: number;
    name: string;
    products: Product[];
  };
};

const ProductRow: React.FC<ProductRowProps> = ({ exhibitor }) => {
  return (
    <>
      <h1 className=" w-fit font-semibold text-lg text-gray-900 border-b-2 border-amber-500">
        {exhibitor.name}
      </h1>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
        className="mySwiper overflow-auto product-row min-h-[400px]"
      >
        {exhibitor.products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="min-h-[220px] h-full p-2 product-card flex items-center justify-center"
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductRow;
