import React from "react";
import { Grid, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WebIcon from "@mui/icons-material/Web";
import {
  MegaMenuContainer,
  CategoryTitle,
  StyledListItem,
  StyledListItemText,
} from "./MegaMenuStyles";

interface Link {
  name: string;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  links: Link[];
}

const categories: Category[] = [
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

const MegaMenu: React.FC<{ open: boolean }> = React.memo(({ open }) => {
  const theme = useTheme();

  return (
    <MegaMenuContainer theme={theme} className={open ? "open" : ""}>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={3} key={category.title}>
            <CategoryTitle variant="h6" aria-label={category.title}>
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
});

const MemoizedMegaMenu = React.memo(MegaMenu);
export default MemoizedMegaMenu;

