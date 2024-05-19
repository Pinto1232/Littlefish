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

const ProductList: React.FC = () => {
  const classes = useStyles();
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();
  console.log("Product list: ", products);

  const [deleteProduct] = useDeleteProductMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      <ToastContainer />
      <Paper style={{ width: "100%" }}>
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
                .map((product: Product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Box display="flex" alignItems="center">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className={classes.productImage}
                          />
                        )}
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {product.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>
                      <Switch className={classes.switch} />
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.attributes[0].value}</TableCell>
                    <TableCell className={classes.actions}>
                      <IconButton
                        className={classes.menuButton}
                        onClick={(event) => handleMenuClick(event, product._id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={
                          Boolean(anchorEl) && selectedProduct === product._id
                        }
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleMenuClose}>
                          <VisibilityIcon /> View
                        </MenuItem>
                        <MenuItem onClick={() => handleEditClick(product)}>
                          <EditIcon /> Edit
                        </MenuItem>
                        <MenuItem onClick={handleCreateClick}>
                          <EditIcon /> Create
                        </MenuItem>
                        <MenuItem onClick={() => handleRemove(product._id)}>
                          <DeleteIcon /> Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
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
      <CssBaseline />
      <DashboardLayout />
         <Footer />
    </>
  );
};

const MemoizedProductList = React.memo(ProductList);
export default MemoizedProductList;

