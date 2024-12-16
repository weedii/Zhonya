"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  const { theme } = useTheme();

  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            minWidth: "23rem",
            backgroundColor: theme === "dark" ? "#282828" : "white",
            color: theme === "dark" ? "white" : "black",
          },
        }}
      />
    </div>
  );
};

export default CustomToaster;
