import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App.tsx";
import "./index.css";
import { LoginMessageProvider } from "./Context/LoginMessageContext.tsx";
import { UserProvider } from "./Context/UserContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "YOUR_GOOGLE_CLIENT_ID"; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LoginMessageProvider>
        <UserProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
          </GoogleOAuthProvider>
        </UserProvider>
      </LoginMessageProvider>
    </Provider>
  </React.StrictMode>
);