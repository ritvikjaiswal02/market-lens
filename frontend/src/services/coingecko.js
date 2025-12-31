import api from "./api";

// Search coins (via backend)
export const searchCoins = async (query) => {
  if (!query) return [];
  const res = await api.get("/market/search", {
    params: { query },
  });
  return res.data;
};

// Get market prices (via backend)
export const getMarketData = async (coinIds) => {
  if (!coinIds.length) return [];
  const res = await api.get("/market/prices", {
    params: { ids: coinIds.join(",") },
  });
  return res.data;
};
