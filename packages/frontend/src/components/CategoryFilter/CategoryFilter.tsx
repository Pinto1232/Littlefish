import React, { useState } from "react";
import {
  Typography,
  Checkbox,
  FormControl,
  Collapse,
  IconButton,
  MenuItem,
  SelectChangeEvent,
  RadioGroup,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ViewListIcon from "@mui/icons-material/ViewList";
import DevicesIcon from "@mui/icons-material/Devices";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { CategoryFilterProps } from "./CategoryFilter.types";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import StyleIcon from "@mui/icons-material/Style";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import DashboardIcon from "@mui/icons-material/Dashboard";

import {
  FilterContainer,
  HeaderBox,
  FilterTitle,
  StyledSelect,
  StyledSlider,
  IconStyle,
  LengthTypography,
  WidthTypography,
  HeightTypography,
  IconButtonStyle,
  StyledCheckbox,
  StyledFormControlLabel,
} from "./CategoryFilter.styles";

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilter,
  onPriceChange,
  onColorChange,
  onDimensionChange,
}) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Categories");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [color, setColor] = useState<string>("all");
  const [dimensionRange, setDimensionRange] = useState<{
    length: number[];
    width: number[];
    height: number[];
  }>({
    length: [0, 10],
    width: [0, 10],
    height: [0, 10],
  });
  const [open, setOpen] = useState(true);

  // Redux Query Operations
  const { data: products, error, isLoading } = useGetProductsQuery();
  console.log("Category Filter ", products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    let errorMessage = "An unknown error occurred";
    if ("status" in error) {
      const fetchError = error as FetchBaseQueryError;
      if (
        fetchError.data &&
        typeof fetchError.data === "object" &&
        "message" in fetchError.data
      ) {
        errorMessage = (fetchError.data as { message: string }).message;
      }
    } else if ("message" in error) {
      errorMessage =
        (error as SerializedError).message || "An unknown error occurred";
    }
    return <div>Error: {errorMessage}</div>;
  }

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
    onFilter(category);
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    onPriceChange(newValue as number[]);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
    onColorChange(event.target.value);
  };

  const handleDimensionChange = (
    dimension: string,
    newValue: number | number[]
  ) => {
    setDimensionRange((prev) => ({
      ...prev,
      [dimension]: newValue as number[],
    }));
    onDimensionChange(dimension, newValue as number[]);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "All":
        return <ViewListIcon sx={IconStyle} />;
      case "Electronics":
        return <DevicesIcon sx={IconStyle} />;
      case "Cars":
        return <DriveEtaIcon sx={IconStyle} />;
      case "Baby":
        return <ChildFriendlyIcon sx={IconStyle} />;
      case "Food":
        return <FastfoodIcon sx={IconStyle} />;
      case "Fashion & Apparel":
        return <StyleIcon sx={IconStyle} />;
      default:
        return <DashboardIcon sx={IconStyle} />;
    }
  };

  const getColorCheckbox = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: "#f44336",
      blue: "#2196f3",
      green: "#4caf50",
    };

    return (
      <Checkbox
        sx={{
          color: colorMap[color] || "default",
          "&.Mui-checked": {
            color: colorMap[color] || "default",
          },
        }}
      />
    );
  };

  return (
    <FilterContainer theme={theme}>
      <HeaderBox>
        <FilterTitle theme={theme} variant="h6">
          <FilterListIcon sx={{ mr: 1 }} /> Filter
        </FilterTitle>
        <IconButton sx={IconButtonStyle} onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </HeaderBox>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <FormControl fullWidth>
          <StyledSelect
            theme={theme}
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem
              sx={{ display: "flex", alignItems: "center" }}
              value="Categories"
              disabled
            >
              <DashboardIcon sx={{ mr: 1 }} />
              <Typography>Categories</Typography>
            </MenuItem>
            <MenuItem value="All">
              <ViewListIcon sx={{ mr: 1 }} />
              All
            </MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {getCategoryIcon(category)}
                {category}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="subtitle1"
          sx={{ mt: 2, mb: 1, fontWeight: "medium" }}
        >
          Price
        </Typography>
        <StyledSlider
          theme={theme}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="subtitle1"
          sx={{ mt: 2, mb: 1, fontWeight: "medium" }}
        >
          Dimensions
        </Typography>
        <LengthTypography fontSize={10} px={2} py={0.4} variant="body2">
          Length
        </LengthTypography>
        <StyledSlider
          theme={theme}
          value={dimensionRange.length}
          onChange={(_e, newValue) => handleDimensionChange("length", newValue)}
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
          onChange={(_e, newValue) => handleDimensionChange("width", newValue)}
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
          onChange={(_e, newValue) => handleDimensionChange("height", newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={20}
        />
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="subtitle1"
          sx={{ mt: 2, mb: 1, fontWeight: "medium" }}
        >
          Color
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={color} onChange={handleColorChange}>
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
        <Divider sx={{ my: 2 }} />
      </Collapse>
    </FilterContainer>
  );
};

export default CategoryFilter;
