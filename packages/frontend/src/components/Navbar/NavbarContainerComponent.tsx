import React, { ReactNode } from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Theme, useTheme } from "@mui/material/styles";

const NavbarContainer = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
  boxShadow: "none",
  padding: theme.spacing(1, 2),
  backgroundImage: "unset",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

interface NavbarContainerComponentProps {
  children: ReactNode;
}

const NavbarContainerComponent: React.FC<NavbarContainerComponentProps> = ({
  children,
}) => {
  const theme = useTheme();
  return (
    <NavbarContainer
      position="sticky"
      sx={{ top: 0, zIndex: 1100 }}
      theme={theme}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <img
            src=""
            alt="Logo"
            style={{ height: "40px", marginRight: "16px" }}
          />
          <Typography variant="h6" component="div">
            Stuffsus
          </Typography>
        </Box>
        {children}
      </Toolbar>
    </NavbarContainer>
  );
};

export default NavbarContainerComponent;
