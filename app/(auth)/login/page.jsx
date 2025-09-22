"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const page = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
     console.log(data)
  };
  return (
    <div className="flex flex-col justify-center px-4 md:px-0 text-gray-800">
      <div className="flex flex-col items-center">
        <p>Logo</p>

        <h1 className="text-[26px] font-semibold mt-4 mb-7">
          Log in to your account
        </h1>
      </div>
      <form
        className="md:w-[530px]   mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        action=""
      >
        <fieldset className="fieldset text-[16px]">
          {/* Email Field */}
          <div className="mb-5">
            <div className="  flex items-center gap-3
  border border-gray-200 dark:border-gray-700
  rounded-xl
  bg-white dark:bg-gray-800
  focus-within:ring-2 focus-within:ring-amber-500
  transition duration-200 shadow-sm">
              <MdEmail size={27} className="text-gray-500 ml-4" />
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email here"
                className="w-full px-3 py-3 bg-gray-100 placeholder:text-center focus:outline-none rounded-md"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-red-600 mt-1 ml-2 text-sm">
                Email is required
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <div className="  flex items-center gap-3
  border border-gray-200 dark:border-gray-700
  rounded-xl
  bg-white dark:bg-gray-800
  focus-within:ring-2 focus-within:ring-amber-500
  transition duration-200 shadow-sm">
              <MdLock size={27} className="text-gray-500 ml-4" />
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Password"
                className="w-full px-3 py-3 bg-gray-100 placeholder:text-center focus:outline-none rounded-md"
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600 mt-1 ml-2 text-sm">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 mt-1 ml-2 text-sm">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          <div className="my-5 flex justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="agree" className="w-6 h-6" />
                <label className="agree md:text-[19px] text-[15px]">
                  Remember Me
                </label>
              </div>
            </div>
            <a className="link link-hover md:text-[18px] text-[15px] text-gray-700 ">
              Forgot password?
            </a>
          </div>
          <button className="py-3 bg-amber-500 hover:bg-amber-600 rounded-md text-white text-[18px] font-semibold">
            Login
          </button>
           
      <button onClick={()=> signIn("google")}
        className="flex items-center justify-center gap-2 w-full md:w-1/2 mx-auto bg-white text-gray-700 border border-gray-300 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition duration-200"
      >
        <FcGoogle className="text-xl" />
        <span>Continue with Google</span>
      </button>

      <button onClick={()=> signIn("github")}
        className="flex items-center justify-center gap-2 w-full md:w-1/2 mx-auto bg-gray-900 text-white rounded-xl px-4 py-2 shadow-sm hover:bg-gray-800 transition duration-200"
      >
        <FaGithub className="text-xl" />
        <span>Continue with GitHub</span>
      </button>
          
        </fieldset>

        <div className="mt-6 text-center"></div>
        <p className="text-[18px] text-center mt-6">
          Don’t have an account
          <Link href="/register" className="text-amber-500 underline mx-3">
            Register
          </Link>
          Here
        </p>

        
      </form>
    </div>
  );
};

export default page;
