import { styled } from "@mui/system";
import { Box, Typography, ListItem, ListItemText } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const MegaMenuContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  position: "absolute",
  marginTop: 9,
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "90vw",
  backgroundColor: "white",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  zIndex: 900,
  transition: "opacity 0.3s ease, visibility 0.3s ease, max-height 0.3s ease",
  opacity: 0,
  visibility: "hidden",
  maxHeight: 0,
  overflow: "hidden",
  "&.open": {
    opacity: 1,
    visibility: "visible",
    maxHeight: "500px",
  },
}));

export const CategoryTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  cursor: "pointer",
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));