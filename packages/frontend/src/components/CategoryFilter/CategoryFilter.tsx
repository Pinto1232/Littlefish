import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Collapse,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface CategoryFilterProps {
  categories: string[];
  onFilter: (category: string) => void;
  onPriceChange: (priceRange: number[]) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilter,
  onPriceChange,
  onColorChange,
  onSizeChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [color, setColor] = useState<string>('all');
  const [size, setSize] = useState<string>('all');
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

  return (
    <Box sx={{ p: 2, boxShadow: 2, mt: 1, borderRadius: 2, backgroundColor: 'white' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
          <FilterListIcon /> Filter
        </Typography>
        <IconButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Category
        </Typography>
        <FormControl fullWidth>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                <CategoryIcon sx={{ mr: 1 }} />
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
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
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Color
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={color} onChange={handleColorChange}>
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="red" control={<Radio />} label="Red" />
            <FormControlLabel value="blue" control={<Radio />} label="Blue" />
            <FormControlLabel value="green" control={<Radio />} label="Green" />
          </RadioGroup>
        </FormControl>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Size
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={size} onChange={handleSizeChange}>
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="small" control={<Radio />} label="Small" />
            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="large" control={<Radio />} label="Large" />
          </RadioGroup>
        </FormControl>
      </Collapse>
    </Box>
  );
};

export default CategoryFilter;