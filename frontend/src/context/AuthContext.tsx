import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'patient' | 'hospital' | 'admin';

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    patientId?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, role: UserRole) => Promise<User>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    dob?: string;
    bloodGroup?: string;
    ayushCategory?: string;
    specialization?: string;
    licenseNo?: string;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('sanjeevani_user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem('sanjeevani_user');
            }
        }
    }, []);

    const login = async (email: string, password: string, role: UserRole): Promise<User> => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || 'Login failed');
        const u = data.user;
        setUser(u);
        localStorage.setItem('sanjeevani_user', JSON.stringify(u));
        if (data.token) localStorage.setItem('sanjeevani_token', data.token);
        return u;
    };

    const register = async (regData: RegisterData): Promise<void> => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || 'Registration failed');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('sanjeevani_user');
        localStorage.removeItem('sanjeevani_token');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export default AuthContext;
