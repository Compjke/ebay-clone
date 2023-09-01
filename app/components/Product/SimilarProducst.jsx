"use client";
import { useEffect, useState } from "react";
import Product from "./Product";
import { BiLoader } from "react-icons/bi";

const SimilarProducts = () => {
  const [products, setproducts] = useState([]);
  const [findSimilar, setfindSimilar] = useState(false);

  const getRandomProduct = async () => {
    try {
      setfindSimilar(true);
      const res = await fetch("/api/products/get-random");
      const products = await res.json();
      if (products) {
        setproducts(products);
        return;
      }
      setproducts([]);
    } catch (err) {
      console.log(err);
    } finally {
      setfindSimilar(false);
    }
  };

  useEffect(() => {
    getRandomProduct();
  }, []);

  return (
    <>
      <div>
        <div className="mx-auto border-b py-1 lg:max-w-[1200px] px-3" />
        <div className="lg:max-w-[1200px] mx-auto px-3">
          <h3 className="font-bold text-2xl py-2 mt-4">
            Similar sponsored items
          </h3>
          {products.length > 0 ? (
            <div className="grid grid-cols-productGrid gap-4">
              {products.map((prod) => (
                <Product key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="flex my-auto items-center justify-center">
              {findSimilar ? (
                <div className="flex items-center justify-center gap-4 font-semibold">
                  <BiLoader size={50} className="text-blue-300 animate-spin" />
                  Find Similar....
                </div>
              ) : (
                <div className="font-semibold text-sm mt-5">
                  No similar producst
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;
