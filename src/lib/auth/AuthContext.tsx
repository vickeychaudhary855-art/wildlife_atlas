"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: "free" | "premium" | "admin";
  isLifetimePremium: boolean;
  avatarUrl?: string;
  joinedAt: string;
  currencyPreference: "INR" | "USD";
}

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  login: (email: string, role?: "free" | "premium" | "admin") => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  restoreEntitlement: () => Promise<boolean>;
  upgradeToPremium: () => void;
}

const DEMO_USERS: Record<string, UserSession> = {
  "admin@wildlife-atlas.org": {
    id: "usr_admin_001",
    email: "admin@wildlife-atlas.org",
    name: "Dr. Evelyn Reed (Lead Taxonomist)",
    role: "admin",
    isLifetimePremium: true,
    joinedAt: "2024-01-15T00:00:00.000Z",
    currencyPreference: "USD",
  },
  "researcher@nature.org": {
    id: "usr_prem_002",
    email: "researcher@nature.org",
    name: "Prof. Rajesh Sharma",
    role: "premium",
    isLifetimePremium: true,
    joinedAt: "2024-03-10T00:00:00.000Z",
    currencyPreference: "INR",
  },
  "user@example.com": {
    id: "usr_free_003",
    email: "user@example.com",
    name: "Alex Thorne",
    role: "free",
    isLifetimePremium: false,
    joinedAt: "2024-05-01T00:00:00.000Z",
    currencyPreference: "USD",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted demo session
    const stored = localStorage.getItem("wildlife_atlas_user_session");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("wildlife_atlas_user_session");
      }
    } else {
      // Default initial mock session for effortless review (Free user)
      const defaultUser = DEMO_USERS["user@example.com"];
      setUser(defaultUser);
      localStorage.setItem("wildlife_atlas_user_session", JSON.stringify(defaultUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, forcedRole?: "free" | "premium" | "admin") => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    let matched = DEMO_USERS[email.toLowerCase()];
    if (!matched) {
      matched = {
        id: `usr_${Date.now()}`,
        email: email.toLowerCase(),
        name: email.split("@")[0].replace(".", " ").replace(/^./, (c) => c.toUpperCase()),
        role: forcedRole || "free",
        isLifetimePremium: forcedRole === "premium" || forcedRole === "admin",
        joinedAt: new Date().toISOString(),
        currencyPreference: email.endsWith(".in") ? "INR" : "USD",
      };
    } else if (forcedRole) {
      matched = {
        ...matched,
        role: forcedRole,
        isLifetimePremium: forcedRole === "premium" || forcedRole === "admin",
      };
    }

    setUser(matched);
    localStorage.setItem("wildlife_atlas_user_session", JSON.stringify(matched));
    setIsLoading(false);
  };

  const register = async (name: string, email: string) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));
    const newUser: UserSession = {
      id: `usr_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      role: "free",
      isLifetimePremium: false,
      joinedAt: new Date().toISOString(),
      currencyPreference: email.endsWith(".in") ? "INR" : "USD",
    };
    setUser(newUser);
    localStorage.setItem("wildlife_atlas_user_session", JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("wildlife_atlas_user_session");
  };

  const restoreEntitlement = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    if (user) {
      const updated: UserSession = {
        ...user,
        role: "premium",
        isLifetimePremium: true,
      };
      setUser(updated);
      localStorage.setItem("wildlife_atlas_user_session", JSON.stringify(updated));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const upgradeToPremium = () => {
    if (user) {
      const updated: UserSession = {
        ...user,
        role: user.role === "admin" ? "admin" : "premium",
        isLifetimePremium: true,
      };
      setUser(updated);
      localStorage.setItem("wildlife_atlas_user_session", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        restoreEntitlement,
        upgradeToPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

