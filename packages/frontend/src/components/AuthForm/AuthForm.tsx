import React from "react";
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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { AuthFormProps } from "./AuthForm.types";

const AuthForm: React.FC<AuthFormProps> = ({ tab, setTab, open, setOpen }) => {
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
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
              label="Password"
              type="password"
              margin="normal"
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
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#000", borderRadius: 5 }}
            >
              {tab === 0 ? "Log in" : "Register"}
            </Button>
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
  );
};

export default AuthForm;
