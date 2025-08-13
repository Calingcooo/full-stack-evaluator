import { createContext, useState, useContext } from "react";
import api from "../api/axios";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const handleSignin = async (e, formData, setIsLoading) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = formData;
    if (email.trim() === "" || password.trim() === "") {
      alert("Email and password field is required");
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await api.post("/auth/signin", { email, password });

      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e, formData, setIsLoading, setCurrentView) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.post("/auth/signup", { name, email, password });

      alert("Account created successfully!");
      setCurrentView("signin");
      setAuthError(false);
    } catch (error) {
      console.error(error);
      setAuthError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, authError, handleSignin, handleSignup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
