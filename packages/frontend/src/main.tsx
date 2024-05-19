import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App.tsx";
import "./index.css";
import { LoginMessageProvider } from "./Context/LoginMessageContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LoginMessageProvider>
        <App />
      </LoginMessageProvider>
    </Provider>
  </React.StrictMode>
);
