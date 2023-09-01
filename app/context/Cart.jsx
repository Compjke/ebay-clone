"use client";

import { createContext, useState, useContext } from "react";

import { useRouter } from "next/navigation";



const CartContext = createContext(null)


const CartProvider = ({children}) => {
   const [isItemAdded, setisItemAdded] = useState(false);
   const router = useRouter()

   const getCart= () => {
      let cart = [];
      if(typeof localStorage !== 'undefined'){
         cart = JSON.parse(localStorage.getItem('cart')) || [];
      }

      return cart;
   }

   const addToCart = (product) => {
       let cart = [];
       if (typeof localStorage !== "undefined") {
         cart = JSON.parse(localStorage.getItem("cart")) || [];
       }
       cart.push(product)
       localStorage.setItem('cart' , JSON.stringify(cart))
       isItemAddedToCart(product)
       router.refresh()
   }

   const removeFromCart = (product) => {
        let cart = [];
        if (typeof localStorage !== "undefined") {
          cart = JSON.parse(localStorage.getItem("cart")) || [];
        }
        cart = cart.filter(c => c.id !== product.id)
        localStorage.setItem("cart", JSON.stringify(cart));
        isItemAddedToCart(product);
        router.refresh();
   }

   const isItemAddedToCart =  (product) => {
          let cart = [];
          if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem("cart")) || [];
          }
          cart = cart.filter((c) => c.id === product.id);
          if(cart.length > 0) {
            setisItemAdded(true)
            return
          }
          setisItemAdded(false);
   }

   const cartCount = () => {
      let cart = [];
      if (typeof localStorage !== "undefined") {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
      }
      return cart.length
   }


   const cartTotal = () => {
      // let total = 0 ;
      let cart = [];
      if (typeof localStorage !== "undefined") {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
      }

      // for(let i=0; i < cart.length ; i++){
      //    const  element = cart[i];
      //    total += element.price
      // }

      const total = cart.reduce((total, curItem) => {
         return total + curItem.price
      }, 0)

      return total

   }

   const clearCart = () => {
      localStorage.removeItem('cart')
      router.refresh()
   }
   const values = {
      isItemAdded,
      getCart,
      addToCart,
      removeFromCart,
      isItemAddedToCart,
      cartCount,
      cartTotal,
      clearCart
   }
   return ( 
      <CartContext.Provider value={values} >
            {children}
      </CartContext.Provider>
    );
}
 
export const useCart = () => useContext(CartContext)

export default CartProvider;