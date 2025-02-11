"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Create Context with a default value (null user)
const AuthContext = createContext(undefined);

const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);

  // Load data from localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse stored user if available
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser } as any}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
