import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { Theme } from "@mui/material/styles";
import MegaMenu from "../MegaMenu/MegaMenu"; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 

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
    console.log("NavLinks: Application clicked"); 
    setMegaMenuOpenState(prev => !prev);
    setMegaMenuOpen(prev => !prev); 
  };

  return (
    <NavLinksContainer theme={theme}>
      <Typography
        variant="body1"
        onClick={handleMegaMenuToggle}
        sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        Categories
        <ExpandMoreIcon sx={{ ml: 1 }} /> 
      </Typography>
      {megaMenuOpen && <MegaMenu open={megaMenuOpen} />}
      <Typography variant="body1">Beranda</Typography>
      <Typography variant="body1">Shop</Typography>
      <Typography variant="body1">Blog</Typography>
    </NavLinksContainer>
  );
};

const MemoizedNavLinks = React.memo(NavLinks);
export default MemoizedNavLinks;


