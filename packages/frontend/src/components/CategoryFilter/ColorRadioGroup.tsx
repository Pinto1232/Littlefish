import React from "react";
import { FormControl, RadioGroup, Typography } from "@mui/material";
import {
  StyledFormControlLabel,
  StyledCheckbox,
} from "./CategoryFilter.styles";
import { Theme } from "@mui/material/styles";

interface ColorRadioGroupProps {
  theme: Theme;
  color: string;
  onColorChange: (color: string) => void;
}

const getColorCheckbox = (color: string) => {
  const colorMap: { [key: string]: string } = {
    red: "#f44336",
    blue: "#2196f3",
    green: "#4caf50",
  };

  return (
    <StyledCheckbox
      sx={{
        color: colorMap[color] || "default",
        "&.Mui-checked": {
          color: colorMap[color] || "default",
        },
      }}
    />
  );
};

const ColorRadioGroup: React.FC<ColorRadioGroupProps> = ({
  theme,
  color,
  onColorChange,
}) => (
  <>
    <Typography
      variant="subtitle1"
      sx={{
        mt: 2,
        mb: 1,
        fontWeight: "medium",
        color: theme.palette.primary.main,
      }}
    >
      Color
    </Typography>
    <FormControl component="fieldset">
      <RadioGroup value={color} onChange={(e) => onColorChange(e.target.value)}>
        <StyledFormControlLabel
          value="all"
          control={<StyledCheckbox />}
          label="All"
        />
        <StyledFormControlLabel
          value="red"
          control={getColorCheckbox("red")}
          label="Red"
        />
        <StyledFormControlLabel
          value="blue"
          control={getColorCheckbox("blue")}
          label="Blue"
        />
        <StyledFormControlLabel
          value="green"
          control={getColorCheckbox("green")}
          label="Green"
        />
      </RadioGroup>
    </FormControl>
  </>
);

const MemoizedColorRadioGroup = React.memo(ColorRadioGroup);
export default MemoizedColorRadioGroup;



