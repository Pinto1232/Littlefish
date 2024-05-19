import React, { createContext, useState, ReactNode } from "react";

interface LoginMessageContextProps {
  message: string;
  setMessage: (message: string) => void;
}

const defaultState: LoginMessageContextProps = {
  message: "",
  setMessage: () => {},
};

export const LoginMessageContext =
  createContext<LoginMessageContextProps>(defaultState);

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
