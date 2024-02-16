/* Axios API call */
import axios from 'axios';

const API_KEY = '1UVUE6HU00YE8N9X';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol) => {
  const params = {
    function: 'TIME_SERIES_DAILY',
    symbol: symbol,
    apikey: API_KEY,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data', error);
    throw error;
  }
};
/* End of Axios API call */
