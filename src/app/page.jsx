"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getDetailUser = async () => {
      try {
        const response = await axios.get("/api/me");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    getDetailUser();
  }, []);

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h6 className="font-bold text-lg mb-2">
          Welcome, <span className="text-blue-500">{loading ? "User" : data.name}</span>
        </h6>

        <div className="flex gap-3 items-center text-gray-600 mb-3 text-sm">
          <Image priority={1} src={"/user-icon.jpg"} width={70} height={70} alt="image.jpg" className="cursor-pointer rounded-full" />
          <div>
            {loading ? (
              <p>Loading konten...</p>
            ) : (
              <>
                <p>{data.email}</p>
                <p>{data.address}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onLogout} disabled={loading} className={`px-4 py-2 text-white bg-blue-500 ${loading ? "opacity-80" : "hover:bg-blue-600"} text-xs transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded`}>
            Logout
          </button>
          <div className="flex flex-col gap-1 w-full">
            <div className="h-1 rounded bg-[#fde5a7] border"></div>
            <div className="h-1 rounded bg-[#fde5a7] border"></div>
            <div className="h-1 rounded bg-[#fde5a7] border"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
