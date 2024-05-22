import React, { useState, useContext, useCallback } from "react";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";

import { AuthFormProps } from "./AuthForm.types";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import useAuthFormValidation from "../../hooks/useAuthFormValidation";
import { LoginMessageContext } from "../../Context/LoginMessageContext";
import { getErrorMessage, isFetchBaseQueryError } from "./utils";
import AuthFormTabs from "./AuthFormTabs";
import AuthFormFields from "./AuthFormFields";
import AuthFormSnackbar from "./AuthFormSnackbar";

const AuthForm: React.FC<AuthFormProps> = ({ tab, setTab, open, setOpen }) => {
  const [login, { error: loginError }] = useLoginMutation();
  const [register, { error: registerError }] = useRegisterMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const navigate = useNavigate();
  const { errors, validate } = useAuthFormValidation();
  const { setMessage } = useContext(LoginMessageContext);

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    [setTab]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!validate(username, password)) {
        return;
      }
      try {
        if (tab === 0) {
          const response = await login({ username, password }).unwrap();
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user)); // Store user data
          setSnackbarMessage("Login successful! Redirecting to products...");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setMessage("You are logged in now"); // Set the login message
          navigate("/products"); // Redirect to /products after successful login
        } else {
          const formData = new FormData();
          formData.append("username", username);
          formData.append("password", password);
          if (image) {
            formData.append("image", image);
          }

          const response = await register(formData).unwrap();
          localStorage.setItem("token", response.token);
          setSnackbarMessage("Registration successful! You can now log in.");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setOpen(false);
        }
      } catch (err) {
        let errorMessage =
          "Authentication failed. Please check your credentials and try again.";
        if (isFetchBaseQueryError(err) && err.data?.message) {
          errorMessage = err.data.message;
        }
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error("Auth error:", err);
      }
    },
    [
      validate,
      username,
      password,
      tab,
      login,
      register,
      image,
      setMessage,
      navigate,
      setOpen,
    ]
  );

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ backgroundColor: "lightgray" }}>
          <Box
            sx={{
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h5" component="div" gutterBottom>
              {tab === 0 ? "Log in" : "Register"}
            </Typography>
            <AuthFormTabs tab={tab} handleTabChange={handleTabChange} />
        
            <AuthFormFields
              tab={tab}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              image={image}
              setImage={setImage}
              errors={errors}
              handleSubmit={handleSubmit}
              loginError={getErrorMessage(loginError)}
              registerError={getErrorMessage(registerError)}
            />
          </Box>
        </DialogContent>
      </Dialog>
      <AuthFormSnackbar
        snackbarOpen={snackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
      />
    </>
  );
};

const MemoizedAuthForm = React.memo(AuthForm);
export default MemoizedAuthForm;