import { Eye } from "lucide-react";

const WatchlistPreview = () => {
  const list = ["BTC", "ETH", "XRP"];

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Eye />
        <h3 className="font-semibold">Watchlist</h3>
      </div>

      {list.map((coin) => (
        <div key={coin} className="py-2">
          {coin}
        </div>
      ))}
    </div>
  );
};

export default WatchlistPreview;
