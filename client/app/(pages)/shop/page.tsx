"use client";

import Container from "@/app/components/Container";
import ProductCard from "@/app/components/ProductCard";
import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { VscInbox } from "react-icons/vsc";
import { useSelector } from "react-redux";
import LoadingPage from "../loading";

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

const Shop = () => {
  const userData = useSelector((state: any) => state.user);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [productList, setProductList] = useState<ResponseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getProducts = async (page?: number) => {
    try {
      const res = await axios.get(`${BaseURL}/watches`, {
        params: { page },
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
    getProducts(page);
  }, [page]);

  return (
    <Container className="py-10 min-h-screen">
      <p className="text-2xl font-semibold mb-1">All availble products:</p>
      <hr className="mb-5 border-black/30 dark:border-white/30 w-1/5" />

      {/* List All Products */}
      {!loading && !productList ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <VscInbox size={35} />
          <p className="text-3xl font-semibold">No Products Found</p>
        </div>
      ) : !loading && productList ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {productList?.content.map((item: any, idx) => (
              <ProductCard key={idx} item={item} priority showAddToCart />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="mt-10 flex items-center justify-center gap-10 opacity-80">
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
              <GoArrowLeft className="text-3xl cursor-pointer hover:text-yellow-500" />
            </button>

            <span className="text-xl">
              {page + 1} / {productList?.totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === productList.totalPages - 1}
            >
              <GoArrowRight className="text-3xl cursor-pointer hover:text-yellow-500" />
            </button>
          </div>
        </>
      ) : (
        <LoadingPage />
      )}
    </Container>
  );
};

export default Shop;
