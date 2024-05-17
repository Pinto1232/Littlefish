import React, { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormControl,
  Collapse,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
  RadioGroup,
  Divider,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import ElectronicsIcon from "@mui/icons-material/ElectricalServices";
import BookIcon from "@mui/icons-material/Book";
import ClothingIcon from "@mui/icons-material/Checkroom";
import { CategoryFilterProps } from "./CategoryFilter.types";

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilter,
  onPriceChange,
  onColorChange,
  onSizeChange,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Categories");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [color, setColor] = useState<string>("all");
  const [size, setSize] = useState<string>("all");
  const [open, setOpen] = useState(true);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
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

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
    onSizeChange(event.target.value);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "All":
        return <AllInclusiveIcon sx={{ mr: 1 }} />;
      case "Electronics":
        return <ElectronicsIcon sx={{ mr: 1 }} />;
      case "Books":
        return <BookIcon sx={{ mr: 1 }} />;
      case "Clothing":
        return <ClothingIcon sx={{ mr: 1 }} />;
      default:
        return <CategoryIcon sx={{ mr: 1 }} />;
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
    <Box sx={{ p: 3, mt: 2, borderRadius: 2, boxShadow: 2, width: 320 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FilterListIcon sx={{ mr: 1 }} /> Filter
        </Typography>
        <IconButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "medium" }}>
          Category
        </Typography>
        <FormControl fullWidth>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              mb: 2,
              borderRadius: 1,
              borderColor: "primary.main",
              "& .MuiSelect-select": { padding: "10px" },
            }}
          >
            <MenuItem value="Categories" disabled>
              <CategoryIcon sx={{ mr: 1 }} />
              Categories
            </MenuItem>
            <MenuItem value="All">
              <AllInclusiveIcon sx={{ mr: 1 }} />
              All
            </MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {getCategoryIcon(category)}
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="subtitle1"
          sx={{ mt: 2, mb: 1, fontWeight: "medium" }}
        >
          Price
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{ mb: 2 }}
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
            <FormControlLabel value="all" control={<Checkbox />} label="All" />
            <FormControlLabel
              value="red"
              control={getColorCheckbox("red")}
              label="Red"
            />
            <FormControlLabel
              value="blue"
              control={getColorCheckbox("blue")}
              label="Blue"
            />
            <FormControlLabel
              value="green"
              control={getColorCheckbox("green")}
              label="Green"
            />
          </RadioGroup>
        </FormControl>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="subtitle1"
          sx={{ mt: 2, mb: 1, fontWeight: "medium" }}
        >
          Size
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={size} onChange={handleSizeChange}>
            <FormControlLabel value="all" control={<Checkbox />} label="All" />
            <FormControlLabel
              value="small"
              control={<Checkbox />}
              label="Small"
            />
            <FormControlLabel
              value="medium"
              control={<Checkbox />}
              label="Medium"
            />
            <FormControlLabel
              value="large"
              control={<Checkbox />}
              label="Large"
            />
          </RadioGroup>
        </FormControl>
      </Collapse>
    </Box>
  );
};

export default CategoryFilter;
