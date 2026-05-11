/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        // We will fetch permissions in a layout or dashboard component
        router.push("/dashboard");
      }
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] font-sans relative overflow-hidden">
      {/* Absolute Logo Placement */}
      <div className="absolute left-8 top-8 md:left-12 md:top-10 z-10">
        <img src="/images/logo.png" alt="Obliq Logo" className="h-8" />
      </div>

      {/* Left side - Login Form */}
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2 lg:w-5/12 xl:w-[45%]">
        {/* Form Container */}
        <div className="w-full max-w-[440px] rounded-[2rem] bg-white p-10 shadow-[0_8px_40px_rgb(0,0,0,0.06)] sm:p-12">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-[26px] font-semibold text-gray-900">Login</h1>
            <p className="text-sm text-gray-500">Enter your details to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && <div className="text-sm text-red-500 text-center">{error}</div>}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition-colors hover:bg-gray-50 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition-colors hover:bg-gray-50 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="custom-checkbox h-4 w-4 appearance-none rounded border border-gray-300 bg-white transition-all checked:border-brand-primary checked:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 group-hover:border-gray-400 checked:group-hover:border-brand-dark checked:group-hover:bg-brand-dark" 
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="rounded-md px-2 py-1 -mr-2 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10 hover:text-brand-dark">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="group mt-6 flex w-full items-center justify-center rounded-xl border border-transparent bg-brand-primary px-4 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(253,109,63,0.35)] transition-all duration-300 hover:border-brand-primary hover:bg-white hover:text-brand-primary hover:shadow-none active:scale-[0.98]"
            >
              <span>Log in</span>
              <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover:ml-2 group-hover:max-w-[20px] group-hover:opacity-100">
                →
              </span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="#" className="rounded-md px-2 py-1 font-semibold text-gray-900 transition-colors hover:bg-gray-100 hover:text-brand-primary">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {/* Right side - Visual Area */}
      <div className="hidden md:block relative m-6 flex-1 overflow-hidden rounded-[2.5rem] bg-brand-primary shadow-sm">
        {/* Background Abstract Image */}
        <img
          src="/images/abstract.png"
          alt="Abstract Wavy Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dashboard Mockup Overlay Image */}
        <img
          src="/images/doc.png"
          alt="Dashboard Interface Overlay"
          className="absolute right-0 top-1/2 h-[88%] w-auto max-w-none -translate-y-1/2 translate-x-[15%] object-contain drop-shadow-2xl opacity-0 animate-slide-in-fade"
        />
      </div>
    </div>
  );
}
