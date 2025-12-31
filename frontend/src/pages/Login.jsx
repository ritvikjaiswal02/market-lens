import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch  {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 text-white px-4">
      <div className="w-full max-w-md bg-zinc-900/70 backdrop-blur border border-zinc-800 rounded-2xl p-8 shadow-xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back to Market Lens
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Sign in to your market dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-zinc-900 font-medium rounded-lg py-2 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-zinc-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-teal-400 hover:text-teal-300">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
