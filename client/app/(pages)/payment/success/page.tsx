import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SuccessPaymentPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="bg-green-300 p-5 rounded-full">
          <div className="bg-green-400 p-5 rounded-full z-20">
            <IoMdCheckmarkCircleOutline size={50} className="text-white" />
          </div>
        </div>
        <p className="text-2xl font-semibold">Successfull Payment</p>
        <p className="text-2xl font-semibold">Thanks for choosing Us</p>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
