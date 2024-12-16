import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ href }: { href?: string }) => {
  return (
    <Link
      href={href ? href : "/"}
      prefetch
      className="flex items-center cursor-pointer hover:opacity-85"
    >
      <Image src="/logo.png" width={56} height={56} alt="Logo" priority />
      <p className="font-semibold dark:text-white uppercase">Zhonya</p>
    </Link>
  );
};

export default Logo;
