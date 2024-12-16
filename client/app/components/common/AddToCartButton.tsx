"use client";

import { addToCart } from "@/redux/CartSlice";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

interface ContentItem {
  brand: string;
  model: string;
  description: string;
  pictureUrl: string;
  price: number;
  reference: number;
}

interface AddToCartButtonProps {
  item: ContentItem;
  className?: string;
}

const AddToCartButton = ({ item, className }: AddToCartButtonProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item: ContentItem) => {
    dispatch(addToCart(item));
  };

  return (
    <button
      onClick={() => handleAddToCart(item)}
      className={twMerge(
        "bg-yellow-500 text-white w-full py-2 hover:bg-yellow-600",
        className
      )}
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
