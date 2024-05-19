import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DashboardDrawer from "./DashboardDrawer";

const DashboardLayout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000); // Simulate a delay for the loading spinner
  };

  const drawerItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      onClick: () => console.log("Home clicked"),
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      onClick: () => console.log("Settings clicked"),
    },
    { label: "Logout", icon: <ExitToAppIcon />, onClick: handleLogout },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <DashboardDrawer
        items={drawerItems}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        isLoading={isLoading}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Typography paragraph>{/* Main content goes here. */}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
