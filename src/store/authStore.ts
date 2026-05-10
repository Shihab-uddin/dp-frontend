import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  permissions: string[];
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setPermissions: (permissions: string[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  permissions: [],
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setPermissions: (permissions) => set({ permissions }),
  logout: () => set({ user: null, permissions: [], isAuthenticated: false }),
}));
