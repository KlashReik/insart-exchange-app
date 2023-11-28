import { Box, Typography, useMediaQuery } from "@mui/material";
import useSWR from "swr";
import { fetchCurrencyRates } from "./api/axiosService";
import { CurrencyTable, ExchangeContainer, Footer, Header } from "./components";
import useCurrencyStore from "./store/store";
import { Currency } from "./types/types";

function App() {
  const isTablet = useMediaQuery("(max-width:780px)");
  const currency = useCurrencyStore((state) => state.currencyArray);

  const setCurrency = useCurrencyStore((state) => state.setCurrencyArray);

  const { error } = useSWR<Currency[], Error>(
    "http://localhost:3000/exchange",
    fetchCurrencyRates,
    {
      onSuccess: (fetchedData) => {
        setCurrency(fetchedData);
      },
      shouldRetryOnError: false,
    }
  );

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="0 auto"
    >
      <Header />
      <Box textAlign="center" bgcolor="#F0F5FF" width="100%" height="400px">
        <Typography variant="h2" mb="16px">
          Currency Converter
        </Typography>
        <Typography variant="h6" mb="16px">
          Need to make an international business payment? Take a look at our
          live foreign exchange rates.
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        gap="32px"
        maxWidth="1200px"
        position="absolute"
        top="250px"
        bgcolor="white"
        border="1px solid lightgrey"
        borderRadius="10px"
        padding="10px 0"
        alignItems={isTablet ? "center" : "start"}
        flexDirection={isTablet ? "column" : "row"}
      >
        {error ? (
          <Box width="100%" margin="0 auto">
            <Typography variant="body1" color="error" textAlign="center">
              Sorry! An error occurred. Please try again.
            </Typography>
          </Box>
        ) : (
          <>
            <CurrencyTable data={currency as Currency[]} />
            <ExchangeContainer />
          </>
        )}
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
