import { CurrencyExchange } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Header: React.FC = () => (
  <Box height="100px" width="100%" maxWidth="lg">
    <AppBar position="static" color="default">
      <Toolbar>
        <CurrencyExchange />
        <Typography flexGrow="1" variant="h6" paddingLeft="12px">
          Insart Currency Exchange
        </Typography>
        <Typography color="inherit">Exchange now</Typography>
      </Toolbar>
    </AppBar>
  </Box>
);
