import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  category: { name: string; description: string };
  rating: number;
  reviews: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const MotionImg = motion.img;

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  category,
  rating,
  reviews,
}) => {
  return (
    <StyledCard>
      <Box position="relative">
        <MotionImg
          src={image}
          alt={name}
          style={{
            height: 255,
            width: 255,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <Chip
          label={category.name}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <StarIcon fontSize="small" color="primary" />
          <Typography variant="body2" color="text.secondary" ml={0.5}>
            {rating} ({reviews} Reviews)
          </Typography>
        </Box>
        <Typography variant="h6" color="text.primary">
          R{price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button variant="outlined" size="small">
          Add to Cart
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: "50px",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "darkgray", 
            },
          }}
        >
          Buy Now
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ProductCard;
