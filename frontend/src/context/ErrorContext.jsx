import { createContext, useState, useContext } from "react";

export const ErrorContext = createContext(undefined);

export const ErrorProvider = ({ children }) => {
  const [loginError, setLoginError] = useState(null);
  const [globalError, setGlobalError] = useState(null);

  const clearLoginError = () => setLoginError(null);
  const clearGlobalError = () => setGlobalError(null);

  return (
    <ErrorContext.Provider
      value={{
        loginError,
        setLoginError,
        globalError,
        setGlobalError,
        clearLoginError,
        clearGlobalError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
