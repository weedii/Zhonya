"use client";

import AdminContainer from "@/app/components/adminComponents/AdminContainer";
import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import { redirect } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useSelector } from "react-redux";
import LoadingPage from "../../loading";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import FormattedPrice from "@/app/components/common/FormattedPrice";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { VscInbox } from "react-icons/vsc";

interface orderItemProps {
  id: number;
  watch_reference: string;
  brand: string;
  model: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface ordersDataProps {
  id: string;
  amount: number;
  creatDate: string;
  items: orderItemProps[];
  userId: number;
  userEmail: string;
}

interface ResponseProps {
  content: ordersDataProps[];
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

const OrdersPages = () => {
  const userData = useSelector((state: any) => state.user);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [orders, setOrders] = useState<ResponseProps | null>();
  const [openedOrderId, setOpenedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BaseURL}/admin/orders`, {
        headers: { Authorization: `Bearer ${userData.token}` },
        params: { page: page },
      });
      if (res.data) {
        if (res.data.totalElements > 0) setOrders(res.data);
      } else setOrders(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      toast.error("Error while getting orders");
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    if (openedOrderId === orderId) setOpenedOrderId(null);
    else setOpenedOrderId(orderId);
  };

  const deleteOrderById = async () => {
    try {
      setLoading(true);
      await axios.delete(`${BaseURL}/admin/orders/${openedOrderId}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      setOpenedOrderId(null);
      await fetchOrders();
      toast.success("Order deleted successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Error while deleting the Order");
    }
  };

  const handleSearch = (searchText: string) => {
    if (!searchText) return;

    const filteredOrders = orders?.content.filter((order) => {
      return (
        order.id.includes(searchText) ||
        order.userId.toString().includes(searchText) ||
        order.userEmail.includes(searchText)
      );
    });

    setOrders((prevOrders: any) => {
      if (!filteredOrders) return prevOrders;
      return {
        ...prevOrders,
        content: filteredOrders,
      };
    });
  };

  useEffect(() => {
    if (!userData) return redirect("/signin");
    if (!userData.token) return redirect("/signin");
    // check user role
    if (userData.token && userData.userInfo.role !== "ADMIN")
      return redirect("/");
  }, [userData]);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  return (
    <AdminContainer>
      {!loading && !orders ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <VscInbox size={35} />
          <p className="text-3xl font-semibold">No Orders Found</p>
        </div>
      ) : !loading && orders ? (
        <div>
          <p className="text-2xl font-semibold mb-5">All Orders</p>

          <input
            type="text"
            autoFocus
            placeholder="Order ID User ID/Email..."
            className="w-full border border-gray-600 rounded-md mb-7 py-2 px-3"
            onChange={(e) => handleSearch(e.target.value)}
          />

          <div className="flex flex-col gap-3">
            {orders.content.map((order, idx) => (
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
                    <div>
                      <p className="font-semibold">User ID : {order.userId}</p>
                      <p className="font-semibold">
                        User Email : {order.userEmail}
                      </p>
                    </div>

                    <p className="font-semibold">Order Items</p>
                    {order.items.map((opOrder, idxx) => (
                      <div className="flex items-center ml-3" key={idxx}>
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

                    <button
                      className="bg-red-600 w-fit ml-auto p-3 rounded-md hover:bg-red-700"
                      onClick={deleteOrderById}
                    >
                      <FaTrash color="white" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-10 opacity-80">
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
              <GoArrowLeft className="text-3xl cursor-pointer hover:text-yellow-500" />
            </button>

            <span className="text-xl">
              {page + 1} / {orders.totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === orders.totalPages - 1}
            >
              <GoArrowRight className="text-3xl cursor-pointer hover:text-yellow-500" />
            </button>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </AdminContainer>
  );
};

export default OrdersPages;
