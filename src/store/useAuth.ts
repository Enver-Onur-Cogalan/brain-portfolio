import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    loginAttempts: number;
    lastAttempt: number | null;
    login: (password: string) => boolean;
    logout: () => void;
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
    console.error('⚠️ VITE_ADMIN_PASSWORD is not defined in .env file!');
}

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            loginAttempts: 0,
            lastAttempt: null,

            login: (password: string) => {
                const state = get();
                const now = Date.now();

                // Rate limit
                if (state.loginAttempts >= 5 && state.lastAttempt) {
                    const timeDiff = now - state.lastAttempt;
                    const fiveMinutes = 5 * 60 * 1000;

                    if (timeDiff < fiveMinutes) {
                        const remainingTime = Math.ceil((fiveMinutes - timeDiff) / 1000 / 60);
                        console.error(`Too many attempts. Try again in ${remainingTime} minutes.`);
                        return false;
                    } else {
                        set({ loginAttempts: 0 });
                    }
                }
                if (password === ADMIN_PASSWORD) {
                    set({
                        isAuthenticated: true,
                        loginAttempts: 0,
                        lastAttempt: null,
                    });
                    return true;
                }

                set({
                    loginAttempts: state.loginAttempts + 1,
                    lastAttempt: now
                });
                return false;
            },

            logout: () => set({ isAuthenticated: false })
        }),
        {
            name: 'admin-auth',
        }
    )
);