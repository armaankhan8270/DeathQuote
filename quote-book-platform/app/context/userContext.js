"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // If user data is found, use it
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parsedUser.token}`;
    } else {
      // Temporary user data for development or testing purposes
      const temporaryUser = {
        _id: "66a38a689766d93c6597f3c9",
        email: "zakku@gmail.com",
        username: "Zakariya",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjlmNTI4MGNjMmMyMDhlNDA2ZTUzYWEiLCJpYXQiOjE3MjE3MTc3MjYsImV4cCI6MTcyMTcyMTMyNn0.Yq3QzC-K77gbIZJtTdJobxlqHuXPoJ4pD66J4ev_iWg",
      };

      // Set temporary user data
      setUser(temporaryUser);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${temporaryUser.token}`;

      // Optionally store temporary user data in localStorage
      localStorage.setItem("user", JSON.stringify(temporaryUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
