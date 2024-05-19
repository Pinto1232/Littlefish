import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Tab,
  Tabs,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { AuthFormProps } from "./AuthForm.types";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import useAuthFormValidation from "../../hooks/useAuthFormValidation"; // Import the custom hook
import { LoginMessageContext } from "../../Context/LoginMessageContext"; // Import the context

type CustomFetchBaseQueryError = FetchBaseQueryError & {
  data: {
    message?: string;
  };
};

const isFetchBaseQueryError = (
  error: unknown
): error is CustomFetchBaseQueryError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    "status" in error
  );
};

const AuthForm: React.FC<AuthFormProps> = ({ tab, setTab, open, setOpen }) => {
  const [login, { error: loginError }] = useLoginMutation();
  const [register, { error: registerError }] = useRegisterMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const navigate = useNavigate();
  const { errors, validate } = useAuthFormValidation(); // Use the custom hook
  const { setMessage } = useContext(LoginMessageContext);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate(username, password)) {
      return;
    }
    try {
      if (tab === 0) {
        const response = await login({ username, password }).unwrap();
        localStorage.setItem("token", response.token);
        setSnackbarMessage("Login successful! Redirecting to products...");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setMessage("You are logged in now"); // Set the login message
        navigate("/products"); // Redirect to /products after successful login
      } else {
        const response = await register({ username, password }).unwrap();
        localStorage.setItem("token", response.token);
        setSnackbarMessage("Registration successful! You can now log in.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setOpen(false);
      }
    } catch (err) {
      setSnackbarMessage(
        "Authentication failed. Please check your credentials and try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Auth error:", err);
    }
  };

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
            <Tabs value={tab} onChange={handleTabChange} centered>
              <Tab label="User" />
              <Tab label="Register" />
            </Tabs>
            <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="username"
                label="Email"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  startAdornment: (
                    <Box component="span" sx={{ mr: 1 }}>
                      📧
                    </Box>
                  ),
                }}
              />
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <Box component="span" sx={{ mr: 1 }}>
                      🔒
                    </Box>
                  ),
                }}
              />
              {tab === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                  <Typography
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{ textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Typography>
                </Box>
              )}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#000", borderRadius: 5 }}
              >
                {tab === 0 ? "Log in" : "Register"}
              </Button>
              {(loginError || registerError) && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {isFetchBaseQueryError(loginError || registerError)
                    ? (loginError as CustomFetchBaseQueryError).data?.message ??
                      "Authentication failed"
                    : "Authentication failed"}
                </Typography>
              )}
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Box
                  sx={{ flexGrow: 1, height: 1, backgroundColor: "grey.300" }}
                />
                <Typography variant="body2" sx={{ mx: 2 }}>
                  or
                </Typography>
                <Box
                  sx={{ flexGrow: 1, height: 1, backgroundColor: "grey.300" }}
                />
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{ flexGrow: 1, mr: 1 }}
                >
                  Google
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FingerprintIcon />}
                  sx={{ flexGrow: 1, ml: 1 }}
                >
                  M. Signature
                </Button>
              </Box>
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Don’t have an account?{" "}
                <Typography
                  component="a"
                  href="#"
                  sx={{ textDecoration: "none", color: "primary.main" }}
                >
                  Register
                </Typography>
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position the Snackbar at the top center
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            backgroundColor:
              snackbarSeverity === "success" ? "#4caf50" : "#f44336", // Custom background color
            color: "white", // Custom text color
            boxShadow: 3, // Add shadow
            borderRadius: 2, // Rounded corners
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthForm;
