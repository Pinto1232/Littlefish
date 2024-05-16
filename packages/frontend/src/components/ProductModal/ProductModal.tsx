import React from "react";
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

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    image: string;
    name: string;
    price: string;
    category: { name: string; description: string };
    rating: number;
    reviews: number;
  };
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  product,
}) => {
  const [size, setSize] = React.useState<string | null>("6");

  const handleSizeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSize: string | null
  ) => {
    setSize(newSize);
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
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={4}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
            </Grid>
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
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
            </Grid>
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
              sx={{ mt: 2 }}
              fullWidth
              onClick={onClose}
            >
              Add to Bag
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              fullWidth
              onClick={onClose}
            >
              Favorites
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProductModal;
