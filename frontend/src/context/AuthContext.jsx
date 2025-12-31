import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Run once on app load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token }); // minimal user object for routing
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    setUser({ token: res.data.token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Optional helper hook
export const useAuth = () => useContext(AuthContext);
