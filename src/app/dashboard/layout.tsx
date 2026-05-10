"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { setUser, setPermissions, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndPermissions = async () => {
      try {
        // Fetch user from token or an endpoint. 
        // For now we'll decode the token or call a /me endpoint.
        // Wait, backend doesn't have a /me endpoint yet. Let's add one or just use the token payload.
        // Actually, our backend refresh token endpoint returns access token, but we need user details.
        // Let's create a quick way to get user permissions.
        
        // Let's assume the user ID is in the JWT payload. We can decode it using a simple utility.
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);
        const userId = payload.userId;

        // Fetch permissions
        const permRes = await api.get(`/permissions/${userId}`);
        setPermissions(permRes.data.permissions || []);
        
        // We set a dummy user for now since we didn't store it from login across reloads
        // In a real app, we'd have a /api/users/me endpoint
        setUser({ id: userId, email: "user@obliq.com", role: "Loaded" });
      } catch (err) {
        console.error("Failed to authenticate session", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPermissions();
  }, [setPermissions, setUser, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
