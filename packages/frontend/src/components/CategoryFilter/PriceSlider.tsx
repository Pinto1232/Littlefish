import React from "react";
import { Typography } from "@mui/material";
import { StyledSlider } from "./CategoryFilter.styles";
import { Theme } from "@mui/material/styles";

interface PriceSliderProps {
  theme: Theme;
  priceRange: number[];
  onPriceChange: (newValue: number[]) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  theme,
  priceRange,
  onPriceChange,
}) => (
  <>
    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: "medium" }}>
      Price
    </Typography>
    <StyledSlider
      theme={theme}
      value={priceRange}
      onChange={(_e, newValue) => onPriceChange(newValue as number[])}
      valueLabelDisplay="auto"
      min={0}
      max={1000}
    />
  </>
);

const MemoizedPriceSlider = React.memo(PriceSlider);
export default MemoizedPriceSlider;

