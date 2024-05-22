import React, { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google Client ID

interface GoogleAuthProviderProps {
  children: ReactNode;
}

const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};

const MemoizedGoogleAuthProvider = React.memo(GoogleAuthProvider);
export default MemoizedGoogleAuthProvider;