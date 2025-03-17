import { useState, useEffect } from "react";
import { AppContext } from "./AppContextObject";

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage immediately during initialization
  // This ensures the correct value from the start, not after useEffect runs
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser === "true" ? true : null;
  });

  const login = () => {
    setUser(true);
    localStorage.setItem("user", "true");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Debug state changes
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
