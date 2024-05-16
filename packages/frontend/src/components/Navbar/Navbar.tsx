import React, { useState } from "react";
import { Box, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  CartDrawer,
  NavLinks,
  NavbarContainerComponent,
  UserMenu,
  useCart,
} from "./index";

const Navbar: React.FC<{
  setTab: (tab: number) => void;
  setAuthModalOpen: (open: boolean) => void;
}> = ({ setTab, setAuthModalOpen }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { cart } = useCart();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    setTab(0);
    setAuthModalOpen(true);
    handleClose();
  };

  const handleRegisterClick = () => {
    setTab(1);
    setAuthModalOpen(true);
    handleClose();
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <NavbarContainerComponent>
      <NavLinks />
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={toggleDrawer(true)}>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": { color: "white", backgroundColor: "red" },
            }}
          >
            <ShoppingCartIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
        <UserMenu
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
          handleLoginClick={handleLoginClick}
          handleRegisterClick={handleRegisterClick}
        />
      </Box>
      <CartDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </NavbarContainerComponent>
  );
};

export default Navbar;
