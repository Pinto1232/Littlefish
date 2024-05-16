export interface UserMenuProps {
    anchorEl: HTMLDivElement | null;
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleClose: () => void;
    handleLoginClick: () => void;
    handleRegisterClick: () => void;
  }
  
  export interface CartDrawerProps {
    drawerOpen: boolean;
    toggleDrawer: (
      open: boolean
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  }