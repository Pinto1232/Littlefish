import React, { useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TablePagination,
  CssBaseline,
  TableContainer,
  Button,
} from "@mui/material";
import { Product } from "../products/types/product.types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateProduct from "./CreateProduct";
import { useGetProductsQuery, useDeleteProductMutation } from "../api/apiSlice";
import { useStyles } from "./ProductList.style";
import Footer from "../../components/Footer/Footer";
import DashboardLayout from "../../components/DashboardDrawer/DashboardLayout";
import { SwitchProps } from "@mui/material/Switch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const ProductList: React.FC = () => {
  const classes = useStyles();
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [productToView, setProductToView] = useState<Product | null>(null);
  const [, setProductsState] = useState<Product[]>([]);

  console.log("Product list", products);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleRemove = (id: string) => {
    confirmAlert({
      title: "Confirm to remove",
      message: "Are you sure you want to remove this product?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteProduct(id).unwrap();
              toast.success("Product removed successfully");
              refetch();
            } catch (error) {
              toast.error("Failed to remove product");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    productId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setIsDialogOpen(true);
    handleMenuClose();
  };

  const handleCreateClick = () => {
    setProductToEdit(null);
    setIsDialogOpen(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setProductToEdit(null);
  };

  const handleViewClick = (product: Product) => {
    setProductToView(product);
    setIsViewModalOpen(true);
    handleMenuClose();
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setProductToView(null);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStockToggle = (productId: string) => {
    setProductsState((prevProducts: Product[]) => {
      return prevProducts.map((product: Product) =>
        product._id === productId
          ? { ...product, stock: (product.stock ?? 0) > 0 ? 0 : 1 }
          : product
      );
    });
  };

  const getSwitchProps = (
    product: Product
  ): { checked: boolean; color: SwitchProps["color"]; label: string } => {
    const stock = product.stock ?? 0;
    return {
      checked: stock > 0,
      color: stock > 0 ? "success" : "error",
      label: stock > 0 ? "Yes" : "No",
    };
  };

  if (isLoading) return <CircularProgress />;

  if (error) {
    let errorMessage = "Unknown error";
    if ("status" in error) {
      errorMessage = `Error: ${error.status}`;
    } else if ("message" in error) {
      errorMessage = (error as { message: string }).message;
    } else if ("error" in error) {
      errorMessage = (error as { error: string }).error;
    }
    return <div>{errorMessage}</div>;
  }

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999, // Ensure it is above other elements
        }}
      >
        <ToastContainer />
      </Box>
      <Paper style={{ width: "100%" }}>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isUpdating ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className={classes.progressContainer}>
                      <CircularProgress />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                products
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product: Product) => {
                    // Simulate out of stock for a specific product
                    const simulatedProduct = {
                      ...product,
                      stock:
                        product._id === "specificProductId" ? 0 : product.stock,
                    };
                    const switchProps = getSwitchProps(simulatedProduct);
                    return (
                      <TableRow key={simulatedProduct._id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Box display="flex" alignItems="center">
                            {simulatedProduct.imageUrl && (
                              <img
                                src={simulatedProduct.imageUrl}
                                alt={simulatedProduct.name}
                                className={classes.productImage}
                              />
                            )}
                            <Box>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {simulatedProduct.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {simulatedProduct.description}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{simulatedProduct.category.name}</TableCell>

                        <TableCell>
                          <Switch
                            checked={switchProps.checked}
                            color={switchProps.color}
                            onChange={() =>
                              handleStockToggle(simulatedProduct._id)
                            }
                          />
                          {switchProps.checked ? (
                            <CheckCircleIcon
                              sx={{ color: "green", marginLeft: 1 }}
                            />
                          ) : (
                            <CancelIcon sx={{ color: "red", marginLeft: 1 }} />
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                switchProps.color === "success"
                                  ? "green"
                                  : "red",
                              display: "inline",
                              marginLeft: 1,
                            }}
                          >
                            {switchProps.label}
                          </Typography>
                        </TableCell>
                        <TableCell>{simulatedProduct.price}</TableCell>
                        <TableCell>
                          {simulatedProduct.attributes[0].value}
                        </TableCell>
                        <TableCell className={classes.actions}>
                          <IconButton
                            className={classes.menuButton}
                            onClick={(event) =>
                              handleMenuClick(event, simulatedProduct._id)
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={
                              Boolean(anchorEl) &&
                              selectedProduct === simulatedProduct._id
                            }
                            onClose={handleMenuClose}
                          >
                            <MenuItem
                              onClick={() => handleViewClick(simulatedProduct)}
                            >
                              <VisibilityIcon /> View
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleEditClick(simulatedProduct)}
                            >
                              <EditIcon /> Edit
                            </MenuItem>
                            <MenuItem onClick={handleCreateClick}>
                              <EditIcon /> Create
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleRemove(simulatedProduct._id)}
                            >
                              <DeleteIcon /> Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {products && products.length > 4 && (
          <TablePagination
            rowsPerPageOptions={[4, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-toolbar": {
                backgroundColor: "#f5f5f5",
                color: "#333",
                height: "56px",
              },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                {
                  margin: "0 8px",
                },
              ".MuiTablePagination-actions": {
                marginRight: "8px",
              },
            }}
          />
        )}
      </Paper>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <CreateProduct
            product={productToEdit}
            onClose={handleDialogClose}
            setIsUpdating={setIsUpdating}
            refetch={refetch}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isViewModalOpen}
        onClose={handleViewModalClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {productToView && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                padding: 3,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                gap: 2,
                boxShadow: 3,
              }}
            >
              {productToView.imageUrl && (
                <Box
                  component="img"
                  src={productToView.imageUrl}
                  alt={productToView.name}
                  sx={{
                    flex: 1,
                    maxWidth: { xs: "100%", md: "50%" },
                    height: { xs: "auto", md: "100%" },
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 3,
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              )}
              <Box
                sx={{
                  flex: 1,
                  padding: 3,
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    color: "#333",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  {productToView.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    marginBottom: 2,
                    color: "#333",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  KES {productToView.price}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginBottom: 2, color: "#555" }}
                >
                  {productToView.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Category:</strong> {productToView.category.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Brand:</strong> {productToView.brand}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Stock:</strong> {productToView.stock}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Warranty:</strong> {productToView.warranty}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Manufacturer:</strong> {productToView.manufacturer}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Dimensions:</strong>{" "}
                  {productToView.dimensions?.length ?? "N/A"} x{" "}
                  {productToView.dimensions?.width ?? "N/A"} x{" "}
                  {productToView.dimensions?.height ?? "N/A"} inches
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Weight:</strong> {productToView.weight} lbs
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Attributes:</strong>
                  <ul>
                    {productToView.attributes.map((attr) => (
                      <li key={attr._id}>
                        {attr.name}: {attr.value}
                      </li>
                    ))}
                  </ul>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Tags:</strong>{" "}
                  {productToView?.tags?.join(", ") || "No tags available"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, color: "#777" }}
                >
                  <strong>Reviews:</strong>
                  <ul>
                    {productToView?.reviews?.length ? (
                      productToView.reviews.map((review) => (
                        <li key={review._id}>
                          {review.user}: {review.comment}
                        </li>
                      ))
                    ) : (
                      <li>No reviews available</li>
                    )}
                  </ul>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ marginRight: 2, color: "#777" }}
                  >
                    <strong>Quantity:</strong>
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: 1,
                      padding: "0 8px",
                    }}
                  >
                    <Button>-</Button>
                    <Typography variant="body2" sx={{ margin: "0 8px" }}>
                      1
                    </Typography>
                    <Button>+</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <CssBaseline />
      <DashboardLayout />
      <Footer />
    </>
  );
};

const MemoizedProductList = React.memo(ProductList);
export default MemoizedProductList;
