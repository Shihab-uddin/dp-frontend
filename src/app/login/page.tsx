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
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] font-sans">
      {/* Left side - Login Form */}
      <div className="flex w-full flex-col p-8 md:w-1/2 lg:w-5/12 xl:w-[45%]">
        {/* Logo Area */}
        <div className="mb-10">
          <img src="/images/logo.png" alt="Obliq Logo" className="h-10" />
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-semibold text-gray-900">Login</h1>
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
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-primary"
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
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-primary"
                    required
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-brand-primary hover:text-brand-dark">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-brand-primary px-4 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(253,109,63,0.4)] transition-all hover:bg-brand-dark hover:shadow-[0_8px_24px_rgba(253,94,43,0.5)] active:scale-[0.98]"
              >
                Log in
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="font-semibold text-gray-900 hover:text-brand-primary">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Visual Area */}
      <div className="hidden md:flex w-1/2 lg:w-7/12 xl:w-[55%] relative overflow-hidden rounded-3xl m-4 ml-0 bg-brand-primary">
        {/* Background Abstract Image */}
        <img
          src="/images/abstract.png"
          alt="Abstract Wavy Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dashboard Mockup Overlay Image */}
        <div className="absolute inset-0 flex items-center justify-end">
          <img
            src="/images/doc.png"
            alt="Dashboard Interface Overlay"
            className="w-[90%] max-w-3xl translate-x-4 object-contain shadow-2xl xl:w-[85%]"
          />
        </div>
      </div>
    </div>
  );
}
