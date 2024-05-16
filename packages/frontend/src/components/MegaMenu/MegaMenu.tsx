import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { Theme, useTheme } from "@mui/material/styles";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WebIcon from "@mui/icons-material/Web";

const MegaMenuContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  position: "absolute",
  marginTop: 9,
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "90vw",
  backgroundColor: "white",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  zIndex: 900,
  transition: "opacity 0.3s ease, visibility 0.3s ease, max-height 0.3s ease",
  opacity: 0,
  visibility: "hidden",
  maxHeight: 0,
  overflow: "hidden",
  "&.open": {
    opacity: 1,
    visibility: "visible",
    maxHeight: "500px",
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  cursor: "pointer",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const categories = [
  {
    title: "Finance",
    icon: <AccountBalanceIcon sx={{ mr: 1 }} />,
    links: [
      { name: "Accounting" },
      { name: "Billing" },
      { name: "Expense" },
      { name: "Spreadsheets (BI)" },
      { name: "Documents" },
      { name: "Signature" },
    ],
  },
  {
    title: "Sales",
    icon: <StoreIcon sx={{ mr: 1 }} />,
    links: [
      { name: "CRM" },
      { name: "Sales" },
      { name: "Point of Sale - Shop" },
      { name: "Point of Sale - Restaurant" },
      { name: "Subscriptions" },
      { name: "Rental" },
    ],
  },
  {
    title: "Websites",
    icon: <WebIcon sx={{ mr: 1 }} />,
    links: [
      { name: "Website" },
      { name: "eCommerce" },
      { name: "Blog" },
      { name: "Forum" },
      { name: "Live Chat" },
      { name: "eLearning" },
    ],
  },
  {
    title: "Inventory & MRP",
    icon: <LocalShippingIcon sx={{ mr: 1 }} />,
    links: [
      { name: "Inventory" },
      { name: "Manufacturing" },
      { name: "PLM" },
      { name: "Purchases" },
      { name: "Maintenance" },
      { name: "Quality" },
    ],
  },
];

const MegaMenu: React.FC<{ open: boolean }> = ({ open }) => {
  const theme = useTheme();

  return (
    <MegaMenuContainer theme={theme} className={open ? "open" : ""}>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={3} key={category.title}>
            <CategoryTitle variant="h6">
              {category.icon} {category.title}
            </CategoryTitle>
            <List>
              {category.links.map((link) => (
                <StyledListItem key={link.name}>
                  <StyledListItemText primary={link.name} />
                </StyledListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </MegaMenuContainer>
  );
};

export default MegaMenu;
