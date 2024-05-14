import React from "react";
import { Box, InputBase, IconButton, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  width: "98.6%",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const Shortcut = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

const UserProfile = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2),
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.primary,
}));

const UserRole = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
}));

const SearchBar: React.FC = () => {
  return (
    <SearchContainer>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <SearchInput placeholder="Search product, customer, etc..." />
      <Shortcut>⌘ + K</Shortcut>
      <IconButton>
        <NotificationsIcon />
      </IconButton>
      <UserProfile>
        <Avatar src="https://via.placeholder.com/30" alt="User" />
        <Box ml={1}>
          <UserName>Rayna Vetrovs</UserName>
          <UserRole>Admin</UserRole>
        </Box>
      </UserProfile>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </SearchContainer>
  );
};

export default SearchBar;
