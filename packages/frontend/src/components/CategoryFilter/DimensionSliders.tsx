import React from "react";
import { Typography } from "@mui/material";
import {
  LengthTypography,
  WidthTypography,
  HeightTypography,
  StyledSlider,
} from "./CategoryFilter.styles";
import { Theme } from "@mui/material/styles";

type OnDimensionChange = (dimension: string, value: number[]) => void;

interface DimensionRange {
  length: number[];
  width: number[];
  height: number[];
}

interface DimensionSlidersProps {
  theme: Theme;
  dimensionRange: DimensionRange;
  onDimensionChange: OnDimensionChange;
}

const DimensionSliders: React.FC<DimensionSlidersProps> = ({
  theme,
  dimensionRange,
  onDimensionChange,
}) => (
  <>
    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: "medium" }}>
      Dimensions
    </Typography>
    <LengthTypography fontSize={10} px={2} py={0.4} variant="body2">
      Length
    </LengthTypography>
    <StyledSlider
      theme={theme}
      value={dimensionRange.length}
      onChange={(_e, newValue) =>
        onDimensionChange("length", newValue as number[])
      }
      valueLabelDisplay="auto"
      min={0}
      max={20}
    />
    <WidthTypography fontSize={10} px={2} py={0.4} variant="body2">
      Width
    </WidthTypography>
    <StyledSlider
      theme={theme}
      value={dimensionRange.width}
      onChange={(_e, newValue) =>
        onDimensionChange("width", newValue as number[])
      }
      valueLabelDisplay="auto"
      min={0}
      max={20}
    />
    <HeightTypography fontSize={10} px={2} py={0.4} variant="body2">
      Height
    </HeightTypography>
    <StyledSlider
      theme={theme}
      value={dimensionRange.height}
      onChange={(_e, newValue) =>
        onDimensionChange("height", newValue as number[])
      }
      valueLabelDisplay="auto"
      min={0}
      max={20}
    />
  </>
);

const MemoizedDimensionSliders = React.memo(DimensionSliders);
export default MemoizedDimensionSliders;

