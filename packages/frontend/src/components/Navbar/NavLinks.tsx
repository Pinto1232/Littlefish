import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { Theme } from "@mui/material/styles";

const NavLinksContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const NavLinks: React.FC = () => {
  const theme = useTheme();

  return (
    <NavLinksContainer theme={theme}>
      <Typography variant="body1">Beranda</Typography>
      <Typography variant="body1">Shop</Typography>
      <Typography variant="body1">Blog</Typography>
    </NavLinksContainer>
  );
};

export default NavLinks;
