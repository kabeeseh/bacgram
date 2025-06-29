"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const userContext = createContext<UserContextType | null>(null);
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") as string));
    }
  }, []);
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
