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
        <div className="flex items-center gap-2 mb-10">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary">
            {/* SVG approximation of the overlapping leaves logo */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
              <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Obliq</span>
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
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-brand-primary to-brand-dark px-4 py-3.5 text-sm font-medium text-white shadow-lg shadow-brand-primary/30 transition-all hover:opacity-90 active:scale-[0.98]"
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
      <div className="hidden md:flex w-1/2 lg:w-7/12 xl:w-[55%] relative overflow-hidden bg-brand-primary m-4 ml-0 rounded-3xl items-center justify-center">
        {/* If images were properly placed in /public, we'd use <img src="/images/background.webp" /> */}
        {/* Placeholder gradient mimicking the wavy background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF9A44] via-brand-primary to-brand-dark opacity-90"></div>
        
        {/* Decorative waves overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

        {/* Dashboard Mockup Overlay */}
        <div className="relative z-10 w-full max-w-lg translate-x-12 rounded-xl bg-white/90 p-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="h-8 w-8 rounded-md bg-blue-500"></div>
            <div className="flex-1">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
              <div className="mt-1 h-3 w-32 rounded bg-gray-100"></div>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded border border-gray-300"></div>
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                </div>
                <div className="h-5 w-16 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-500">Urgent</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
