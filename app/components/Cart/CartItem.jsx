"use client";

import { useCart } from '@/app/context/Cart';
import Image from "next/image";
import {AiOutlineDelete ,AiOutlineCloseCircle} from 'react-icons/ai'
import { toast } from 'react-toastify';
import { useState } from 'react';
import {GiConfirmed} from 'react-icons/gi'

const CartItem = ({ product }) => {
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [visibleConfirmToDelete , setVisibleConfirmToDelete] = useState(false)
  const cart = useCart();
  

  const removeItemFromCart = () => {
    cart.removeFromCart(product);
    toast.warning('Product was removed' , {theme : 'light' , position : 'top-center' , autoClose : 1000})
  }
  return (
    <>
      <div className="relative flex justify-start my-2 border w-full p-6">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={150}
          height={150}
          className="rounded-md "
        />
        <div className="overflow-hidden pl-2 w-full">
          <div className="flex flex-wrap items-center justify-between w-full">
            <h3 className="flex items-center font-semibold justify-between lg:w-[400px] w-[200px] text-base underline">
              {product.title}
            </h3>
            <p className="font-bold text-lg">
              ${(product?.price / 100).toFixed(2)}
            </p>
          </div>
          <div className="font-semibold mt-2">New</div>

          <div className="text-sm mt-2">
            {product?.description.substring(0, 30)}...
          </div>

          <div
            title="Delete"
            className={`
          absolute 
          right-1 
          bottom-1
          ${visibleConfirmToDelete ? "bg-slate-200" : " bg-red-400"} 
           p-1 
           rounded-md
           opacity-90
           hover:opacity-100
           `}
          >
            {visibleConfirmToDelete ? (
              <div className=" flex gap-2 text-sm">
                Are you sure?
                <div>
                  <GiConfirmed
                    onClick={removeItemFromCart}
                    className="hover:text-teal-400 text-teal-600  cursor-pointer hover:scale-105"
                    size={20}
                  />
                </div>
                <div>
                  <AiOutlineCloseCircle
                    onClick={() => setVisibleConfirmToDelete(false)}
                    className="hover:text-red-600  text-red-400 cursor-pointer hover:scale-105"
                    size={20}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={() => setVisibleConfirmToDelete(true)}
                className="text-red-700 underline flex items-center"
              >
                <AiOutlineDelete className="lg:text-md text-2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
