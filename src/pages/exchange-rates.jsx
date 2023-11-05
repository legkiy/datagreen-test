import { Helmet } from 'react-helmet-async';

import ExchangeRatesView from 'src/sections/ExchangeRates/view/exchange-rates-view';

const ExchangeRates = () => (
  <>
    <Helmet>
      <title>Exchange Rates</title>
    </Helmet>
    <ExchangeRatesView />
  </>
);
export default ExchangeRates;
