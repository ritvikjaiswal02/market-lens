import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        await login(email, password);
      } else {
        // REGISTER
        const res = await api.post("/auth/register", {
          name,
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#070B14] text-white">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#020617] to-black" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-semibold">Market Lens</span>
          </div>

          {/* Hero */}
          <div className="space-y-6">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Track Markets
              <br />
              <span className="text-teal-400">With Precision</span>
            </h1>

            <p className="text-zinc-400 max-w-md">
              Real-time data, powerful analytics, and personalized watchlists —
              all in one professional dashboard.
            </p>

            <ul className="space-y-3 text-sm text-zinc-400">
              <li>• Live price updates across global assets</li>
              <li>• Advanced portfolio insights</li>
              <li>• Smart watchlists & trends</li>
            </ul>
          </div>

          <p className="text-xs text-zinc-600">
            © 2025 Market Lens. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-teal-400" />
              <span className="font-semibold">Market Lens</span>
            </div>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-zinc-400">
              {isLogin
                ? "Sign in to access your dashboard"
                : "Start tracking markets like a pro"}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Toggle */}
          <div className="flex bg-zinc-900 p-1 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md text-sm transition ${
                isLogin
                  ? "bg-black text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md text-sm transition ${
                !isLogin
                  ? "bg-black text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-sm">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                  <input
                    className="w-full pl-10 pr-3 py-3 bg-zinc-900 rounded-lg outline-none border border-zinc-800 focus:border-teal-400"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-3 bg-zinc-900 rounded-lg outline-none border border-zinc-800 focus:border-teal-400"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-3 bg-zinc-900 rounded-lg outline-none border border-zinc-800 focus:border-teal-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-11 rounded-lg font-medium flex items-center justify-center gap-2 transition-all
                ${
                  loading
                    ? "bg-zinc-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-400 to-emerald-500 hover:opacity-90 text-black"
                }
              `}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-xs text-center text-zinc-500">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
