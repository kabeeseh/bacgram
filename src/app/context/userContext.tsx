"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../types";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const userContext = createContext<UserContextType | null>(null);
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const useUser = useContext(userContext);
  if (useUser == null) {
    throw Error("Please Login again");
  }
  return useUser;
}
