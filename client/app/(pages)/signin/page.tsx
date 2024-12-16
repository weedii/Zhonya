"use client";

import Loader from "@/app/components/common/Loader";
import Container from "@/app/components/Container";
import BaseURL from "@/app/constants/BaseURL";
import extractUserInfo from "@/app/lib/decodeJwt";
import { saveToken, saveUser } from "@/redux/UserSlice";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";

interface formDataProps {
  email: string;
  password: string;
}

const SigninPage = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleChangeData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    return emailPattern.test(email);
  };

  const handleSiginin = async (e: any) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error("Email is missing");
      return;
    }

    if (!formData.password) {
      toast.error("Password is missing");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Invalid Email");
      return;
    }

    // signin the user
    try {
      setValidationErrors([]);
      setLoading(true);
      const res = await axios.post(`${BaseURL}/auth/authenticate`, {
        email: formData.email,
        password: formData.password,
      });
      // extract userInfo from the token then save them
      const userInfo = extractUserInfo(res.data.token);
      dispatch(saveToken(res.data.token));
      dispatch(saveUser(userInfo));

      // wait until save user then navigate
      await Promise.resolve(2000);

      setLoading(false);

      // check user role
      if (userInfo?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.data.code === 404) {
          toast.error("User not found");
        } else if (error.response.data.code === 400) {
          setValidationErrors(error.response.data.validationErrors);
        } else {
          toast.error("Invalid Credentials");
        }
      }
      setLoading(false);
    }
  };

  const handleSigninWithGoogle = () => {
    window.location.href = `${BaseURL}/oauth2/authorization/google`;
  };

  // if user is connected redirect it
  useEffect(() => {
    if (userData.token !== null) return redirect("/");
  }, [userData]);

  return (
    <Container>
      <div className="min-h-screen h-full pb-20 flex flex-col justify-center items-center relative">
        {loading && (
          <Loader className="absolute z-20 w-3/4 h-3/4 flex items-center justify-center bg-whiteSmoke/50 rounded-md" />
        )}
        <form
          className="w-full  md:w-1/2 h-1/2 flex flex-col gap-7"
          onSubmit={handleSiginin}
        >
          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-transparent dark:text-white"
              placeholder="wael@example.com"
              required
              onChange={handleChangeData}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-transparent dark:text-white"
              placeholder="******"
              required
              onChange={handleChangeData}
            />
          </div>

          {validationErrors.length > 0 && (
            <div>
              <p className="text-red-700 font-semibold text-sm">Errors:</p>
              {validationErrors.map((err, idx) => (
                <p key={idx} className="text-red-700 font-semibold text-xs">
                  - {err}
                </p>
              ))}
            </div>
          )}

          <div className="flex items-start">
            <div className="flex items-center h-5" onClick={toggleShowPass}>
              <input
                id="showPass"
                type="checkbox"
                className="w-4 h-4 border rounded accent-whiteSmoke"
              />
            </div>
            <label
              htmlFor="showPass"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {showPass ? "Hide" : "Show"} password
            </label>
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:ring-yellow-700"
            >
              {loading ? "Loading..." : "Sign in"}
            </button>

            <div className="flex mt-5 gap-2 text-sm">
              <p>{"Don't have an account?"}</p>
              <Link href="/signup">
                <span className="text-orange-600 underline underline-offset-4 hover:opacity-80">
                  Create one
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="py-[0.1px] bg-black flex-1 dark:bg-whiteSmoke" />
            <p className="px-3 text-sm text-center">Or Sign in with</p>
            <div className="py-[0.1px] bg-black flex-1 dark:bg-whiteSmoke" />
          </div>
        </form>

        {/* todo sign in with google */}
        <button
          onClick={handleSigninWithGoogle}
          className="w-full md:w-1/2 bg-gray-600/20 dark:bg-gray-600/40 hover:bg-gray-600/40 dark:hover:bg-gray-600/60 mt-7 flex items-center justify-center gap-3 py-2 rounded-md font-semibold text-sm"
        >
          <FcGoogle size={27} />
          Signin with Google
        </button>
      </div>
    </Container>
  );
};

export default SigninPage;
