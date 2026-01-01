import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

export default function MarketStats({ global }) {
  if (!global) return null;

  const stats = [
    {
      label: "Market Cap",
      value: `$${(global.total_market_cap.usd / 1e12).toFixed(2)}T`,
      change: `${global.market_cap_change_percentage_24h_usd.toFixed(2)}%`,
      isPositive: global.market_cap_change_percentage_24h_usd >= 0,
      icon: DollarSign,
    },
    {
      label: "24h Volume",
      value: `$${(global.total_volume.usd / 1e9).toFixed(1)}B`,
      change: "",
      isPositive: true,
      icon: Activity,
    },
    {
      label: "BTC Dominance",
      value: `${global.market_cap_percentage.btc.toFixed(1)}%`,
      change: "",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      label: "Active Assets",
      value: global.active_cryptocurrencies.toLocaleString(),
      change: "",
      isPositive: true,
      icon: TrendingDown,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="glass rounded-xl p-5 glass-hover"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            {s.change && (
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  s.isPositive
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {s.change}
              </span>
            )}
          </div>

          <p className="text-2xl font-semibold text-foreground mb-1">
            {s.value}
          </p>
          <p className="text-sm text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
