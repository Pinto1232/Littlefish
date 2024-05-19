import React from "react";
import { FormControl, MenuItem, Typography } from "@mui/material";
import { StyledSelect } from "./CategoryFilter.styles";
import {
  ViewList as ViewListIcon,
  Devices as DevicesIcon,
  DriveEta as DriveEtaIcon,
  ChildFriendly as ChildFriendlyIcon,
  Style as StyleIcon,
  Fastfood as FastfoodIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { Theme } from "@mui/material/styles";

interface CategorySelectProps {
  theme: Theme;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "All":
      return <ViewListIcon />;
    case "Electronics":
      return <DevicesIcon />;
    case "Cars":
      return <DriveEtaIcon />;
    case "Baby":
      return <ChildFriendlyIcon />;
    case "Food":
      return <FastfoodIcon />;
    case "Fashion & Apparel":
      return <StyleIcon />;
    default:
      return <DashboardIcon />;
  }
};

const CategorySelect: React.FC<CategorySelectProps> = ({
  theme,
  categories,
  selectedCategory,
  onCategoryChange,
}) => (
  <FormControl fullWidth>
    <StyledSelect
      theme={theme}
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value as string)}
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
);

const MemoizedCategorySelect = React.memo(CategorySelect);
export default MemoizedCategorySelect;
