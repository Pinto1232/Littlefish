import { styled } from "@mui/system";
import { Card, Box } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 330,
  borderRadius: 8,
  height: 500,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(0.1), 
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export const ImageWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  maxWidth: 330,
  paddingTop: "75%",
  overflow: "hidden",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
});