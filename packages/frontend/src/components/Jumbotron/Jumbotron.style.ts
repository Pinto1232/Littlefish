import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const JumbotronContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%', 
  height: '46vh',
  marginBottom: theme.spacing(10),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  color: '#fff',
  textAlign: 'center',
}));

export const OverlayText = styled(Typography)(({ theme }) => ({
  fontSize: '10rem',
  fontWeight: 'bold',
  opacity: 0.1,
  [theme.breakpoints.down('sm')]: {
    fontSize: '5rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '3rem',
  },
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius * 4,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: '900px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));