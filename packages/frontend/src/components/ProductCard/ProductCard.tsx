import React, { useState } from "react";
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
import ProductModal from "../ProductModal/ProductModal";
import { useCart } from "../../Context/useCart";

interface ProductCardProps {
  id: string; // Changed to string to match _id type
  image: string;
  name: string;
  price: string;
  category: { name: string; description: string };
  description: string;
  rating?: number; 
  reviews?: number; 
  brand?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 300, 
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const ImageWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  paddingTop: "75%", 
  overflow: "hidden",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
});

const MotionImg = motion.img;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  category,
  rating,
  reviews,
  brand,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <StyledCard>
        <ImageWrapper>
          <MotionImg
            src={image}
            alt={name}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
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
            onClick={() =>
              addToCart({
                id,
                image,
                name,
                brand: brand ?? "", 
                price: Number(price),
                category,
                rating: rating ?? 0, 
                reviews: reviews ?? 0, 
                
                quantity: 1,
              })
            }
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
            onClick={handleOpenModal}
          >
            Buy Now
          </Button>
        </CardActions>
      </StyledCard>
      <ProductModal
        open={modalOpen}
        onClose={handleCloseModal}
        product={{
          image,
          name,
          price,
          category,
          rating: rating ?? 0, 
          reviews: reviews ?? 0, 
        }}
      />
    </>
  );
};

export default ProductCard;
