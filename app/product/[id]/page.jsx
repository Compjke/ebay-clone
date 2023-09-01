"use client";

import Product from "@/app/components/Product/Product";
import MainLayout from "@/app/layouts/MainLayout";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SimilarProducts from "@/app/components/Product/SimilarProducst";
import { useCart } from "@/app/context/Cart";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import useIsLOading from "@/app/hooks/useIsLoading";

const ProducPage = ({ params: { id } }) => {
  
  const cart = useCart();
  const [product, setproduct] = useState({});
  const router = useRouter();

  const getProduct = async () => {
    try {
      useIsLOading(true);
      setproduct({});
      const resp = await fetch(`/api/product/${id}`);
      const prod = await resp.json();
      setproduct(prod);
      cart.isItemAddedToCart(prod);
    } catch (err) {
      console.log(err);
    } finally {
      useIsLOading(false);
    }
  };

  useEffect(() => {
    getProduct()
  },[])
  return (
    <MainLayout>
      <div className="lg:max-w-[1200px] mx-auto max-lg:px-3 relative">
        <div
          onClick={() => router.back()}
          className="flex max-w-fit opacity-50 hover:opacity-100 cursor-pointer items-center"
        >
          <IoIosArrowBack size={50} />
          <span>back</span>
        </div>
        <div className="md:flex px-4 py-10">
          {product?.imageUrl ? (
            <Image
              className="md:w-[60%] w-full max-md:mb-5"
              width={280}
              height={280}
              src={product.imageUrl}
              alt={product.title}
            />
          ) : (
            <div className="w-[40%]"></div>
          )}
          <div className="px-4 w-full">
            <h3 className="font-bold text-xl">{product.title}</h3>
            <div className="text-sm text-gray-700 pt-2">
              Brand New - Full Warranty
            </div>
            <div className="border-b py-1" />

            <div className="pt-3 pb-2">
              <div className="flex items-center">
                Condition: <span className="font-bold text-lg ml-2">New</span>
              </div>
            </div>
            <div className="border-b py-1" />
            <div className="pt-3">
              <div className="w-full gap-2  flex-wrap flex items-center justify-between">
                <div className="flex items-center">
                  Price:
                  {product?.price ? (
                    <div className="font-bold md:text-xl ml-2">
                      USD ${(product.price / 100).toFixed(2)}
                    </div>
                  ) : null}
                </div>

                <button
                  onClick={() => {
                    if (cart.isItemAdded) {
                      cart.removeFromCart(product);
                      toast.info("Removed from card", {
                        autoClose: 1500,
                        position: "bottom-right",
                        theme: "colored",
                      });
                    } else {
                      cart.addToCart(product);
                      toast.success("Added to cart", {
                        autoClose: 1500,
                        position: "bottom-right",
                        theme: "colored",
                      });
                    }
                  }}
                  className={`
                 text-white 
                 py-2 
                 lg:px-20
                 px-5
                 max-md:text-sm 
                 rounded-full 
                 cursor-pointer
                 hover:opacity-70
                 transition
                 ${
                   cart.isItemAdded
                     ? "bg-orange-300 hover:bg-orange-500"
                     : "  bg-[#17a2cc] hover:bg-[#0e7999]"
                 }
                 `}
                >
                  {cart.isItemAdded ? "Remove from cart" : "Add to cart"}
                </button>
              </div>
              <div className="border-b py-1" />

              <div className="pt-3">
                <h4 className="font-semibold pb-1">Description:</h4>
                <p className="lg:text:sm text-xs">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimilarProducts />
    </MainLayout>
  );
};

export default ProducPage;
