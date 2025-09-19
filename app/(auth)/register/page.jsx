"use client";
import Link from "next/link";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
const page = () => {
      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col pt-24 mb-15 mx-4 md:mx-0 md:py-40 justify-center text-gray-800">
      <div className="flex flex-col items-center">
        {/* <Logo /> */}
        <p>Logo</p>
        <h1 className="text-2xl font-semibold mt-4 mb-7">Create an Account</h1>
      </div>

      <form
        className="md:w-[530px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className="text-[16px] space-y-5">
          {/* Name Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-[#00B795]">
            <IoPersonAddOutline size={27} className="text-gray-500 mr-2" />
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="text-red-600 ml-2 text-sm">Name is required</p>
          )}

          {/* Image Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-[#00B795]">
            <CiImageOn size={27} className="mr-2" />
            <input
              type="file"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
            //   onChange={handelImageUpload}
              placeholder="Your profile picture"
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-[#00B795]">
            <MdOutlineMail size={27} className="text-gray-500 mr-2" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email here"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
            />
          </div>
          {errors.email?.type === "required" && (
            <p className="text-red-600 ml-2 text-sm">Email is required</p>
          )}

          {/* Password Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-[#00B795]">
            <MdLockOutline size={27} className="text-gray-500 mr-2" />
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
            />
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-600 ml-2 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600 ml-2 text-sm">
              Password must be 6 characters or longer
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 rounded-md text-white text-[18px] font-semibold transition-colors duration-300"
          >
            Register
          </button>
        </fieldset>
        <div className="mt-6 text-center">
          {/* <GoogleLogin></GoogleLogin> */}
        </div>
        {/* Login Link */}
        <p className="text-[18px] text-center mt-6">
          Already have an account?
          <Link href="/login" className="text-amber-500 ml-2 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default page;
