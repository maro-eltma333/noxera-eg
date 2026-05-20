import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "user" | "admin";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    joinedAt: string;
}

interface StoredUser extends User {
    password: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (email: string, password: string, isMaintenanceMode?: boolean) => { success: boolean; message: string; user?: User };
    register: (name: string, email: string, password: string) => { success: boolean; message: string };
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
    changePassword: (oldPwd: string, newPwd: string) => { success: boolean; message: string };
}

// Hardcoded demo users — seeded into localStorage only once
const SEED_USERS: StoredUser[] = [
    {
        id: "demo-1",
        name: "Maro",
        email: "maro@mail.com",
        password: "maro@mail.com",
        role: "user",
        joinedAt: "2026-01-15",
    },
    {
        id: "demo-2",
        name: "Maro Admin",
        email: "maro@admin.com",
        password: "maro@admin.com",
        role: "admin",
        joinedAt: "2025-12-01",
    },
];

const USERS_KEY = "noxera_users";
const SESSION_KEY = "noxera_user";

// ── helpers ───────────────────────────────────────────────────────────────────
function loadUsers(): StoredUser[] {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        if (raw) return JSON.parse(raw) as StoredUser[];
    } catch {/* */ }
    return [];
}

function saveUsers(users: StoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Ensure seed users are always present and up-to-date in storage */
function ensureSeedUsers(users: StoredUser[]): StoredUser[] {
    const result = [...users];

    // Check each seed user
    for (const seed of SEED_USERS) {
        const index = result.findIndex(u => u.id === seed.id);
        if (index === -1) {
            // Add if missing
            result.unshift(seed);
        } else {
            // Update if exists but different (to ensure credentials match code)
            result[index] = { ...result[index], ...seed };
        }
    }
    return result;
}

function initUsers(): StoredUser[] {
    const stored = loadUsers();
    const merged = ensureSeedUsers(stored);
    saveUsers(merged);
    return merged;
}

// ── context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<StoredUser[]>(() => initUsers());

    const [user, setUser] = useState<User | null>(() => {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            return raw ? (JSON.parse(raw) as User) : null;
        } catch {
            return null;
        }
    });

    // Persist session
    useEffect(() => {
        if (user) {
            localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(SESSION_KEY);
        }
    }, [user]);

    // Persist users list whenever it changes
    useEffect(() => {
        saveUsers(users);
    }, [users]);

    const login = (email: string, password: string, isMaintenanceMode: boolean = false) => {
        const found = users.find(
            (u) =>
                u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
                u.password === password
        );
        if (!found) {
            return { success: false, message: "Invalid email or password." };
        }
        if (isMaintenanceMode && found.role !== "admin") {
            return { success: false, message: "The website is currently under update. Only administrators can login at this time." };
        }
        const { password: _p, ...safeUser } = found;
        setUser(safeUser);
        return { success: true, message: "Welcome back!", user: safeUser };
    };

    const register = (name: string, email: string, password: string) => {
        const exists = users.find(
            (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
        );
        if (exists) {
            return { success: false, message: "An account with this email already exists." };
        }
        if (password.length < 3) {
            return { success: false, message: "Password must be at least 3 characters." };
        }
        const newUser: StoredUser = {
            id: `user-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            password,
            role: "user",
            joinedAt: new Date().toISOString().split("T")[0],
        };
        const updated = [...users, newUser];
        setUsers(updated);
        const { password: _p, ...safeUser } = newUser;
        setUser(safeUser);
        return { success: true, message: "Account created!" };
    };

    const logout = () => setUser(null);

    const updateProfile = (data: Partial<User>) => {
        if (!user) return;
        const updated = { ...user, ...data };
        setUser(updated);
        // Also update in users list
        setUsers((prev) =>
            prev.map((u) => (u.id === user.id ? { ...u, ...data } : u))
        );
    };

    const changePassword = (oldPwd: string, newPwd: string) => {
        if (!user) return { success: false, message: "Not logged in." };
        const found = users.find((u) => u.id === user.id);
        if (!found || found.password !== oldPwd) {
            return { success: false, message: "Current password is incorrect." };
        }
        setUsers((prev) =>
            prev.map((u) => (u.id === user.id ? { ...u, password: newPwd } : u))
        );
        return { success: true, message: "Password changed successfully!" };
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                isAdmin: user?.role === "admin",
                login,
                register,
                logout,
                updateProfile,
                changePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
