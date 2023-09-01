"use client";

import Link from "next/link";
import { CiDeliveryTruck } from "react-icons/ci";
import MainLayout from "../layouts/MainLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useIsLOading from "../hooks/useIsLoading";
import moment from "moment/moment";
import { useUser } from '../context/UserContext';

const OrdersPage = () => {
  const { user } = useUser();
  const [orders, setorders] = useState([]);

  const getOrders = async () => {
    try {
      useIsLOading(true);
      if (!user && !user?.id) return;
      const response = await fetch("/api/orders");
      const res = await response.json();
      setorders(res);
    } catch (err) {
      toast.error("Something wrong :(", { autoClose: 1500 });
    } finally {
      useIsLOading(false);
    }
  };

  // console.log(orders)

  useEffect(() => {
    useIsLOading(true);
    getOrders();
  }, [user]);

  return (
    <MainLayout>
      <div
        id="OrdersPage"
        className="
      xl:max-w-[1200px]
      mt-4
      mx-auto
      px-2
      min-h-[50vh]
      "
      >
        <div className="bg-white w-full p-6 min-h-[150px]">
          <div className="flex items-center text-xl">
            <CiDeliveryTruck size={35} className="text-teal-500 animate-bounce" />
            <span className="pl-4">Orders</span>
          </div>

          {orders.length < 1 ? (
            <div className="flex items-center justify-center">
              You have no order history
            </div>
          ) : null}


          {orders.map(order => (
            <div key={order.id} className="text-sm pl-[50px]">
              <div className="border-b py-1">
                <div className="pt-2">
                  <span className="font-bold mr-2">Stripe ID:</span>
                  {order?.stripe_id}
                </div>

                <div className="pt-2">
                  <span className="font-bold mr-2">Delivery adress:</span>
                  {order?.name} , {order?.adress} , {order?.zipcode} ,{" "}
                  {order?.city} , {order?.country}
                </div>

                <div className="pt-2">
                  <span className="font-bold mr-2">Total:</span>
                  {order?.total / 100} $
                </div>

                <div className="pt-2">
                  <span className="font-bold mr-2">Created:</span>
                  {moment(order?.created_at).calendar()}
                </div>

                <div className="pt-2">
                  <span className="font-bold mr-2">Delivery Time:</span>
                  {moment(order?.created_at).add(3, "days").calendar()}
                </div>

                <div className="fle items-center gap-4">
                  {order?.orderItem.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <Link
                        className="py-1 hover:underline text-blue-500 font-bold"
                        href={`/product/${item.product_id}`}
                      >
                        <Image
                          className="rounded"
                          width={120}
                          height={120}
                          src={item.product.imageUrl}
                          alt={item?.title}
                        />
                        {item.product.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
