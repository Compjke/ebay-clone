'use client'

import { useRouter } from 'next/navigation';
import CartItem from '../components/Cart/CartItem';
import SimilarProducts from '../components/Product/SimilarProducst';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../context/Cart';
import { useEffect } from 'react';
import useIsLOading from '../hooks/useIsLoading';
import { toast } from 'react-toastify';
import CLientOnly from '../components/ClientOnly/ClientOnly';




const Cart = () => {

  const router = useRouter()
  const cart  = useCart();


  useEffect(() => {
    useIsLOading(true);
    cart.getCart();
    cart.cartTotal()
    useIsLOading(false)
  },[cart])

  const goToCheckout = () => {
    if(!cart.cartTotal()) {
      toast.info("You don't have any product in the cart." , {autoClose : 1500 , position : 'top-center'})
      return;
    }
    router.push('/checkout')
  }
   return (
     <MainLayout>
       <div className="lg:max-w-[1200px] mx-auto mb-8 max-lg:px-2 lg:min-h-[380px]">
         <div className="text-2xl font-bold my-4">Shopping card</div>
         <div
           className="
               relative
               lg:flex
               items-baseline
               justify-between
               gap-2
               "
         >
           <CLientOnly>
             <div className="lg:w-[65%]">
               {cart.getCart().map((product) => (
                 <CartItem key={product.id} product={product} />
               ))}
             </div>
           </CLientOnly>
           <div
             id="GoToCheckOut"
             className="md:w-[33%] md:absolute md:top-0 md:right-0 m-2"
           >
             <CLientOnly>
               <div className="bg-white p-4 border">
                 <button
                   onClick={() => goToCheckout()}
                   className="
                           flex
                           items-center
                           bg-blue-600
                           w-full
                           justify-center
                           text-white
                           font-semibold
                           p-3
                           rounded-full
                           mt-4

                           "
                 >
                   Go to checkout
                 </button>

                 <div
                   className="
                           flex
                           items-center
                           justify-between
                           mt-4 
                           text-sm
                           mb-1
                           "
                 >
                   <div>Items ({cart.getCart().length})</div>
                   <div>$ {(cart.cartTotal() / 100).toFixed(2)}</div>
                 </div>

                 <div
                   className="
                           flex
                           items-center
                           justify-between
                           mb-4 
                           text-sm

                           "
                 >
                   <div>Shipping</div>
                   <div>Free</div>
                 </div>

                 <div className="border-b dorder-gray-300" />

                 <div className="flex items-center justify-between mt-4 text-lg font-semibold">
                   <div>Subtotal</div>
                   <div>${(cart.cartTotal() / 100).toFixed(2)}</div>
                 </div>
               </div>
             </CLientOnly>
           </div>
         </div>
       </div>
       <SimilarProducts />
     </MainLayout>
   );
}
 
export default Cart;