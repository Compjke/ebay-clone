"use client";

import Image from "next/image";
import Link from "next/link";
import { BsChevronDown, BsArrowLeftSquare } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useCart } from '@/app/context/Cart';
import {AiOutlineClose} from 'react-icons/ai'
import { useRouter } from 'next/navigation';
import CLientOnly from '@/app/components/ClientOnly/ClientOnly';



const TopMenu = () => {


  const user = useUser();
  const cart = useCart()
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter()

  const isLoggedIn = () => {
    if (user && user?.id) {
      return (
        <button
          // onClick={()=> !isOpenMenu ? setIsOpenMenu(true) : setIsOpenMenu(false)}
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="flex items-center gap-2 hover:underline cursor-pointer"
        >
          <div>
            ⚡Hi, {user.name}
          </div>
            <BsChevronDown />
        </button>
      );
    }

    return (
      <Link
        href="/auth"
        className="flex items-center gap-2 hover:underline cursor-pointer"
      >
        <div>Login</div>
        <BsChevronDown />
      </Link>
    );
  };

  return (
    <>
      <div id="TopMenu" className="border-b">
        <div
          className="
      flex
      items-center
      justify-between
      w-full
      mx-auto
      lg:max-w-[1200px]
      "
        >
          <ul
            id="TopMenuLeft"
            className="flex items-center text-xs max-md:text-[9px] text-slate-500 px-2 h-8 font-semibold"
          >
            <li className="px-3 relative">
              {isLoggedIn()}
              <div
                id="AuthDropDown"
                className={`
                ${isOpenMenu ? "visible" : "hidden"} 
                absolute 
                bg-slate-100 
                w-52 
                text-
                gray-600 
                top-5 
                left-0 
                border-2 
                shadow-lg
                z-10
                transition
                `}
              >
                <div
                  className="
               relative flex items-center justify-start gap-2 p-3
               "
                >
                  <Image
                    src={user?.picture || "/placeholder.webp"}
                    alt="user-avatar"
                    width={50}
                    height={50}
                  />
                  <div className="font-bold text-xs">{user?.name}</div>
                  <div
                    onClick={() => setIsOpenMenu(false)}
                    className="absolute top-2 right-2 opacity-75 hover:opacity-100 transition-opacity cursor-pointer hover:text-red-400"
                  >
                    <AiOutlineClose />
                  </div>
                </div>
                <div className="border-b border-blue-500" />

                <ul className="bg-neutral-100">
                  <li className="w-full text-xs py-2 px-4 hover:underline text-blue-500 hover:text-blue-700 cursor-pointer transition">
                    <Link href="/orders">My orders</Link>
                  </li>
                  <li
                    onClick={() => {
                      user.signOut(), setIsOpenMenu(false);
                    }}
                    className="flex gap-1 items-center w-full text-xs py-2 px-4 hover:underline text-blue-500 hover:text-blue-700 cursor-pointer transition"
                  >
                    <BsArrowLeftSquare />
                    Signout
                  </li>
                </ul>
              </div>
            </li>
            <li className="px-3 hover:underline cursor-pointer">Daily Deals</li>
            <li className="px-3 hover:underline cursor-pointer">
              Help & Contact
            </li>
          </ul>

          <ul
            id="TopMenuRight"
            className="flex items-center text-xs text-neutral-600 px-2 h-8"
          >
            <li className="flex items-center gap-2 hover:underline cursor-pointer">
              <Image
                className='max-w-[40px]'
                width={32}
                height={32}
                alt="flag-ukraine"
                src="/images/uk.png"
              />
              Ship to
            </li>
            <CLientOnly>
              <li className="px-3 hover:underline cursor-pointer">
                <div onClick={() => router.push("/cart")} className="relative">
                  <AiOutlineShoppingCart size={22} />

                  {cart.cartCount() > 0 ? (
                    <div className="flex items-center justify-center absolute text-[9px] -top-1 -right-1 bg-red-400 w-[14px] h-[14px] rounded-full text-white">
                      <div className="">{cart.cartCount()}</div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </li>
            </CLientOnly>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TopMenu;
