"use client";

import Image from "next/image";
import CheckoutItem from "../components/Checkout/CheckoutItem";
import MainLayout from "../layouts/MainLayout";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/Cart";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useIsLOading from "../hooks/useIsLoading";
import useUserAddress from "../hooks/useUserAddress";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CLientOnly from "../components/ClientOnly/ClientOnly";

const Checkout = () => {
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();

  let stripe = useRef(null);
  let elements = useRef(null);
  let card = useRef(null);
  let clientSecret = useRef(null);

  const [addressDetails, setaddressDetails] = useState({});
  const [isLoadingAddress, setisLoadingAddress] = useState(false);

  useEffect(() => {
    if (cart.cartTotal() <= 0) {
      toast.info("Your cart is empty", {
        autoClose: 1500,
        position: "top-center",
      });
      return router.push("/");
    }
    useIsLOading(true);

    const getAddress = async () => {
      if (user?.id === null || user?.id === undefined) {
        useIsLOading(false);
        return;
      }
      try {
        setisLoadingAddress(true);
        const adressResponse = await useUserAddress();
        if (adressResponse) {
          setaddressDetails(adressResponse);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setisLoadingAddress(false);
      }
    };

    getAddress();
    setTimeout(() => stripeInit(), 300);
  }, [user]);

  const stripeInit = async () => {
    stripe.current = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PK_KEY || ""
    );
    const res = await fetch(`/api/stripe`, {
      method: "POST",
      body: JSON.stringify({ amount: cart.cartTotal() }),
    });

    const result = await res.json();

    clientSecret.current = result.client_secret;
    elements.current = stripe.current.elements();

    const styles = {
      base: { fontSize: "12px" },
      invalid: {
        fontfamily: "Arial, sans-serif",
        color: "#EE4B2B",
        iconColor: "#EE4B2B",
      },
    };

    card.current = elements.current.create("card", {
      hidePostalCode: true,
      style: styles,
    });

    card.current.mount("#card-element");

    card.current.on("change", function (e) {
      document.querySelector("#confirm-pay").disabled = e.empty;

      document.querySelector("#card-error").textContent = e.error
        ? e.error.message
        : "";
    });

    useIsLOading(false);
  };
  const pay = async (e) => {
    e.preventDefault();
    if (Object.entries(addressDetails).length === 0) {
      showError("Please add shipping address");
      return;
    }
    let result = await stripe.current.confirmCardPayment(clientSecret.current, {
      payment_method: { card: card.current },
    });

    if (result.error) {
      showError(result.error.message);
    } else {
      useIsLOading(true);

      try {
        let response = await fetch("/api/orders/create", {
          method: "POST",
          body: JSON.stringify({
            stripe_id: result.paymentIntent.id,
            name: addressDetails.name,
            address: addressDetails.address,
            zipcode: addressDetails.zipcode,
            city: addressDetails.city,
            country: addressDetails.country,
            products: cart.getCart(),
            total: cart.cartTotal(),
          }),
        });

        if (response.status === 201) {
          toast.success("Order Completed", { autoClose: 1500 });
          cart.clearCart();
          return router.push("/success");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something wrong", { autoClose: 2000 });
      } finally {
        useIsLOading(false);
      }
    }
  };

  const showError = (errMessage) => {
    let errmsg = document.querySelector("#card-error");
    toast.error(errMessage, { autoClose: 2000 });
    errmsg.textContent = errMessage;
    setTimeout(() => (errmsg.textContent = ""), 3000);
  };

  return (
    <MainLayout>
      <div
        className="
      mt-4 xl:max-w-[1100px]
      mx-auto
      max-xl:px-4
      "
      >
        <div className="text-2xl font-bold mt-4 mb-4">Checkout</div>
        <div
          className="
         relative
         md:flex
         items-baseline
         gap-4
         justify-between
         mx-auto
         w-full
         "
        >
          <div className="md:w-[65%] w-full">
            <div className="bg-slate-50 rounded-lg p-4 border">
              <div className="text-xl font-semibold mb-2">Shipping Adress</div>
              <div>
                {!isLoadingAddress ? (
                  <Link
                    href={"/address"}
                    className="text-sky-400 text-sm underline"
                  >
                    {addressDetails.name ? "Update adress" : "Add adress"}
                  </Link>
                ) : null}

                {!isLoadingAddress && addressDetails.name ? (
                  <ul className="text-sm mt-2 font-semibold text-slate-500">
                    <li>
                      Name:
                      <span className="text-black underline ml-2">
                        {addressDetails.name}
                      </span>
                    </li>
                    <li>
                      Address:{" "}
                      <span className="text-black underline ml-2">
                        {addressDetails.address}
                      </span>
                    </li>
                    <li>
                      Zip:{" "}
                      <span className="text-black underline ml-2">
                        {addressDetails.zipcode}
                      </span>
                    </li>
                    <li>
                      City:{" "}
                      <span className="text-black underline ml-2">
                        {addressDetails.city}
                      </span>
                    </li>
                    <li>
                      Country:{" "}
                      <span className="text-black underline ml-2">
                        {addressDetails.country}
                      </span>
                    </li>
                  </ul>
                ) : null}

                {isLoadingAddress ? (
                  <div className="flex items-center mt-1 gap-2">
                    <AiOutlineLoading3Quarters
                      size={20}
                      className="animate-spin"
                    />
                    Loading data...
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <CLientOnly>
              <div id="Items" className="bg-white rounded-lg mt-4">
                {cart.getCart().map((product) => (
                  <CheckoutItem key={product.id} product={product} />
                ))}
              </div>
            </CLientOnly>
          </div>

          <div
            id="PlaceOrder"
            className="relative md:-top-[6px] md:w-[35%] border rounded-lg"
          >
            <CLientOnly>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <div>Items ({cart.getCart().length})</div>
                  <div className="font-semibold">
                    {" "}
                    ${(cart.cartTotal() / 100).toFixed(2)}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4 text-sm">
                  <div>Shipping</div>
                  <div className="font-semibold">free</div>
                </div>

                <div className="border-t" />

                <div className="flex items-center justify-between my-4">
                  <div className="font-bold">Order total</div>
                  <div className="text-2xl font-bold">
                    ${(cart.cartTotal() / 100).toFixed(2)}
                  </div>
                </div>

                <form onSubmit={pay}>
                  <div
                    className="border  border-indigo-500 p-2 rounded-sm"
                    id="card-element"
                  />
                  <p
                    id="card-error"
                    role="alert"
                    className="text-red-500 text-center font-semibold relative top-2"
                  />
                  <button
                    id="confirm-pay"
                    type="submit"
                    className="mt-4 bg-blue-400 text-lg w-full text-white font-semibold p-3 rounded-full"
                  >
                    Confirm and pay
                  </button>
                </form>
              </div>
            </CLientOnly>

            <div className="flex items-center p-4 justify-center gap-2 border-t">
              <Image
                src="/images/logo.svg"
                alt="log"
                width={100}
                height={100}
                className="w-15 h-15"
              />
              <div className="font-light text-sm mb-2 mt-2 text-center">
                MONEY BACK GUARANTEE
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
