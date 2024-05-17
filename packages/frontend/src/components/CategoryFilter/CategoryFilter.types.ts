
export interface CategoryFilterProps {
    categories: string[];
    onFilter: (category: string) => void;
    onPriceChange: (priceRange: number[]) => void;
    onColorChange: (color: string) => void;
    onSizeChange: (size: string) => void;
  }