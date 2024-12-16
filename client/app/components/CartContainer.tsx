"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { VscInbox } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "@/redux/CartSlice";
import toast from "react-hot-toast";
import FormattedPrice from "./common/FormattedPrice";
import axios from "axios";
import BaseURL from "../constants/BaseURL";
import Loader from "./common/Loader";

const CartContainer = () => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const userData = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [disabledPayment, setDisabledPayment] = useState<boolean>();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClearCart = () => {
    const confirmed = window.confirm("Are you sure to clear your Cart?");
    if (confirmed) {
      dispatch(clearCart());
      toast.success("Cart has been cleared");
    }
  };

  const calculateTotalAmount = () => {
    var total = 0;
    cartItems.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
    return total;
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BaseURL}/orders`,
        { items: cartItems },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      setLoading(false);
      window.location.href = res.data.sessionUrl;
    } catch (error: any) {
      setLoading(false);
      if (error.status === 409) {
        toast.error(error.response.data.error);
      } else toast.error("Error while passing order");
    }
  };

  useEffect(() => {
    if (userData.token === null) {
      setDisabledPayment(true);
    }
  }, [userData]);

  useEffect(() => {
    calculateTotalAmount();
  }, [cartItems]);

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center flex-col gap-3">
          <VscInbox size={30} />
          <p className="text-3xl font-semibold">Your Cart is empty</p>
          <Link
            href={"/shop?page=0"}
            className=" hover:underline underline-offset-4 text-yellow-600 flex items-center text-lg"
          >
            Go to shop
            <MdArrowRight size={30} className="mt-1" />
          </Link>
        </div>
      ) : (
        <div className="pb-20 relative">
          {loading && (
            <div className="absolute bg-slate-500/30 min-h-full w-full z-20 flex items-center justify-center">
              <Loader />
            </div>
          )}
          <div className="w-full h-20 bg-whiteSmoke dark:bg-gray-600/10 hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold rounded-md">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>

          <div className="mt-5">
            {cartItems.map((item: any, idx: number) => (
              <CartItem key={idx} cart={cartItems} item={item} />
            ))}
          </div>

          <button
            onClick={handleClearCart}
            className="py-3 px-10 bg-red-500 text-white text-sm font-semibold uppercase mb-4 hover:bg-red-600 rounded-md"
          >
            Clear Cart
          </button>

          <div className="max-w-7xl flex justify-end md:ml-auto flex-col md:w-1/3 gap-5">
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-semibold text-right">Cart Totals</h1>

              <div>
                <p className="flex items-center justify-between border-[2px] dark:border-gray-600 border-b-0 py-1.5 px-4 text-lg font-medium">
                  Sub Total <FormattedPrice amount={totalAmount} />
                </p>
                <p className="flex items-center justify-between border-[2px] dark:border-gray-600 border-b-0 py-1.5 px-4 text-lg font-medium">
                  Shipping Charge <FormattedPrice amount={0} />
                </p>
                <p className="flex items-center justify-between border-[2px] dark:border-gray-600 py-1.5 px-4 text-lg font-medium">
                  Total <FormattedPrice amount={totalAmount} />
                </p>
              </div>
            </div>

            <div>
              <button
                disabled={disabledPayment}
                onClick={handleCheckout}
                className="bg-yellow-500 text-white w-full py-3 rounded-md hover:bg-yellow-600  font-semibold disabled:bg-yellow-500/50 disabled:cursor-not-allowed"
              >
                Proceed to chekout
              </button>

              {disabledPayment && (
                <p className="text-center text-red-700 mt-2 font-semibold">
                  Please sign-in to make checkout
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
