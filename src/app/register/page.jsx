"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    error: "",
  });
  const [loading, setLoading] = useState(false);

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", user);

      if (response.status == 200) {
        router.query = 'Register successfully. Please login.'
        router.push('/login')
      }
    } catch (error) {
      setErrors({ ...errors, error: error.response.data.message });
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="bg-gray-50 w-full h-screen flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-600">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Auth Next
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">Register new account</h1>

            {errors.error && <p className="text-sm text-red-500 text-center">{errors.error}</p>}

            <form onSubmit={onRegister} method="post" className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                  placeholder=""
                  required
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                  placeholder="example@gmail.com"
                  required
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-600">
                  Your address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                  placeholder=""
                  required
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                  required
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Agress terms & condition
                    </label>
                  </div>
                </div>
              </div>
              <button
                disabled={loading}
                className={`w-full text-white bg-blue-500 ${loading ? "opacity-80" : "hover:bg-blue-600"} transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                {loading ? "Loading..." : "Register"}
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="font-medium hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
