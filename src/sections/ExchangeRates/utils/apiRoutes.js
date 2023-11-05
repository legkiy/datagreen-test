export const coinrankingApi = {
  API_KEY: 'coinrankingb07b59dcbc391331d260cc84561089aead59b873cddef9d6',
  coinList: 'https://api.coinranking.com/v2/coins',
  coinHistory: (coinUuid, timePeriod) =>
    `https://api.coinranking.com/v2/coin/${coinUuid}/history?timePeriod=${timePeriod || '24h'}`,
};

export const coinsUuidList = {
  BTC: 'Qwsogvtv82FCd',
  ETH: 'razxDUgYGNAdQ',
};
