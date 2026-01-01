import { Flame } from "lucide-react";

export default function TrendingList({ data = [] }) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <Flame className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Trending Now</h3>
      </div>

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground">No trending data</p>
      )}

      <div className="space-y-3">
        {data.map((coin, index) => (
          <div
            key={coin.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition cursor-pointer"
          >
            <span className="text-xs text-muted-foreground w-4">
              {index + 1}
            </span>

            <img
              src={coin.thumb}
              alt={coin.name}
              className="w-6 h-6 rounded-full"
            />

            <div>
              <p className="text-sm font-medium text-foreground">
                {coin.symbol.toUpperCase()}
              </p>
              <p className="text-xs text-muted-foreground">{coin.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
