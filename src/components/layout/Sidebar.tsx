"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  Target, 
  CheckSquare, 
  BarChart,
  LogOut 
} from "lucide-react";
import clsx from "clsx";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, permission: null },
  { name: "Leads", href: "/dashboard/leads", icon: Target, permission: "leads.read" },
  { name: "Opportunities", href: "/dashboard/opportunities", icon: BarChart, permission: "opportunities.read" },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare, permission: "tasks.read" },
  { name: "User Management", href: "/dashboard/users", icon: Users, permission: "users.read" },
  { name: "Permissions", href: "/dashboard/permissions", icon: ShieldAlert, permission: "permissions.assign" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, permissions, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error("Logout failed", e);
    }
    localStorage.removeItem("token");
    logout();
    router.push("/login");
  };

  // Filter menu items based on permissions
  const allowedItems = MENU_ITEMS.filter(
    (item) => !item.permission || permissions.includes(item.permission)
  );

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-100 bg-[#FFF6F0] px-4 py-6">
      {/* Workspace Selector Mock */}
      <div className="mb-8 rounded-xl bg-white p-3 shadow-sm border border-orange-100">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500 text-sm font-bold text-white">
            {user?.email?.[0]?.toUpperCase() || "W"}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">John&apos;s workspace</div>
            <div className="text-xs text-gray-400">#WID12446875</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        <div className="mb-4 mt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Main Menu
        </div>
        {allowedItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-orange-100/50 text-brand-dark"
                  : "text-gray-600 hover:bg-orange-50 hover:text-brand-primary"
              )}
            >
              <Icon
                className={clsx(
                  "h-5 w-5 flex-shrink-0 transition-colors",
                  isActive ? "text-brand-dark" : "text-gray-400 group-hover:text-brand-primary"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="mt-auto border-t border-orange-100 pt-4">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-red-500" />
          Logout
        </button>
      </div>
    </div>
  );
}
