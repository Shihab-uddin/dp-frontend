"use client";

import React from "react";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const { user, permissions } = useAuthStore();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-500">
          Welcome back! Here is a summary of your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Your Role ID</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{user?.role || "Agent"}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Granted Atoms</h3>
          <p className="mt-2 text-3xl font-bold text-brand-primary">{permissions.length}</p>
        </div>
        <div className="rounded-2xl bg-brand-primary p-6 shadow-sm text-white">
          <h3 className="text-sm font-medium opacity-80">Security Status</h3>
          <p className="mt-2 text-xl font-bold">Active & Protected</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Your Active Permissions</h2>
        <div className="flex flex-wrap gap-2">
          {permissions.length === 0 ? (
            <span className="text-sm text-gray-500">No specific permissions granted yet.</span>
          ) : (
            permissions.map(atom => (
              <span key={atom} className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-brand-dark border border-orange-200">
                {atom}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
