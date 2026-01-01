import { Star, TrendingUp, TrendingDown } from "lucide-react";

const AssetCard = ({
  symbol,
  name,
  price,
  change,
  isPositive,
  marketCap,
  volume,
  sparkline = [30, 45, 28, 50, 35, 55, 42, 60, 48, 65],
  rank,
}) => {
  const minVal = Math.min(...sparkline);
  const maxVal = Math.max(...sparkline);
  const range = maxVal - minVal || 1;

  const points = sparkline
    .map((val, i) => {
      const x = (i / (sparkline.length - 1)) * 100;
      const y = 100 - ((val - minVal) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="glass rounded-xl p-5 glass-hover group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-sm font-bold text-primary">
            {symbol.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{symbol}</h3>
              <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                #{rank}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary">
          <Star className="w-5 h-5" />
        </button>
      </div>

      <div className="h-12 mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient
              id={`gradient-${symbol}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopOpacity="0.3" />
              <stop offset="100%" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            fill={`url(#gradient-${symbol})`}
            points={`0,100 ${points} 100,100`}
          />
          <polyline
            fill="none"
            strokeWidth="2"
            stroke={isPositive ? "#22c55e" : "#ef4444"}
            points={points}
          />
        </svg>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xl font-semibold">{price}</p>
          <div className="flex items-center gap-1 mt-1">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-500" />
            )}
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {change}
            </span>
          </div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>MCap: {marketCap}</p>
          <p>Vol: {volume}</p>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
