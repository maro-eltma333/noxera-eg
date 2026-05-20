import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Mail, Lock, User, AlertCircle, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { PasswordInput } from "../components/ui/password-input";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    // Simulate slight network delay
    setTimeout(() => {
      const result = register(name, email, password);
      setLoading(false);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-inter">
      {/* Left side: Image */}
      <div className="w-full lg:w-1/2 h-[35vh] lg:h-auto relative overflow-hidden shrink-0">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
          alt="Fashion Lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-16 text-white text-center">
          <div className="hidden lg:block" />
          <div className="mt-auto lg:mt-0">
            <h1 className="text-4xl lg:text-6xl font-oswald font-black uppercase tracking-tighter mb-2 lg:mb-6 leading-none">
              Join the <br className="hidden lg:block" /> Elite Club
            </h1>
            <p className="hidden lg:block text-xl opacity-90 max-w-sm mx-auto font-light">
              Get exclusive access to new arrivals, limited collections, and member-only events.
            </p>
          </div>
          <p className="hidden lg:block text-xs uppercase tracking-[0.2em] opacity-60 mt-4 lg:mt-0">Established 2026 • Premium Fashion</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex-1 flex items-center justify-center p-6 lg:p-8 bg-[#fbfbfb]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <Link to="/" className="inline-block mb-8 text-2xl font-oswald font-black tracking-tighter">
              NOXERA<span className="text-accent">.</span>
            </Link>
            <h2 className="text-3xl font-oswald font-bold uppercase mb-2">Create Account</h2>
            <p className="text-gray-500">Join our community of fashion enthusiasts</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm flex items-center gap-3 mb-6 text-sm"
            >
              <AlertCircle className="h-4 w-4" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all shadow-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all shadow-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  inputClassName="py-3.5 border-gray-100 rounded-sm focus:ring-accent focus:border-accent shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3 py-2">
              <input
                type="checkbox"
                id="terms"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                I agree to the <Link to="#" className="text-accent font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-accent font-bold hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-accent text-white py-4 px-6 font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg mt-4 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Sign Up"}
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-8">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-accent font-bold hover:underline transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;