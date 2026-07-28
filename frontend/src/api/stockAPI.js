import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const getStock = async (symbol) => {
  const { data } = await API.get(`/stock/${symbol}`);
  return data;
};

export const getPrediction = async (symbol) => {
  const { data } = await API.get(`/predict/${symbol}`);
  return data;
};

export const getRecommendation = async (symbol) => {
  const { data } = await API.get(`/recommendation/${symbol}`);
  return data;
};

export const getNews = async (symbol) => {
  const { data } = await API.get(`/news/${symbol}`);
  return data;
};

export const getHistory = async (symbol) => {
  const { data } = await API.get(`/history/${symbol}`);
  return data;
};

export const getStocks = async () => {
  const { data } = await API.get("/stocks");
  return data;
};

export default API;