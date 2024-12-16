"use client";

import extractUserInfo from "@/app/lib/decodeJwt";
import { saveToken, saveUser } from "@/redux/UserSlice";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";

const RedirectClient = ({ token }: { token: string }) => {
  const dispatch = useDispatch();

  const signinUser = () => {
    // extract userInfo from the token then save them
    const userInfo = extractUserInfo(token);
    dispatch(saveToken(token));
    dispatch(saveUser(userInfo));
    return redirect("/");
  };

  return signinUser();
};

export default RedirectClient;
