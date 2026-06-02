import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { isDemoMode } from "@/config/runtime";

const AuthContext = createContext(null);

const DEMO_USER = {
  id: "demo-educator",
  full_name: isDemoMode ? "Demo Educator" : "Teacher",
  email: isDemoMode ? "demo@bathroom-pass.local" : "teacher@example.edu",
  role: "teacher",
  class_name: "Room 204",
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authChecked, setAuthChecked] = useState(true);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState(null);

  const checkUserAuth = useCallback(async () => {
    setIsLoadingAuth(true);
    setAuthChecked(false);
    await new Promise((resolve) => window.setTimeout(resolve, 150));
    setIsAuthenticated(true);
    setAuthChecked(true);
    setAuthError(null);
    setIsLoadingAuth(false);
    return true;
  }, []);

  const navigateToLogin = useCallback(() => {
    setIsAuthenticated(false);
    setAuthError({ type: "auth_required", message: "Please sign in to continue." });
  }, []);

  const login = useCallback(async () => {
    setIsLoadingAuth(true);
    await new Promise((resolve) => window.setTimeout(resolve, 250));
    setIsAuthenticated(true);
    setAuthChecked(true);
    setAuthError(null);
    setIsLoadingAuth(false);
    return DEMO_USER;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setAuthError({ type: "auth_required", message: "Signed out." });
  }, []);

  const value = useMemo(() => ({
    user: DEMO_USER,
    isAuthenticated,
    isLoadingAuth,
    isLoadingPublicSettings: false,
    authChecked,
    authError,
    checkUserAuth,
    navigateToLogin,
    login,
    logout,
  }), [authChecked, authError, checkUserAuth, isAuthenticated, isLoadingAuth, login, logout, navigateToLogin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
