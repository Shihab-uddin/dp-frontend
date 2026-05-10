"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { Loader2, Plus, Ban, CheckCircle } from "lucide-react";

interface User {
  id: string;
  email: string;
  isActive: boolean;
  role: { name: string };
  manager?: { email: string };
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users. You might lack permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleSuspend = async (userId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/users/${userId}/suspend`, { isActive: !currentStatus });
      fetchUsers(); // refresh list
    } catch (err) {
      alert("Failed to update user status. Check your permissions.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">Manage platform users and their status.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark">
          <Plus className="h-4 w-4" /> Add User
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-brand-primary" /></div>
      ) : error ? (
        <div className="rounded-xl bg-red-50 p-6 text-red-600 border border-red-100">{error}</div>
      ) : (
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">Email</th>
                <th className="px-6 py-4 font-medium text-gray-500">Role</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      {user.role.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.isActive ? (
                      <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                        <CheckCircle className="h-3.5 w-3.5" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
                        <Ban className="h-3.5 w-3.5" /> Suspended
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleSuspend(user.id, user.isActive)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        user.isActive 
                          ? "text-red-600 hover:bg-red-50" 
                          : "text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {user.isActive ? "Suspend" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
