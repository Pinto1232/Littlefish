import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ProductModalProps} from "./ProductModal.types"
import {style} from './ProductModal.styles';




const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  product,
}) => {
  const [size, setSize] = useState<string | null>("6");

  const handleSizeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSize: string | null
  ) => {
    setSize(newSize);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.name,
                  isFluidWidth: true,
                  src: product.image,
                },
                largeImage: {
                  src: product.image,
                  width: 1200,
                  height: 1400,
                },
                enlargedImageContainerStyle: { zIndex: 1500 },
              }}
            />
            <Box sx={{ marginTop: 2, cursor: "pointer" }}>
              <Slider {...settings}>
                <Box sx={{ marginRight: 2 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%" }}
                    loading="lazy"
                  />
                </Box>
                <Box sx={{ marginRight: 2 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%" }}
                    loading="lazy"
                  />
                </Box>
                <Box>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%" }}
                    loading="lazy"
                  />
                </Box>
              </Slider>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="text.secondary">
              {product.category.name}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {product.name}
            </Typography>
            <Typography variant="h5" color="text.primary" sx={{ mt: 1 }}>
              R{product.price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              R130
            </Typography>
            <div style={{ marginTop: 16 }}>
              <Slider {...settings}>
                <Box>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%"}}
                    loading="lazy"
                  />
                </Box>
                <Box>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%"}}
                    loading="lazy"
                  />
                </Box>
                <Box>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%"}}
                    loading="lazy"
                  />
                </Box>
              </Slider>
            </div>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Select Size
            </Typography>
            <ToggleButtonGroup
              value={size}
              exclusive
              onChange={handleSizeChange}
              aria-label="text alignment"
              sx={{ mt: 1 }}
            >
              <ToggleButton value="5">5</ToggleButton>
              <ToggleButton value="5.5">5.5</ToggleButton>
              <ToggleButton value="6">6</ToggleButton>
              <ToggleButton value="6.5">6.5</ToggleButton>
              <ToggleButton value="7">7</ToggleButton>
              <ToggleButton value="7.5">7.5</ToggleButton>
              <ToggleButton value="8">8</ToggleButton>
              <ToggleButton value="8.5">8.5</ToggleButton>
              <ToggleButton value="9">9</ToggleButton>
              <ToggleButton value="9.5">9.5</ToggleButton>
            </ToggleButtonGroup>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              DESCRIPTION
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
              Where the original 574’s go-anywhere versatility was the result of
              a design that blended road and trail features, the 57/40 combines
              the familiar with a series of exaggerated features inspired by the
              bold technical running designs of the `80s and `90s.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, bgcolor: "black" }}
              fullWidth
              onClick={onClose}
            >
              Add to Bag
            </Button>
  
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProductModal;
