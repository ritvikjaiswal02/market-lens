import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/useAuth";
import { searchCoins, getMarketData } from "../services/coingecko";
import PriceChart from "../components/PriceChart";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [prices, setPrices] = useState([]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [quantity, setQuantity] = useState("");

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [history, setHistory] = useState([]);
  const fetchWatchlist = async () => {
    const res = await api.get("/watchlist");
    setWatchlist(res.data);
  };

  const fetchPortfolio = async () => {
    const res = await api.get("/portfolio");
    setPortfolio(res.data);
  };
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const profileRes = await api.get("/user/profile");
        const watchlistRes = await api.get("/watchlist");
        const portfolioRes = await api.get("/portfolio");

        setProfile(profileRes.data);
        setWatchlist(watchlistRes.data);
        setPortfolio(portfolioRes.data);
      } catch (err) {
        console.error("Initial load failed", err);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        const data = await searchCoins(query);
        setResults(data);
      } else setResults([]);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const ids = [
      ...new Set([
        ...watchlist.map((c) => c.coinId),
        ...portfolio.map((p) => p.coinId),
      ]),
    ];
    if (ids.length === 0) return;
    getMarketData(ids).then((data) => setPrices(data || []));
  }, [watchlist, portfolio]);
  /* ---------------- ACTIONS ---------------- */

  const addToWatchlist = async (coin) => {
    await api.post("/watchlist", {
      coinId: coin.id,
      coinName: coin.name,
    });
    setQuery("");
    setResults([]);
    fetchWatchlist();
  };

  const removeFromWatchlist = async (coinId) => {
    await api.delete(`/watchlist/${coinId}`);
    fetchWatchlist();
  };

  const addToPortfolio = async (coin) => {
    if (!quantity) return;

    await api.post("/portfolio", {
      coinId: coin.id,
      quantity: Number(quantity),
    });

    setQuantity("");
    fetchPortfolio();
  };

  const removeFromPortfolio = async (coinId) => {
    await api.delete(`/portfolio/${coinId}`);
    fetchPortfolio();
  };

  const fetchHistory = async (coinId) => {
    setSelectedCoin(coinId);
    setHistory([]);
    try {
      const res = await api.get(`/market/history/${coinId}`, {
        params: { days: 7 },
      });
      if (Array.isArray(res.data)) setHistory(res.data);
    } catch {
      setHistory([]);
    }
  };

  const getPrice = (id) => prices.find((p) => p.id === id)?.current_price || 0;

  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.quantity * getPrice(item.coinId),
    0
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Market Lens</h1><p className="text-sm text-zinc-400">
  Real-time digital asset tracking
</p>

          {profile && <p className="text-sm text-zinc-400">{profile.email}</p>}
        </div>
       <button
  onClick={() => {
    logout();
    navigate("/login");
  }}
  className="px-4 py-2 rounded-lg text-sm 
             bg-zinc-800 text-zinc-200 
             hover:bg-zinc-700 hover:text-white
             transition"
>
  Log out
</button>

      </div>

      {/* Search Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8 relative">
        <h2 className="font-medium mb-3">Search Assets</h2>

        <div className="grid md:grid-cols-2 gap-3">
          <input
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Search coin (Bitcoin, Solana...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <input
            type="number"
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-green-500"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {results.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-zinc-900 border border-zinc-800 rounded-lg mt-2 z-20 max-h-60 overflow-auto">
            {results.map((coin) => (
              <div
                key={coin.id}
                className="px-4 py-3 hover:bg-zinc-800 flex justify-between items-center"
              >
                <span>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </span>
                <div className="space-x-3 text-sm">
                  <button
                    className="text-blue-400"
                    onClick={() => addToWatchlist(coin)}
                  >
                    Watch
                  </button>
                  <button
                    className="text-green-400"
                    onClick={() => addToPortfolio(coin)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Watchlist */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="font-medium mb-4">Watchlist</h2>
          {watchlist.length === 0 && (
            <p className="text-sm text-zinc-500">No assets tracked</p>
          )}
          {watchlist.map((item) => {
            const price = prices.find((p) => p.id === item.coinId);
            return (
              <div
                key={item._id}
                className="flex justify-between py-3 border-b border-zinc-800 last:border-0"
              >
                <div>
                  <p
                    className="cursor-pointer hover:underline"
                    onClick={() => fetchHistory(item.coinId)}
                  >
                    {item.coinName}
                  </p>
                  {price && (
                    <p className="text-sm text-zinc-400">
                      ${price.current_price}
                    </p>
                  )}
                </div>
                <button
                  className="text-sm text-red-400"
                  onClick={() => removeFromWatchlist(item.coinId)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        {/* Portfolio */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="font-medium mb-1">Portfolio</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Total Value: ${totalValue.toFixed(2)}
          </p>

          {portfolio.length === 0 && (
            <p className="text-sm text-zinc-500">No holdings yet</p>
          )}

          {portfolio.map((item) => {
            const price = getPrice(item.coinId);
            return (
              <div
                key={item._id}
                className="flex justify-between py-3 border-b border-zinc-800 last:border-0"
              >
                <div>
                  <p
                    className="cursor-pointer hover:underline"
                    onClick={() => fetchHistory(item.coinId)}
                  >
                    {item.coinId.toUpperCase()}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {item.quantity} × ${price}
                  </p>
                </div>
                <button
                  className="text-sm text-red-400"
                  onClick={() => removeFromPortfolio(item.coinId)}
                >
                  Sell
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      {selectedCoin && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-10">
          <h2 className="mb-4 font-medium">
            {selectedCoin.toUpperCase()} — 7 Day Trend
          </h2>
          {history.length > 0 ? (
            <PriceChart key={selectedCoin} prices={history} />
          ) : (
            <p className="text-sm text-zinc-500">Loading chart…</p>
          )}
        </div>
      )}
    </div>
  );
}
