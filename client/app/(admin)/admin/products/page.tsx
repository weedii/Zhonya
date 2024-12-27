"use client";

import LoadingPage from "@/app/(pages)/loading";
import AdminContainer from "@/app/components/adminComponents/AdminContainer";
import Brands from "@/app/components/adminComponents/Brands";
import ProductCard from "@/app/components/ProductCard";
import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { VscInbox } from "react-icons/vsc";
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

const ProductsPage = () => {
  const userData = useSelector((state: any) => state.user.userInfo);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [productList, setProductList] = useState<ResponseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getProducts = async (page?: number) => {
    try {
      const res = await axios.get(`${BaseURL}/watches`, {
        params: { page: page || 0 },
      });
      setProductList(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(page);
  }, [page]);

  useEffect(() => {
    if (!userData) return redirect("/signin");
    // check user role
    if (userData && userData.role !== "ADMIN") return redirect("/");
  }, [userData]);

  return (
    <AdminContainer>
      <Brands userData={userData} />

      <p className="text-2xl font-semibold mb-5">All Products</p>
      {/* add products */}
      <div className="">
        <Link
          href={"/admin/add-product"}
          className="bg-yellow-500 text-white font-semibold px-3 py-2 rounded-md"
        >
          Add new product
        </Link>
      </div>

      {/* List All Products */}
      {!loading && !productList ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <VscInbox size={35} />
          <p className="text-3xl font-semibold">No Products Found</p>
        </div>
      ) : !loading && productList ? (
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {productList?.content.map((item: any, idx) => (
              <ProductCard
                key={idx}
                item={item}
                priority
                adminProductPageUrl
              />
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
        </div>
      ) : (
        <LoadingPage />
      )}
    </AdminContainer>
  );
};

export default ProductsPage;
