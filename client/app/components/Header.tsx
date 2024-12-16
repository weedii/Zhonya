"use client";

import Link from "next/link";
import { navBarList } from "../constants";
import Container from "./Container";
import Logo from "./common/Logo";
import ThemeSwitch from "./ThemeSwitch";
import { FaRegUser } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const cartData = useSelector((state: any) => state?.cart);
  const userData = useSelector((state: any) => state?.user);
  const [userExists, setUserExists] = useState<boolean>(false);

  useEffect(() => {
    if (userData.token !== null) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
  }, [userData]);

  return (
    <header className="w-full h-20 bg-white dark:bg-[#121212] border-b-[1px] border-b-lightText/50 z-50 sticky top-0 shadow-sm">
      <Container className="h-full flex items-center justify-between gap-5 lg:gap-10">
        <Logo />

        {/* <SearchInput /> */}

        {/* nav links large devices*/}
        <div className="hidden md:inline-flex items-center gap-3 lg:gap-10">
          {navBarList?.map((item, idx) => {
            if (item.title === "Cart")
              return (
                <Link
                  href={item?.link}
                  key={idx}
                  prefetch={false}
                  className="relative group text-md font-semibold hover:opacity-75"
                >
                  {item.title}
                  <span className="absolute -top-2 -right-2 bg-red-700 text-xs rounded-full px-1 text-white">
                    {cartData.totalQuantity}
                  </span>
                </Link>
              );

            return (
              <Link
                href={item?.link}
                key={idx}
                prefetch={false}
                className="relative group overflow-hidden text-md font-semibold hover:opacity-75"
              >
                {item?.title}
                {/* <span className="absolute left-0 bottom-0 w-full h-px bg-yellow-600 -translate-x-[105%] group-hover:translate-x-0 transition-all duration-300" /> */}
              </Link>
            );
          })}

          {userExists ? (
            <Link
              href={"/profile"}
              className="relative group overflow-hidden text-md flex items-center gap-2 font-semibold hover:opacity-75"
            >
              <FaRegUser className="hidden lg:block" />
              Profile
            </Link>
          ) : (
            <Link
              href={"/signin"}
              className="relative group overflow-hidden text-md flex items-center gap-2 font-semibold hover:opacity-75"
            >
              <FaRegUser className="hidden lg:block" />
              Sign in
            </Link>
          )}

          {userExists && (
            <Link
              href={"/orders"}
              className="relative group overflow-hidden text-md font-semibold hover:opacity-75"
            >
              Orders
            </Link>
          )}

          <div className="mt-0.5">
            <ThemeSwitch />
          </div>
        </div>

        {/* nav links small devices*/}
        <MobileMenu userExists={userExists} className="md:hidden" />
      </Container>
    </header>
  );
};

export default Header;
