import Image from "next/image";
import { useState } from "react";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice: number;
    images: {
      default: string;
    };
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  function handleQuantity(plus: boolean) {
    if (plus) {
      if (quantity < 99) {
        setQuantity((prev) => prev + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  }

  return (
    <div className="h-full w-full bg-white rounded-lg shadow-md shadow-gray-400 flex flex-col items-center justify-between gap-0 p-2">
      <div id="product-data" className="w-full h-full">
        <div id="image" className=" min-h-[calc(40%)] w-full relative">
          <Image
            alt={product.name}
            src={product.images.default}
            fill
            className="object-contain"
            quality={100}
            sizes="(max-width: 768px) 20vw, (max-width: 1200px) 20vw, 33vw"
          />
        </div>
        <h1 className="font-semibold text-sm text-gray-900 min-h-[calc(20%)] w-full">
          {product.name}
        </h1>
        <p
          title={product.description}
          className="font-medium text-xs text-gray-600 w-full h-full max-h-[calc(15%)] line-clamp-1"
        >
          {product.description}
        </p>
        <div
          id="price-info-container"
          className="h-full max-h-[calc(20%)] flex flex-col gap-2 py-2"
        >
          <h3 className="flex gap-1 items-center">
            <s className="text-xs font-medium text-gray-400 ">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "brl",
              }).format(product.oldPrice)}
            </s>
            <span className="bg-amber-500 text-white p-1 rounded text-xs font-semibold">
              {Math.round(100 - (product.price / product.oldPrice) * 100)}% OFF
            </span>
          </h3>
          <h2 className="font-semibold text-lg text-gray-900">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "brl",
            }).format(product.price)}
          </h2>
        </div>
      </div>
      <div id="cta-container" className="w-full grid grid-cols-6 gap-1">
        <div
          id="qty-container"
          className="col-span-2 border-[1px] border-gray-300 rounded flex items-center justify-between"
        >
          <button
            onClick={() => handleQuantity(false)}
            disabled={quantity <= 1}
            className="h-full border-r-[1px] px-1 text-gray-500 font-semibold hover:bg-gray-300 disabled:cursor-not-allowed"
          >
            -
          </button>
          {quantity}
          <button
            onClick={() => handleQuantity(true)}
            disabled={quantity >= 99}
            className="h-full border-l-[1px] px-1 text-gray-500 font-semibold hover:bg-gray-300 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
        <button className="col-span-4 bg-blue-500 hover:bg-blue-700 transition-colors w-full rounded text-white font-semibold text-xs py-3">
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
