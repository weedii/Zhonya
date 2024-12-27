"use client";

import AdminContainer from "@/app/components/adminComponents/AdminContainer";
import Loader from "@/app/components/common/Loader";
import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface formDataProps {
  brand: string;
  model: string;
  description: string;
  price: number;
  pictureUrl: string;
}

const AddProductPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataProps>({
    brand: "",
    model: "",
    description: "",
    price: 0,
    pictureUrl: "",
  });
  const [brands, setBrands] = useState<string[]>([]);
  const userData = useSelector((state: any) => state.user.userInfo);
  const router = useRouter();

  const handleChangeData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddNewProduct = async (e: any) => {
    e.preventDefault();

    if (
      !formData.brand ||
      formData.brand.includes("Select") ||
      !formData.model ||
      !formData.description ||
      !formData.price ||
      formData.price < 0 ||
      !formData.pictureUrl
    ) {
      toast.error("Missing Fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BaseURL}/admin/watches`,
        {
          brand: formData.brand,
          model: formData.model,
          description: formData.description,
          price: formData.price,
          pictureUrl: formData.pictureUrl,
        },
        { withCredentials: true }
      );
      setLoading(false);
      router.push("/admin/products");
    } catch (error) {
      setLoading(false);
      toast.error("Error while creating new watch");
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${BaseURL}/admin/brands`, {
        withCredentials: true,
      });
      setBrands(res.data);
    } catch (error) {
      toast.error("Error while getting brands");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (!userData) return redirect("/signin");
    // check user role
    if (userData && userData.role !== "ADMIN") return redirect("/");
  }, [userData]);

  return (
    <AdminContainer className="flex flex-col items-center relative">
      <p className="text-2xl font-semibold mb-10 w-full">Add New Product</p>

      {loading && (
        <Loader className="mt-16 absolute z-20 w-full md:w-3/4 h-3/4 flex items-center justify-center bg-whiteSmoke/50 rounded-md" />
      )}

      <form
        className="w-full  md:w-1/2 h-1/2 flex flex-col gap-7 px-3 md:px-0"
        onSubmit={handleAddNewProduct}
      >
        <div>
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Brand
          </label>
          <select
            id="brand"
            required
            className="border border-gray-300 text-sm rounded-lg focus:border-yellow-500 block w-full p-2.5"
            onChange={handleChangeData}
          >
            <option>Select...</option>
            {brands.length > 0 &&
              brands.map((item, idx) => (
                <option value={item} key={idx}>
                  {item}
                </option>
              ))}
          </select>
        </div>

        <div className="">
          <label
            htmlFor="model"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Model
          </label>
          <input
            type="text"
            id="model"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-transparent dark:text-white"
            placeholder="Model for the watch..."
            required
            onChange={handleChangeData}
          />
        </div>

        <div className="">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-transparent dark:text-white"
            placeholder="Description for the watch..."
            required
            onChange={handleChangeData}
          />
        </div>

        <div className="">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-transparent dark:text-white"
            placeholder="199"
            required
            onChange={handleChangeData}
          />
        </div>

        <div className="">
          <label
            htmlFor="pictureUrl"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Picture Url
          </label>
          <input
            type="text"
            id="pictureUrl"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-transparent dark:text-white"
            placeholder="Casio"
            required
            onChange={handleChangeData}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:ring-yellow-700"
        >
          Create
        </button>

        {/* {validationErrors.length > 0 && (
          <div>
            <p className="text-red-700 font-semibold text-sm">Errors:</p>
            {validationErrors.map((err, idx) => (
              <p key={idx} className="text-red-700 font-semibold text-xs">
                - {err}
              </p>
            ))}
          </div>
        )} */}
      </form>
    </AdminContainer>
  );
};

export default AddProductPage;
