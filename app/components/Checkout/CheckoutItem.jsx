"use client";

import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";

import { usePathname } from "next/navigation";

const CheckoutItem = ({ product }) => {
  const pathname = usePathname();

  return (
    <div className="flex justify-start rounded-lg mb-2 border p-4">
      <Image
        src={product.imageUrl}
        alt={product.title}
        width={150}
        height={150}
        className="w-40 h-40 "
      />

      <div className="overflow-hidden pl-2">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-lg font-semibold">
          <span className="font-bold">${(product.price / 100).toFixed(2)}</span>
        </p>
        <div
          className="
          relative
          flex
          items-center
          text-sm
          text-slate-500

          "
        >
          <div className="line-through">
            ${((product.price * 2) / 100).toFixed(2)}
          </div>
          <div className="px-2">-</div>
          <div className="line-through">20%</div>
        </div>

        <div className="text-sm mt-2">
          {product.description.substring(0, 100)}...
        </div>

        {pathname === "/cart" ? (
          <div className="text-sm mt-2 w-full flex justify-end underline text-blue-500 cursor-pointer">
            <MdDeleteOutline size={30} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CheckoutItem;
