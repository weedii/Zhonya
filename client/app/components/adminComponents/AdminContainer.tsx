import React from "react";
import { twMerge } from "tailwind-merge";

const AdminContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={twMerge("py-16 px-3", className)}>{children}</div>;
};

export default AdminContainer;
