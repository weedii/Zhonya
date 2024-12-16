"use client";

import { useEffect, useState } from "react";
import FormattedPrice from "@/app/components/common/FormattedPrice";
import Container from "@/app/components/Container";
import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { use } from "react"; // Import React.use() to unwrap the Promise
import LoadingPage from "@/app/(admin)/loading";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { CgClose } from "react-icons/cg";

interface ProductData {
  brand: string;
  model: string;
  description: string;
  price: number;
  quantity: number;
  pictureUrl: string;
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const ProductPage = ({ params }: Props) => {
  const resolvedParams = use(params); // Unwrap the params Promise
  const { slug } = resolvedParams;

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.user);
  const router = useRouter();
  const [updatePrice, setUpdatePrice] = useState<boolean>(false);
  const [updateQuantity, setUpdateQuantity] = useState<boolean>(false);
  const [updateDesc, setUpdateDesc] = useState<boolean>(false);
  const [updatedPrice, setUpdatedPrice] = useState<number>(0);
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(0);
  const [updatedDesc, setUpdatedDesc] = useState<string>("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseURL}/watches/${slug}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error while getting product");
    }
  };

  const deleteProduct = async () => {
    try {
      setLoading(true);
      await axios.delete(`${BaseURL}/admin/watches/${slug}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setLoading(false);
      router.push("/admin/products");
    } catch (error) {
      setLoading(false);
      toast.error("Error while delete watch");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${BaseURL}/admin/watches/${slug}`,
        {
          price: updatedPrice ? updatedPrice : null,
          quantity: updatedQuantity ? updatedQuantity : null,
          description: updatedDesc ? updatedDesc : null,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Error while updating watch");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (!userData) return redirect("/signin");
    if (!userData.token) return redirect("/signin");
    // check user role
    if (userData.token && userData.userInfo.role !== "ADMIN")
      return redirect("/");
  }, [userData]);

  if (product)
    return (
      <Container className="min-h-screen my-10">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 p-4 bg-whiteSmoke dark:bg-gray-600/10 rounded-lg">
            <div className="h-full xl:col-span-2">
              <Image
                src={product.pictureUrl}
                width={500}
                height={500}
                alt={product.brand}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
              <div className="flex flex-col gap-5">
                <p className="text-4xl font-semibold">{product.brand}</p>
                <p className="text-xl font-semibold">{product.model}</p>

                {updatePrice ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      placeholder={`${product.price}`}
                      className="border pl-3 py-1 rounded-md"
                      onChange={(e: any) => setUpdatedPrice(e.target.value)}
                    />

                    <button
                      onClick={() => {
                        setUpdatedPrice(0);
                        setUpdatePrice(false);
                      }}
                      className=" text-red-500 hover:text-red-600"
                    >
                      <CgClose size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <FormattedPrice
                      amount={product.price}
                      className="text-lg font-bold"
                    />

                    <button
                      onClick={() => {
                        setUpdateDesc(false);
                        setUpdateQuantity(false);
                        setUpdatePrice(true);
                      }}
                      className="hover:text-yellow-500"
                    >
                      <BiEdit size={20} />
                    </button>
                  </div>
                )}

                {updateQuantity ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      placeholder={`${product.quantity}`}
                      className="border pl-3 py-1 rounded-md"
                      onChange={(e: any) => setUpdatedQuantity(e.target.value)}
                    />

                    <button
                      onClick={() => {
                        setUpdatedQuantity(0);
                        setUpdateQuantity(false);
                      }}
                      className=" text-red-500 hover:text-red-600"
                    >
                      <CgClose size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <p className="text-lg font-bold">
                      Quantity {product.quantity}
                    </p>

                    <button
                      onClick={() => {
                        setUpdateDesc(false);
                        setUpdatePrice(false);
                        setUpdateQuantity(true);
                      }}
                      className="hover:text-yellow-500"
                    >
                      <BiEdit size={20} />
                    </button>
                  </div>
                )}
              </div>

              {updateDesc ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={`${product.description}`}
                    className="border pl-3 py-1 rounded-md w-full"
                    onChange={(e: any) => setUpdatedDesc(e.target.value)}
                  />

                  <button
                    onClick={() => {
                      setUpdatedDesc("");
                      setUpdateDesc(false);
                    }}
                    className=" text-red-500 hover:text-red-600"
                  >
                    <CgClose size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <p className="tracking-wide text-gray-600 dark:text-gray-400 mt-5">
                    {product.description}
                  </p>

                  <button
                    onClick={() => {
                      setUpdatePrice(false);
                      setUpdateDesc(true);
                    }}
                    className="hover:text-yellow-500"
                  >
                    <BiEdit size={20} />
                  </button>
                </div>
              )}

              {((updatePrice &&
                updatedPrice >= 0 &&
                updatedPrice !== product.price) ||
                (updateQuantity &&
                  updatedQuantity >= 0 &&
                  updatedQuantity !== product.quantity) ||
                (updateDesc &&
                  updatedDesc &&
                  updatedDesc !== product.description)) && (
                <button
                  onClick={handleUpdateProduct}
                  className="bg-yellow-500 text-white w-full py-2 hover:bg-yellow-600 rounded-md"
                >
                  Save Changes
                </button>
              )}

              <button
                onClick={deleteProduct}
                className="bg-red-500 text-white w-full py-2 hover:bg-red-600 rounded-md"
              >
                Delete this watch
              </button>
            </div>
          </div>
        )}
      </Container>
    );
};

export default ProductPage;
