
"use client";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      toast.success("✅ Login successful!");
      router.push("/");
    } else {
      toast.error("❌ Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col justify-center px-4 md:px-0 text-gray-800">
      <div className="flex flex-col items-center">
        <p>Logo</p>
        <h1 className="text-2xl font-semibold mt-4 mb-7">Log in to your account</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-[530px] mx-auto">
        {/* Email */}
        <div className="mb-5">
          <input type="email" {...register("email", { required: true })} placeholder="Enter your email" className="w-full px-3 py-3 rounded-md border" />
          {errors.email && <p className="text-red-600 text-sm">Email required</p>}
        </div>

        {/* Password */}
        <div className="mb-5">
          <input type="password" {...register("password", { required: true, minLength: 6 })} placeholder="Password" className="w-full px-3 py-3 rounded-md border" />
          {errors.password && <p className="text-red-600 text-sm">Password required</p>}
        </div>

        <button type="submit" className="w-full py-3 bg-amber-500 text-white rounded-md font-semibold">Login</button>

        {/* Social login */}
        <div className="mt-6 flex flex-col gap-2">
          <button onClick={() => signIn("google")} className="flex items-center justify-center gap-2 w-full bg-white border rounded-xl px-4 py-2">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>
          <button onClick={() => signIn("github")} className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white rounded-xl px-4 py-2">
            <FaGithub className="text-xl" /> Continue with GitHub
          </button>
            <p className="text-[18px] text-center mt-6">
           Don’t have an account
           <Link href="/register" className="text-amber-500 underline mx-3">
             Register
           </Link>
           Here
         </p>
        </div>
      </form>
    </div>
  );
}
