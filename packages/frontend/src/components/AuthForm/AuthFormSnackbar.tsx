import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface AuthFormSnackbarProps {
  snackbarOpen: boolean;
  handleSnackbarClose: () => void;
  snackbarMessage: string;
  snackbarSeverity: "success" | "error";
}

const AuthFormSnackbar: React.FC<AuthFormSnackbarProps> = ({
  snackbarOpen,
  handleSnackbarClose,
  snackbarMessage,
  snackbarSeverity,
}) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        sx={{
          width: "100%",
          backgroundColor: snackbarSeverity === "success" ? "#4caf50" : "#f44336",
          color: "white",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

const MemoizedAuthFormSnackbar = React.memo(AuthFormSnackbar);
export default MemoizedAuthFormSnackbar;