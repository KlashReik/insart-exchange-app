import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: React.FC = () => (
  <Box marginTop="auto">
    <Container maxWidth="lg">
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography color="black" variant="h5">
            Insart Currency Exchange by Ivan Bulavko
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary" variant="subtitle1">
            {`${new Date().getFullYear()} | React | Material UI | Zustand | Typescript`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
