"use client";

import Container from "@/app/components/Container";
import BaseURL from "@/app/constants/BaseURL";
import { deleteToken } from "@/redux/UserSlice";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const userData = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${BaseURL}/user/${userData.userInfo.id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      dispatch(deleteToken());
      router.push("/");
    } catch (error) {
      toast.error("Error while deleting user account");
    }
  };

  const handleLogout = async () => {
    dispatch(deleteToken());
  };

  useEffect(() => {
    if (!userData || !userData.token) return redirect("/");
  }, [userData]);

  return (
    userData.token && (
      <Container className="min-h-screen py-20 flex flex-col items-center gap-10">
        <span className="border border-gray-400 rounded-full h-fit p-5 flex items-center gap-3">
          <FaRegUser size={40} />
          <p className="text-center text-lg font-semibold">Profile</p>
        </span>

        <div className="flex w-4/5 md:w-1/3 flex-col gap-7">
          <div className="flex items-center justify-between w-full text-lg font-semibold">
            <p>Name:</p>

            <div className="flex items-center gap-3">
              <p>{userData.userInfo.name}</p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full text-lg font-semibold">
            <p>Email:</p>

            <div className="flex items-center gap-3">
              <p>{userData.userInfo.email}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white w-4/5 md:w-1/3 py-3 rounded-md hover:bg-gray-600 mt-5"
        >
          Logout
        </button>

        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white w-4/5 md:w-1/3 py-3 rounded-md hover:bg-red-700"
        >
          Delete Account
        </button>
      </Container>
    )
  );
};

export default ProfilePage;