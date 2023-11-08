"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Page() {
  const router = useRouter();

  const [errors, setErrors] = useState({ error: "" });
  const [loading, setLoading] = useState(false);

  // FORM FORMIK
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format.')
        .required('Required.'),
      password: Yup.string()
        .required('Required.')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const response = await axios.post('/api/users/login', values);

        if (response.status === 200) {
          router.push('/');
        }
      } catch (error) {
        setErrors({ ...errors, error: error.response.data.message });
        console.log(error.response.data.message);
      } finally {
        setLoading(false)
      }
    },
  })

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      if (response.status == 200) {
        router.query = null
        router.push("/");
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">Sign in to your account</h1>

            {errors.error && (
              <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 border border-red-300" role="alert">
                <div className="text-sm font-medium">{errors.error}</div>
              </div>
            )}
            {/* ALERT SUCCESS */}
            {(router.query && !errors.error) && (
              <div className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 border border-green-300" role="alert">
                <div className="text-sm font-medium">Register successfully. Please login.</div>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} method="post" className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                  Your email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                  placeholder="example@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {(formik.errors.email && formik.touched.email) && (
                  <p className="text-red-500 text-xs mt-1 ">{formik.errors.email}</p>
                )}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {(formik.errors.password && formik.touched.password) && (
                  <p className="text-red-500 text-xs mt-1 ">{formik.errors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input 
                      id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-gray-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                disabled={loading}
                type="submit"
                className={`w-full text-white bg-blue-500 ${loading ? "opacity-80" : "hover:bg-blue-600"} transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link href="/register" className="font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
