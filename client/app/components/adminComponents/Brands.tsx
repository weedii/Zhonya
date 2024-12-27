"use client";

import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";

const Brands = ({ userData }: { userData: any }) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [showNewBrand, setShowNewBrand] = useState<boolean>(false);
  const [newBrand, setNewBrand] = useState<string>("");

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${BaseURL}/admin/brands`, {
        withCredentials: true,
      });
      setBrands(res.data);
    } catch (error) {
      toast.error("Error while getting brands");
      console.log(error);
    }
  };

  const addBrands = async () => {
    try {
      await axios.post(
        `${BaseURL}/admin/brands`,
        { brand: newBrand },
        { withCredentials: true }
      );
      setNewBrand("");
      setShowNewBrand(false);
      fetchBrands();
    } catch (error) {
      toast.error("Error while saving new brand");
    }
  };

  const deleteBrands = async (brand: string) => {
    try {
      await axios.delete(`${BaseURL}/admin/brands`, {
        data: { brand: brand },
        withCredentials: true,
      });
      fetchBrands();
    } catch (error) {
      toast.error("Error while deleting brand");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="mb-10">
      <p className="text-2xl font-semibold mb-5">Brands</p>
      {brands.length > 0 ? (
        <div>
          <div className="ml-2 flex flex-wrap items-center gap-5">
            {brands.map((item, idx) => (
              <p
                key={idx}
                className="border border-gray-500 rounded-full py-2 px-3 relative"
              >
                {item}

                <span
                  className="absolute -top-1 -right-0.5 group cursor-pointer text-red-700"
                  onClick={() => deleteBrands(item)}
                >
                  <GrClose />
                  <span className="absolute top-3 -right-11 text-sm bg-red-700 p-1 rounded-r rounded-bl z-10 hidden group-hover:block group-hover:text-white">
                    Delete
                  </span>
                </span>
              </p>
            ))}

            {showNewBrand ? (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Brand..."
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="border border-gray-500 rounded-md pl-2 py-1"
                />
                <GrClose
                  onClick={() => {
                    setNewBrand("");
                    setShowNewBrand(false);
                  }}
                  className="text-sm cursor-pointer hover:text-red-700"
                />
                {newBrand && (
                  <button
                    onClick={addBrands}
                    className="bg-yellow-500 hover:bg-yellow-600 py-1 px-3 rounded-md text-white"
                  >
                    Save
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowNewBrand(true)}
                className="bg-whiteSmoke dark:bg-gray-600 p-2 rounded-md shadow-md"
              >
                Add new..
              </button>
            )}
          </div>
        </div>
      ) : showNewBrand ? (
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Brand..."
            onChange={(e) => setNewBrand(e.target.value)}
            className="border border-gray-500 rounded-md pl-2 py-1"
          />
          <GrClose
            onClick={() => {
              setNewBrand("");
              setShowNewBrand(false);
            }}
            className="text-sm cursor-pointer hover:text-red-700"
          />
          {newBrand && (
            <button
              onClick={addBrands}
              className="bg-yellow-500 hover:bg-yellow-600 py-1 px-3 rounded-md text-white"
            >
              Save
            </button>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShowNewBrand(true)}
            className="bg-whiteSmoke dark:bg-gray-600 p-2 rounded-md shadow-md"
          >
            Add new..
          </button>
        </div>
      )}
    </div>
  );
};

export default Brands;
