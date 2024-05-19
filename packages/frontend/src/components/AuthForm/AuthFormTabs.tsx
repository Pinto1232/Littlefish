import React from "react";
import { Tabs, Tab } from "@mui/material";

interface AuthFormTabsProps {
  tab: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const AuthFormTabs: React.FC<AuthFormTabsProps> = ({
  tab,
  handleTabChange,
}) => {
  return (
    <Tabs value={tab} onChange={handleTabChange} centered>
      <Tab label="User" />
      <Tab label="Register" />
    </Tabs>
  );
};

const MemoizedAuthFormTabs = React.memo(AuthFormTabs);
export default MemoizedAuthFormTabs;
