import { Grid, Container, Typography } from '@mui/material';

import ChartContainer from '../components';

const ExchangeRatesView = () => (
  <Container maxWidth="xl">
    <Typography variant="h4" sx={{ mb: 5 }}>
      Exchange Rates
    </Typography>
    <Grid container width="100%" gap={2}>
      <ChartContainer />
    </Grid>
  </Container>
);
export default ExchangeRatesView;
