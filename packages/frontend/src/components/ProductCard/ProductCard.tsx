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
  maxWidth: 300, // Reduced maxWidth
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(1), // Add margin to control spacing
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const ImageWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  paddingTop: '75%', // 4:3 aspect ratio
  overflow: 'hidden',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
});

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
      <ImageWrapper>
        <MotionImg
          src={image}
          alt={name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            cursor: 'pointer'
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
      </ImageWrapper>
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
        <Button
          variant="outlined"
          size="small"
          sx={{
            width: "120px", 
            borderRadius: "50px",
            backgroundColor: "white",
            color: "black",
            borderColor: "black",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          Add to Cart
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            width: "100px", 
            borderRadius: "50px",
            backgroundColor: "black",
            color: "white",
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