import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { getErrorMessage } from "./utils";
import { AuthFormFieldsProps } from "./AuthForm.types";
import { CredentialResponse } from '@react-oauth/google'; 

const AuthFormFields: React.FC<AuthFormFieldsProps> = ({
  tab,
  username,
  setUsername,
  password,
  setPassword,
  image,
  setImage,
  errors,
  handleSubmit,
  loginError,
  registerError,
}) => {

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    console.log("Google login success:", response);
    const { credential } = response;
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: credential }),
      });
  
      const data = await res.json();
      if (res.ok) {
        console.log("User authenticated:", data);
        // Store token and user info in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to the dashboard or another page
        window.location.href = "/dashboard";
      } else {
        console.error("Authentication failed:", data);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };
  const handleGoogleLoginFailure = () => {
    console.error("Google login failure");
    // Handle the Google login failure
  };

  return (
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
      {tab === 1 && (
        <Box sx={{ mt: 2 }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-button-file"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setImage(e.target.files?.[0] || null)
            }
          />
          <label htmlFor="upload-button-file">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
            </Button>
          </label>
          {image && (
            <Box sx={{ mt: 2 }}>
              <img src={URL.createObjectURL(image)} alt="Preview" width="100" />
            </Box>
          )}
        </Box>
      )}
      {tab === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <FormControlLabel control={<Checkbox />} label="Remember me" />
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
          {typeof loginError === "string" || typeof registerError === "string"
            ? loginError || registerError
            : getErrorMessage(loginError || registerError)}
        </Typography>
      )}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Box sx={{ flexGrow: 1, height: 1, backgroundColor: "grey.300" }} />
        <Typography variant="body2" sx={{ mx: 2 }}>
          or
        </Typography>
        <Box sx={{ flexGrow: 1, height: 1, backgroundColor: "grey.300" }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />
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
  );
};

const MemoizedAuthFormFields = React.memo(AuthFormFields);
export default MemoizedAuthFormFields;