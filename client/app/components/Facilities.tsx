import React from "react";
import { FaWallet } from "react-icons/fa6";
import { GoRocket } from "react-icons/go";
import { PiChats } from "react-icons/pi";

const Facilities = () => {
  const facilitiesData = [
    {
      title: "Free Delivery",
      subTitle: "When ordering above $500",
      icon: <GoRocket />,
    },
    {
      title: "Secure Payment",
      subTitle: "100% secure payment",
      icon: <FaWallet />,
    },
    {
      title: "24/7 Support",
      subTitle: "Dedicated support",
      icon: <PiChats />,
    },
  ];

  return (
    <div className="py-10 flex flex-col md:flex-row items-center justify-center md:justify-around gap-7">
      {facilitiesData.map((data, idx) => (
        <div key={idx} className="flex flex-col md:flex-row items-center gap-3">
          <span className="text-3xl text-yellow-500">{data.icon}</span>
          <div className="text-center md:text-left">
            <p className="uppercase font-bold">{data.title}</p>
            <p className="text-sm opacity-70">{data.subTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Facilities;
