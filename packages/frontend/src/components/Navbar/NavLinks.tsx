import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { Theme } from "@mui/material/styles";
import MegaMenu from "../MegaMenu/MegaMenu"; // Adjust the import path as necessary
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import the ExpandMore icon

interface NavLinksProps {
  setMegaMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavLinksContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const NavLinks: React.FC<NavLinksProps> = ({ setMegaMenuOpen }) => {
  const theme = useTheme();
  const [megaMenuOpen, setMegaMenuOpenState] = useState(false);

  const handleMegaMenuToggle = () => {
    console.log("NavLinks: Application clicked"); // Debugging log
    setMegaMenuOpenState(prev => !prev); // Toggle MegaMenu visibility
    setMegaMenuOpen(prev => !prev); // Use the prop to set the state in the parent component
  };

  return (
    <NavLinksContainer theme={theme}>
      <Typography
        variant="body1"
        onClick={handleMegaMenuToggle}
        sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        Categories
        <ExpandMoreIcon sx={{ ml: 1 }} /> {/* Add the ExpandMore icon */}
      </Typography>
      {megaMenuOpen && <MegaMenu open={megaMenuOpen} />} {/* Pass the open prop */}
      <Typography variant="body1">Beranda</Typography>
      <Typography variant="body1">Shop</Typography>
      <Typography variant="body1">Blog</Typography>
    </NavLinksContainer>
  );
};

export default NavLinks;