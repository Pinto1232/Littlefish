import React from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { UserMenuProps } from "./NavbarInterfaces";
import { useUser } from "../../Context/useUser"; // Update the import path

const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  handleClick,
  handleClose,
  handleLoginClick,
  handleRegisterClick,
}) => {
  const { user } = useUser();

  // Ensure the image path uses forward slashes
  const imageUrl = user?.image ? `http://localhost:5000/${user.image.replace(/\\/g, '/')}` : "";

  return (
    <>
      <Avatar
        alt="User"
        src={imageUrl}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLoginClick}>Login</MenuItem>
        <MenuItem onClick={handleRegisterClick}>Register</MenuItem>
      </Menu>
    </>
  );
};

const MemoizedUserMenu = React.memo(UserMenu);
export default MemoizedUserMenu;

