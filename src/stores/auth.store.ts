import { AuthData } from '@/types/auth';
import { create } from 'zustand';


interface AuthState {
    user: AuthData | null;
    isHydrated: boolean;
    setUser: (user: AuthData) => void;
    setHydrated: (isHydrated: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>(
    (set) => ({
        user: null,
        isHydrated: false,
        setUser: (user) => set({ user }),
        setHydrated: (isHydrated) => set({ isHydrated }),
        logout: () => set({ user: null }),
    })
);