"use client";

import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { navBarList } from "../constants";
import { IoMdClose } from "react-icons/io";
import Logo from "./common/Logo";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

const MobileMenu = ({
  userExists,
  className,
}: {
  userExists: boolean;
  className?: string;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={className}>
      <div
        className="inline-flex md:hidden cursor-pointer"
        onClick={toggleShowMenu}
      >
        <HiMenuAlt2 size={23} />
      </div>

      <div
        className={`bg-white w-[20rem] dark:bg-bgDark min-h-screen absolute top-0 bottom-0 right-0 z-20 border-l-2 shadow-md transition-transform duration-300
            ${showMenu ? "-translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-20 flex items-center justify-between px-3 border-b-2 border-black/10">
          <Logo />
          <IoMdClose
            className="border rounded-md cursor-pointer"
            size={25}
            onClick={toggleShowMenu}
          />
        </div>

        <div className="flex flex-col">
          {navBarList.map((item, idx) => (
            <Link
              href={item.link}
              key={idx}
              className="px-3 pt-5 pb-1 border-b-2 border-black/10 dark:border-white/10"
              onClick={toggleShowMenu}
            >
              {item.title}
            </Link>
          ))}

          {userExists ? (
            <Link
              href={"/profile"}
              className="px-3 pt-5 pb-1 border-b-2 border-black/10 dark:border-white/10"
              onClick={toggleShowMenu}
            >
              Profile
            </Link>
          ) : (
            <Link
              href={"/signin"}
              className="px-3 pt-5 pb-1 border-b-2 border-black/10 dark:border-white/10"
              onClick={toggleShowMenu}
            >
              Sign in
            </Link>
          )}

          {userExists && (
            <Link
              href={"/orders"}
              className="px-3 pt-5 pb-1 border-b-2 border-black/10 dark:border-white/10"
              onClick={toggleShowMenu}
            >
              Orders
            </Link>
          )}

          <span className="px-3 pt-5 pb-1 border-b-2 border-black/10 dark:border-white/10 flex items-center justify-between">
            {mounted && resolvedTheme === "light" ? (
              <p>Dark Mode</p>
            ) : (
              <p>Light Mode</p>
            )}
            <ThemeSwitch />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
