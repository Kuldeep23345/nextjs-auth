"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login sucess", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("login faild", error);
      toast.error(error?.response?.data?.message || "login faild");
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="bg-white placeholder:text-black pl-2 mt-2 text-black"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="email"
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="bg-white placeholder:text-black pl-2 mt-2 text-black"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="mt-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No login" : "login"}
      </button>
      <Link href={'/signup'}>Don't have an account</Link>
    </div>
  );
};

export default Login;
