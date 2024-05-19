import React, { useState } from "react";
import {
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CategoryFilterProps } from "./CategoryFilter.types";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import {
  FilterContainer,
  HeaderBox,
  FilterTitle,
  IconButtonStyle,
} from "./CategoryFilter.styles";
import CategorySelect from "./CategorySelect";
import PriceSlider from "./PriceSlider";
import DimensionSliders from "./DimensionSliders";
import ColorRadioGroup from "./ColorRadioGroup";
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
type ErrorData = FetchBaseQueryError | SerializedError;

function hasMessage(data: ErrorData): data is { message: string } {
  if ('data' in data && typeof (data as FetchBaseQueryError).data === 'object' && data.data !== null) {
    return typeof (data.data as { message?: string }).message === 'string';
  }
  return typeof (data as SerializedError).message === 'string';
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'data' in error;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilter,
  onPriceChange,
  onColorChange,
  onDimensionChange,
}) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("Categories");
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

  const { data: products, error, isLoading } = useGetProductsQuery();
  console.log("Category Filter ", products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    let errorMessage: string;
  
    if (isFetchBaseQueryError(error) && hasMessage(error)) {
      errorMessage = (error.data as { message: string }).message || "An unknown error occurred";
    } else if ((error as SerializedError).message) {
      errorMessage = (error as SerializedError).message || "An unknown error occurred";
    } else {
      errorMessage = "An unknown error occurred";
    }
  
    return <div>Error: {errorMessage}</div>;
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilter(category);
  };

  const handlePriceChange = (newValue: number[]) => {
    setPriceRange(newValue);
    onPriceChange(newValue);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onColorChange(newColor);
  };

  const handleDimensionChange = (dimension: string, newValue: number[]) => {
    setDimensionRange((prev) => ({
      ...prev,
      [dimension]: newValue,
    }));
    onDimensionChange(dimension, newValue);
  };

  const handleClick = () => {
    setOpen(!open);
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
        <CategorySelect
          theme={theme}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <Divider sx={{ my: 2 }} />
        <PriceSlider
          theme={theme}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
        />
        <Divider sx={{ my: 2 }} />
        <DimensionSliders
          theme={theme}
          dimensionRange={dimensionRange}
          onDimensionChange={handleDimensionChange}
        />
        <Divider sx={{ my: 2 }} />
        <ColorRadioGroup
          theme={theme}
          color={color}
          onColorChange={handleColorChange}
        />
        <Divider sx={{ my: 2 }} />
      </Collapse>
    </FilterContainer>
  );
};

export default CategoryFilter;