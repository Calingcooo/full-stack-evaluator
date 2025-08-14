import { createContext, useState, useContext } from "react";
import { useError } from "./ErrorContext";
import api from "../api/axios";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { setLoginError, setGlobalError, clearLoginError, clearGlobalError } =
    useError();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignin = async (e, formData, setIsLoading) => {
    e.preventDefault();
    setIsLoading(true);
    clearLoginError(null);
    clearGlobalError(null);

    const { email, password } = formData;

    if (email.trim() === "" || password.trim() === "") {
      alert("Email and password field is required");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.post("/auth/signin", { email, password });

      console.log(data);

      alert("logged in success!");
      setLoginError(null);
    } catch (error) {
      if (error.response) {
        // Backend responded with an error status (e.g., 400, 401)
        const backendMessage = error.response.data?.message || "Unknown server error";

        // Handle both unauthorized, bad request error and server error
        if (error.response.status === 401 || error.response.status === 400) {
          setLoginError(backendMessage);
        } else {
          setGlobalError(backendMessage);
          clearLoginError(null)
        }
      } else if (error.request) {
        // Request made but no response received
        setGlobalError("No response from server. Please check your connection.");
        clearLoginError(null)
      } else {
        // Something else triggered the error
        setGlobalError("An unexpected error occurred.");
        clearLoginError(null)
      }
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
      const { data } = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Account created successfully!");
      console.log(data);
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
      value={{ user, isAuthenticated, handleSignin, handleSignup }}
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
