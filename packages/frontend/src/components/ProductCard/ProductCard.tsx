import React, { useState } from "react";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  motion,
  StarIcon,
  ProductModal,
  useCart,
  StyledCard,
  ImageWrapper,
} from "./ProductCardImports";
import { ProductCardProps } from "./ProductCardInterfaces";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const MotionImg = motion.img;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  category,
  rating,
  reviews = [],
  brand,
  description,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <StyledCard sx={{ margin: 2, padding: 2, boxShadow: 3, borderRadius: 1 }}>
        <ImageWrapper>
          <MotionImg
            src={image}
            alt={name}
            loading="lazy" 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "214px",
              objectFit: "contain",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <Chip
            label={category.name}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "blue",
              color: "#fff",
            }}
          />
        </ImageWrapper>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", fontSize: "1.2rem", mt: "-40px" }}
          >
            {name}
          </Typography>
          <Box display="flex" alignItems="center">
            <StarIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary" ml={0.5}>
              {rating} ({reviews.length} Reviews)
            </Typography>
          </Box>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
          >
            R{price}
          </Typography>
        </CardContent>

        <Box
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            p: "13px",
            borderRadius: "3px",
          }}
        >
          <Typography variant="body2" color="#fff" mt={1}>
            {description}
          </Typography>

          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                width: "120px",
                borderRadius: "50px",
                backgroundColor: "white",
                whiteSpace: "nowrap	",
                color: "black",
                borderColor: "black",
                display: "flex",
                fontSize: "12px",
                justifyContent: "center",
                px: "7px",
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
                  reviews: reviews.length ?? 0,
                  quantity: 1,
                })
              }
            >
              <ShoppingBasketIcon fontSize="small" sx={{ marginRight: 0.2 }} />
              Add to Cart
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                width: "100px",
                borderRadius: "50px",
                backgroundColor: "blue",
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
        </Box>
      </StyledCard>

      {/* Product Modal rendering */}
      <ProductModal
        open={modalOpen}
        onClose={handleCloseModal}
        product={{
          image,
          name,
          price: price.toString(),
          category,
          rating: rating ?? 0,
          reviews: reviews.length ?? 0,
        }}
      />
    </>
  );
};

const MemoizedProductCard = React.memo(ProductCard);
export default MemoizedProductCard;

