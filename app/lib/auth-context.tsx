"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  nama: string;
  role?: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, nama: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "sinergispace_users";
const SESSION_KEY = "sinergispace_session";

interface StoredUser {
  email: string;
  nama: string;
  password: string;
  role?: "user" | "admin";
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

function saveSession(user: User | null): void {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    setUser(session);
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const sessionUser: User = { email: found.email, nama: found.nama, role: found.role || "user" };
      setUser(sessionUser);
      saveSession(sessionUser);
      return true;
    }
    return false;
  };

  const register = (email: string, nama: string, password: string): boolean => {
    const users = getStoredUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) return false;

    users.push({ email, nama, password, role: "user" });
    saveUsers(users);

    const sessionUser: User = { email, nama, role: "user" };
    setUser(sessionUser);
    saveSession(sessionUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    saveSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
