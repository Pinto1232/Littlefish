import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CircularProgress,
} from "@mui/material";

interface DrawerItem {
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
}

interface DashboardDrawerProps {
  items: DrawerItem[];
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}

const DashboardDrawer: React.FC<DashboardDrawerProps> = ({
  items,
  isOpen,
  onClose,
  isLoading,
}) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List>
          {items.map((item, index) => (
            <ListItem button key={index} onClick={item.onClick}>
              <ListItemIcon>
                {isLoading && item.label === "Logout" ? (
                  <CircularProgress size={24} />
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  visibility:
                    isLoading && item.label === "Logout" ? "hidden" : "visible",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

const MemoizedDashboardDrawer = React.memo(DashboardDrawer);
export default MemoizedDashboardDrawer;

