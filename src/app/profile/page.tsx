'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


const profilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
        const res = await axios.get('/api/users/logout')
        toast.success("logout success")
        router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>profile page</h1>
    <hr />
    <h2>{data == "nothing" ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
    <hr />
    <button className="p-2 mt-2
     bg-blue-500 text-white" onClick={logout}>Logout</button>
    <button className="p-2 mt-2
     bg-green-500 text-white" onClick={getUserDetails}>get user details</button>
  </div>;
};

export default profilePage;
