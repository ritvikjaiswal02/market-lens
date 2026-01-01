import { Search, Bell, User, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-semibold">Market Lens</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <span className="hover:text-primary cursor-pointer">Dashboard</span>
          <span className="hover:text-primary cursor-pointer">Markets</span>
          <span className="hover:text-primary cursor-pointer">Portfolio</span>
          <span className="hover:text-primary cursor-pointer">Watchlist</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border">
            <Search className="w-4 h-4" />
            <input
              placeholder="Search assets..."
              className="bg-transparent text-sm outline-none w-40"
            />
          </div>

          <Bell className="w-5 h-5 cursor-pointer" />

          <Link to="/auth">
            <User className="w-5 h-5 cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
