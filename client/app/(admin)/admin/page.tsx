"use client";

import UsersTable from "@/app/components/adminComponents/UsersTable";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingPage from "../loading";
import BaseURL from "@/app/constants/BaseURL";
import axios from "axios";
import { VscInbox } from "react-icons/vsc";
import toast from "react-hot-toast";
import AdminContainer from "@/app/components/adminComponents/AdminContainer";

interface userDataProps {
  email: string;
  id: number;
  name: string;
  role: string;
}

const UsersPage = () => {
  const userData = useSelector((state: any) => state.user.userInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<userDataProps[]>([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BaseURL}/admin/users`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error("Error while getting users");
    }
  };

  useEffect(() => {
    if (!userData) return redirect("/signin");
    // check user role
    if (userData && userData.role !== "ADMIN") return redirect("/");
  }, [userData]);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <AdminContainer>
      <p className="text-2xl font-semibold mb-10">All Users</p>
      {loading ? (
        <LoadingPage />
      ) : !loading && users.length === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center flex-col">
          <VscInbox size={30} />
          <p className="text-3xl font-semibold">No users found</p>
        </div>
      ) : (
        <UsersTable userData={users} />
      )}
    </AdminContainer>
  );
};

export default UsersPage;
