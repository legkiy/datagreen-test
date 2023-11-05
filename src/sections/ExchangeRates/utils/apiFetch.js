import { baseFetch } from './baseFetch';
import { coinsUuidList, coinrankingApi } from './apiRoutes';

class ApiFetch {
  static async get(url) {
    return (await baseFetch(url, 'GET')).json();
  }

  static async getCoinsList() {
    const res = await baseFetch(coinrankingApi.coinList, 'GET', {
      'x-access-token': coinrankingApi.API_KEY,
    });
    return res.json();
  }

  static async getBtcRate(timePeriod) {
    const res = await baseFetch(coinrankingApi.coinHistory(coinsUuidList.BTC, timePeriod), 'GET', {
      'x-access-token': coinrankingApi.API_KEY,
    });
    return res.json();
  }

  static async getEthRate(timePeriod) {
    const res = await baseFetch(coinrankingApi.coinHistory(coinsUuidList.ETH, timePeriod), 'GET', {
      'x-access-token': coinrankingApi.API_KEY,
    });
    return res.json();
  }
}

export default ApiFetch;
