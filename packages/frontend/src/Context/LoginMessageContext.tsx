import React, { createContext, useState, ReactNode } from "react";

// Define the context properties
interface LoginMessageContextProps {
  message: string;
  setMessage: (message: string) => void;
}

// Default state for the context
const defaultState: LoginMessageContextProps = {
  message: "",
  setMessage: () => {},
};

// Create the LoginMessageContext with a default state
export const LoginMessageContext =
  createContext<LoginMessageContextProps>(defaultState);

// Provider component to manage login message state
export const LoginMessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState("");

  return (
    <LoginMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </LoginMessageContext.Provider>
  );
};