"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { Loader2, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

// Mock list of all system atoms (in a real app, you'd fetch this from the DB)
const SYSTEM_ATOMS = [
  "dashboard.read",
  "users.read",
  "users.create",
  "users.update",
  "permissions.read",
  "permissions.assign",
  "leads.read",
  "tasks.read",
  "opportunities.read",
];

interface User {
  id: string;
  email: string;
}

export default function PermissionsEditorPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPerms, setLoadingPerms] = useState(false);
  const [message, setMessage] = useState("");
  
  const currentUserPermissions = useAuthStore(state => state.permissions);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users for permission editor");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;
    const fetchPerms = async () => {
      setLoadingPerms(true);
      try {
        const res = await api.get(`/permissions/${selectedUserId}`);
        setUserPermissions(res.data.permissions || []);
      } catch (err) {
        console.error("Failed to fetch user permissions");
      } finally {
        setLoadingPerms(false);
      }
    };
    fetchPerms();
  }, [selectedUserId]);

  const handleTogglePermission = async (atom: string, currentGranted: boolean) => {
    // Optimistic UI update
    const newPerms = currentGranted 
      ? userPermissions.filter(p => p !== atom)
      : [...userPermissions, atom];
    
    setUserPermissions(newPerms);

    try {
      await api.post(`/permissions/${selectedUserId}/assign`, {
        permissionAtom: atom,
        isGranted: !currentGranted
      });
      setMessage(`Successfully ${!currentGranted ? 'granted' : 'revoked'} ${atom}`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      // Revert on failure
      setUserPermissions(currentGranted ? [...userPermissions, atom] : userPermissions.filter(p => p !== atom));
      setMessage(err.response?.data?.message || "Failed to update permission. Grant Ceiling reached?");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-brand-primary" />
          Permission Editor
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Dynamically assign or revoke specific permission atoms.
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-orange-100 text-brand-dark text-sm">
          {message}
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select User to Edit</label>
        {loadingUsers ? (
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        ) : (
          <select 
            className="w-full max-w-md rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Select a user --</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.email}</option>
            ))}
          </select>
        )}
      </div>

      {selectedUserId && (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Permission Atoms</h2>
          
          {loadingPerms ? (
            <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-brand-primary" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SYSTEM_ATOMS.map(atom => {
                const isGranted = userPermissions.includes(atom);
                const canGrant = currentUserPermissions.includes(atom); // Grant Ceiling check on UI
                
                return (
                  <div key={atom} className={`flex items-center justify-between p-4 rounded-xl border ${isGranted ? 'border-brand-primary bg-orange-50/30' : 'border-gray-100 bg-gray-50'}`}>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{atom}</div>
                      {!canGrant && <div className="text-xs text-red-400 mt-1">You don't own this permission</div>}
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isGranted}
                        disabled={!canGrant}
                        onChange={() => handleTogglePermission(atom, isGranted)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary disabled:opacity-50"></div>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
