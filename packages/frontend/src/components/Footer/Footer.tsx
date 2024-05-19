import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Email as EmailIcon } from "@mui/icons-material";
import {
  TikTokIcon,
  AmazonIcon,
  JcbIcon,
  VisaIcon,
  ApplePayIcon,
  MasterCardIcon,
  PayPalIcon,
} from "./Icons";

const Footer = () => {
  return (
    <Box
      sx={{ backgroundColor: "#111", color: "#fff", padding: "40px 20px" }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <SignUpSection />
            <SocialMediaLinks />
            <Typography variant="body2">
              &copy; 2024, LittleFish. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <FooterLinkSection
              title="ABOUT US"
              links={["Our Story", "Made with Care", "Blog"]}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FooterLinkSection
              title="ASSISTANCE"
              links={["Terms & Conditions", "Privacy Policy", "Accessibility"]}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FooterLinkSection
              title="BOUTIQUES"
              links={["Find a store", "Book a free eye test"]}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <PaymentIcons />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const SignUpSection = () => (
  <>
    <Typography variant="h6" gutterBottom>
      SIGN UP FOR 10% OFF
    </Typography>
    <Typography variant="body2" gutterBottom>
      Subscribe to get special offers & once-in-a-lifetime deals.
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <TextField
        variant="outlined"
        placeholder="Enter your e-mail"
        size="small"
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "0px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ccc" },
            "&:hover fieldset": { borderColor: "#888" },
            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
          },
          "& .MuiInputBase-input": { padding: "10px 12px" },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: "10px 16px",
          minWidth: "auto",
          "&:hover": { backgroundColor: "#1565c0" },
          borderRadius: 0,
        }}
      >
        <EmailIcon />
      </Button>
    </Box>
  </>
);

const SocialMediaLinks = () => (
  <Box sx={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
    <Link href="#" color="inherit">
      <InstagramIcon />
    </Link>
    <Link href="#" color="inherit">
      <TikTokIcon />
    </Link>
    <Link href="#" color="inherit">
      <FacebookIcon />
    </Link>
    <Link href="#" color="inherit">
      <PayPalIcon />
    </Link>
  </Box>
);

const FooterLinkSection = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => (
  <>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {links.map((link, index) => (
      <Link key={index} href="#" color="inherit" display="block" gutterBottom>
        {link}
      </Link>
    ))}
  </>
);

const PaymentIcons = () => (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    <AmazonIcon sx={{ width: 40, height: 24 }} />
    <JcbIcon sx={{ width: 40, height: 24 }} />
    <VisaIcon sx={{ width: 40, height: 24 }} />
    <ApplePayIcon sx={{ width: 40, height: 24 }} />
    <MasterCardIcon sx={{ width: 40, height: 24 }} />
  </Box>
);

export default Footer;
