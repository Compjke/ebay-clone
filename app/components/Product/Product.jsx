import Image from 'next/image';
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <>
      <Link
        href={`/product/${product.id}`}
        className="
         lg:max-w-[280px]
         max-w-[150px]
         p-1.5 border
         border-slate-100
         hover:border-slate-500 
         hover:shadow-xl 
         bg-slate-100 
         rounded 
         mx-auto
         transition
         hover:scale-105
      "
      >
        {product?.imageUrl ? (
          <Image
            src={product.imageUrl}
            width={200}
            height={200}
            alt={product.title}
            className="cursor-pointer rounded"
          />
        ) : (
          <Image
            src="/images/no-image.svg.png"
            width={200}
            height={200}
            alt="no-image-product"
            className="cursor-pointer rounded"
          />
        )}

        <div className="pt-2 px-1">
          <h3 className="font-semibold text-sm hover:underline cursor-pointer">
            {product.title}
          </h3>
          <p className="font-extrabold">{(product.price / 100).toFixed(2)} $</p>
          <div className="relative flex items-center text-xs text-gray-500">
            <p className="line-through">
              {((product.price * 1.2) / 100).toFixed(2)} $
            </p>
            <p className="px-2">-</p>
            <p className="line-through">20%</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
