import { env } from 'environment/environment';

//COMPONENTS

export const FRACTAL_CHAOS = 'fractal-chaos';
export const ADMIN = 'admin';
export const WORK = 'work';
export const MARKET_DATA = 'market-data';
export const KLINE_DATA = 'kline-data/:type/:title/:timeframe';
export const TREND_DATA = 'trend-data';

//URLS
export const baseURL = env.baseURL;

export const FRACTAL_CHAOS_URLS = {
  h4: `${baseURL}/h4/fractal`,
  h1: `${baseURL}/h1/fractal`,
};

export const ALERTS_URLS = {
  alertsUrl: `${baseURL}/alerts`,
  alertsAddOneUrl: `${baseURL}/alerts/add/one`,
  alertsDeleteManyUrl: `${baseURL}/alerts/delete/many`,
  alertsUpdateOneUrl: `${baseURL}/alerts/update/one`,
  alertsMoveManyUrl: `${baseURL}/alerts/move/many`,
};

export const COINS_URLS = {
  coinsUrl: `${baseURL}/proxy-coins`,
  coinsRefreshUrl: `${baseURL}/proxy-coins/refresh`,
};

export const WORKING_COINS_URLS = {
  workingCoinsUrl: `${baseURL}/working-coins`,
  addWorkingCoinUrl: `${baseURL}/working-coins/add/one`,
  addWorkingCoinsUrl: `${baseURL}/working-coins/add/many`,
  updateWorkingCoinUrl: `${baseURL}/working-coins/update/one`,
  deleteWorkingCoinsUrl: `${baseURL}/working-coins/delete/many`,
};
