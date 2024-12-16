"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after client-side mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait until mounted to render
  if (!mounted) return null;

  return resolvedTheme === "dark" ? (
    <FiSun
      onClick={() => setTheme("light")}
      className="text-yellow-500 p-1 cursor-pointer"
      size={30}
    />
  ) : (
    <FiMoon
      onClick={() => setTheme("dark")}
      className="text-yellow-600 p-1 cursor-pointer"
      size={30}
    />
  );
};

export default ThemeSwitch;
