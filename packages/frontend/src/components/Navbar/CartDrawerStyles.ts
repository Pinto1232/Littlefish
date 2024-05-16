// CartDrawerStyles.ts
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { Theme } from "@mui/material/styles";

export const DrawerContent = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: 350,
  padding: theme.spacing(2),
  background: "linear-gradient(135deg, #f5f5f5 30%, #fff 100%)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius,
}));

export const ItemContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));
