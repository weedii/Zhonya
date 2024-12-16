"use client";

import { useEffect, useState } from "react";
import { VscInbox } from "react-icons/vsc";
import BaseURL from "../constants/BaseURL";
import axios from "axios";
import ProductCard from "./ProductCard";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import LoadingPage from "../(pages)/loading";
import { useSelector } from "react-redux";

interface Content {
  category: string;
  description: string;
  pictureUrl: string;
  price: number;
  reference: number;
}

interface ResponseProps {
  content: Content[];
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

const ProductList = () => {
  const userData = useSelector((state: any) => state.user);
  const [productList, setProductList] = useState<ResponseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${BaseURL}/watches`, {
        params: { page: 0 },
      });
      if (res.data.content.length === 0) setProductList(null);
      else setProductList(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="py-10">
      {/* List All Products */}
      {!loading && !productList ? null : !loading && productList ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {productList?.content.map((item: any, idx) => (
              <ProductCard key={idx} item={item} priority showAddToCart />
            ))}
          </div>
        </>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default ProductList;
