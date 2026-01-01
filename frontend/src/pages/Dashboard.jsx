import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

/* CoinGecko */
import {
  getGlobalStats,
  getTrending,
  getTopCoins,
  getHistory,
} from "../services/coingecko";

/* Loveable components */
import Header from "../components/Header";
import AssetCard from "../components/AssetCard";
import MarketStats from "../components/MarketStats";
import TrendingList from "../components/TrendingList";
import WatchlistPreview from "../components/WatchlistPreview";
import PriceChart from "../components/PriceChart";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [global, setGlobal] = useState(null);
  const [topCoins, setTopCoins] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [history, setHistory] = useState([]);

  /* ---------------- FETCH MARKET DATA ---------------- */

  /* ---------------- FETCH CHART ---------------- */
  const fetchHistory = async (coinId) => {
    setSelectedCoin(coinId);
    setHistory([]);

    try {
      const data = await getHistory(coinId, 7);
      setHistory(data || []);
    } catch {
      setHistory([]);
    }
  };

  /* ---------------- HELPERS ---------------- */
  const formatAsset = (coin) => ({
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    price: `$${coin.current_price.toLocaleString()}`,
    change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
    isPositive: coin.price_change_percentage_24h >= 0,
    marketCap: `$${(coin.market_cap / 1e9).toFixed(1)}B`,
    volume: `$${(coin.total_volume / 1e9).toFixed(1)}B`,
    rank: coin.market_cap_rank,
    sparkline: coin.sparkline_in_7d?.price?.slice(-10),
  });
  useEffect(() => {
    const load = async () => {
      try {
        const g = await getGlobalStats();
        const t = await getTrending();
        const coins = await getTopCoins();

        setGlobal(g);
        setTrending(t);
        setTopCoins(coins);
      } catch (err) {
        console.error("Dashboard load failed", err);
      }
    };

    load();
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-16">
        {/* Market Stats */}
        <section className="mb-10">
          <MarketStats global={global} />
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assets */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Tracked Assets</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topCoins.map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => fetchHistory(coin.id)}
                  className="cursor-pointer"
                >
                  <AssetCard {...formatAsset(coin)} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TrendingList data={trending} />

            <WatchlistPreview />
          </div>
        </div>

        {/* Chart */}
        {selectedCoin && (
          <div className="mt-12 glass rounded-xl p-6">
            <h3 className="font-semibold mb-4">
              {selectedCoin.toUpperCase()} · 7 Day Trend
            </h3>

            {history.length > 0 ? (
              <PriceChart prices={history} />
            ) : (
              <p className="text-sm text-muted-foreground">Loading chart…</p>
            )}
          </div>
        )}

        {/* Logout */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}
