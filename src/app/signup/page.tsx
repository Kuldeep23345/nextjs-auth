"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup sucess", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup faild", error);
      toast.error(error?.response?.data?.message || "Signup faild");
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="bg-white placeholder:text-black pl-2 mt-2 text-black"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        type="text"
        placeholder="username"
      />
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
        onClick={onSignup}
        className="mt-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No signup" : "signup"}
      </button>
      <Link href={'/login'}>already have an account</Link>
    </div>
  );
};

export default Signup;
