"use client";

import React, { useEffect, useState } from "react";
import Logo from "../common/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signOut } from "@/redux/UserSlice";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useTheme } from "next-themes";
import ThemeSwitch from "../ThemeSwitch";
import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import toast from "react-hot-toast";

const SideBar = () => {
  const navLinks = [
    {
      title: "Users",
      link: "/admin",
    },
    {
      title: "Products",
      link: "/admin/products",
    },
    {
      title: "Orders",
      link: "/admin/orders",
    },
  ];

  const pathname = usePathname();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${BaseURL}/auth`, { withCredentials: true });
      dispatch(signOut());
      router.push("/");
    } catch (error) {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        onClick={toggleShowMenu}
        className={`md:hidden fixed top-5 left-3 text-yellow-500 z-30`}
      >
        {showMenu ? <CgClose size={25} /> : <BiMenu size={25} />}
      </button>

      <div
        className={`bg-whiteSmoke dark:bg-bgDark pt-16 pb-10 md:w-[18rem] min-h-screen h-full shadow-md shadow-black dark:shadow-whiteSmoke/40 overflow-hidden transition-all ease-out duration-100 z-20
          ${
            showMenu ? "w-[70%] fixed flex flex-col" : "w-0 fixed flex flex-col"
          }`}
      >
        <Logo href="/admin" />

        <div className="py-10 px-3 flex flex-col gap-5">
          {navLinks.map((item, idx) => {
            // Check if the current route matches the link
            const isActive = pathname === item.link;

            return (
              <Link
                href={item.link}
                key={idx}
                className={`pl-5 py-3 text-lg font-semibold rounded-md ${
                  isActive
                    ? "bg-yellow-500 text-white"
                    : "bg-transparent hover:bg-gray-600/30"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* logout */}
        <div className="flex flex-col px-3 gap-3 mt-auto">
          <span className="pl-5 py-3 text-lg font-semibold rounded-md hover:bg-gray-600/30 hover:text-white flex items-center justify-between text-start">
            {mounted && resolvedTheme === "light" ? (
              <p>Dark Mode</p>
            ) : (
              <p>Light Mode</p>
            )}
            <ThemeSwitch />
          </span>

          <button
            onClick={handleLogout}
            className="pl-5 py-3 text-lg font-semibold rounded-md hover:bg-red-300 hover:text-white text-start"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
