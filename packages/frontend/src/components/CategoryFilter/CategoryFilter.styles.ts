import { styled } from "@mui/system";
import { Box, Typography, Select, Slider, Checkbox, FormControlLabel  } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const FilterContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(2, 3),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  width: "100%",
  maxWidth: 320,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const HeaderBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const FilterTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
  color: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
}));

export const StyledSelect = styled(Select)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.grey[200],
  transition: "background-color 0.3s ease",
  display: "flex",
  alignItems: "center",
  "& .MuiSelect-select": {
    padding: "10px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:focus .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

export const StyledSlider = styled(Slider)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },
  color: theme.palette.primary.main,
  "& .MuiSlider-thumb": {
    boxShadow: theme.shadows[3],
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: theme.palette.grey[500],
  },
}));

export const IconStyle = {
  mr: 1,
  color: "blue",
};

export const LengthTypography = styled(Typography)({
  backgroundColor: "#000",
  color: "#fff",
  width: 50,
  textAlign: "center",
  px: 1,
  py: 0.3,
  boxShadow: "50%",
  borderRadius: 10,
});

export const WidthTypography = styled(Typography)({
  backgroundColor: "red",
  color: "#fff",
  width: 60,
  textAlign: "center",
  px: 1,
  py: 0.3,
  boxShadow: "50%",
  borderRadius: 10,
});

export const HeightTypography = styled(Typography)({
  backgroundColor: "blue",
  color: "#fff",
  width: 70,
  textAlign: "center",
  px: 1,
  py: 0.3,
  boxShadow: "50%",
  borderRadius: 10,
});

export const IconButtonStyle = {
  backgroundColor: "#000",
  color: "#fff",
};

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&.Mui-checked": {
    color: theme.palette.primary.main,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 28,
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  "& .MuiFormControlLabel-label": {
    fontSize: 16,
    fontWeight: 500,
  },
}));