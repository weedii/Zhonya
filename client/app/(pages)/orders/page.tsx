"use client";

import LoadingPage from "@/app/(admin)/loading";
import FormattedPrice from "@/app/components/common/FormattedPrice";
import Container from "@/app/components/Container";
import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { VscInbox } from "react-icons/vsc";
import { useSelector } from "react-redux";

interface OrderItemProps {
  id: number;
  watch_reference: number;
  brand: string;
  model: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface OrderProps {
  id: string;
  items: OrderItemProps[];
  creatDate: string;
  amount: number;
}

const OrdersPage = () => {
  const userData = useSelector((state: any) => state.user);
  const [orders, setOrders] = useState<OrderProps[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openedOrderId, setOpenedOrderId] = useState<string | null>(null);

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get(`${BaseURL}/orders`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error while getting orders");
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    if (openedOrderId === orderId) setOpenedOrderId(null);
    else setOpenedOrderId(orderId);
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <Container className="min-h-screen py-10">
      {!loading && orders.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <VscInbox size={35} />
          <p className="text-3xl font-semibold">No Orders Found</p>
        </div>
      ) : !loading && orders.length > 0 ? (
        <div>
          <p className="text-2xl font-semibold mb-1">My Orders</p>
          <hr className="mb-5 border-black/30 dark:border-white/30 w-1/5" />

          <div className="flex flex-col gap-3">
            {orders.map((order, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col items-center justify-between"
              >
                <div className="w-full bg-whiteSmoke dark:bg-gray-600/20 p-3 rounded-md flex items-center justify-between">
                  <p
                    className={`text-sm md:text-base font-semibold flex items-center
                      ${openedOrderId === order.id && "text-yellow-500"}`}
                  >
                    <span
                      className="mr-1 cursor-pointer"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      {openedOrderId === order.id ? (
                        <MdOutlineKeyboardArrowDown size={25} />
                      ) : (
                        <MdOutlineKeyboardArrowRight size={25} />
                      )}
                    </span>
                    Order ID : {order.id}
                  </p>

                  <FormattedPrice
                    amount={order.amount}
                    className={
                      openedOrderId === order.id ? "text-yellow-500" : undefined
                    }
                  />
                </div>

                {openedOrderId === order.id && (
                  <div className=" mt-2 w-full bg-whiteSmoke dark:bg-gray-600/20 p-3 rounded-md flex flex-col gap-5">
                    <p className="font-semibold">Order Items</p>
                    {order.items.map((opOrder, idxx) => (
                      <div className="flex ml-3" key={idxx}>
                        <Image
                          src={opOrder.pictureUrl}
                          alt={opOrder.brand}
                          width={100}
                          height={100}
                        />
                        <div className="ml-3">
                          <p>Watch: {opOrder.brand + " " + opOrder.model}</p>
                          <p>
                            Price: <FormattedPrice amount={opOrder.price} />
                          </p>
                          <p>Quantity: {opOrder.quantity}</p>
                          <p>
                            Total:{" "}
                            <FormattedPrice amount={opOrder.totalPrice} />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div></div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </Container>
  );
};

export default OrdersPage;
