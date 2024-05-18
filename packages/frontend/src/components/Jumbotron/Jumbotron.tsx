import React, { useState } from "react";
import { Typography, TextField, Button, InputAdornment } from "@mui/material";
import {
  JumbotronContainer,
  OverlayText,
  SearchContainer,
} from "./Jumbotron.style";
import SearchIcon from "@mui/icons-material/Search";
import { JumbotronProps } from "./Jumbotron.types";

const Jumbotron: React.FC<JumbotronProps> = ({ backgroundImage, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the onSearch function on every change
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <JumbotronContainer style={{ backgroundImage: `url(${backgroundImage})` }}>
      <OverlayText variant="h1">Shop</OverlayText>
      <Typography variant="h2" component="h3" gutterBottom>
        Give All You Need
      </Typography>
      <SearchContainer>
        <TextField
          variant="outlined"
          placeholder="Search..."
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            marginBottom: { xs: 1, sm: 0 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              backgroundColor: "#f5f5f5",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "#ccc",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3f51b5",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "50px",
            padding: "10px 20px",
            marginLeft: { sm: 1, xs: 0 },
            marginTop: { xs: 1, sm: 0 },
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Search
        </Button>
      </SearchContainer>
    </JumbotronContainer>
  );
};

export default Jumbotron;
