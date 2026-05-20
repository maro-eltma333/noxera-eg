import { Search, Menu, X, ShoppingBag, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { SearchOverlay } from "./SearchOverlay";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { AnimatePresence, motion } from "motion/react";
import { useSiteSettings } from "../context/SiteSettingsContext";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 25 },
  },
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalCount, openCart } = useCart();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/boxfit", label: "BoxFit" },
    { to: "/branches", label: "Our Branches" },
    { to: "/craft-quality", label: "Craft & Quality" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#F3EDE6] border-b border-gray-200 shadow-sm">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <img src="/images/noxera_logo.jpg" alt="Noxera Logo" className="h-16 sm:h-18 w-auto object-contain" />
              </Link>
            </div>

            {/* Desktop Nav links */}
            <div className="hidden xl:flex space-x-6 lg:space-x-8 items-center">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `py-2 font-extrabold text-[0.9rem] uppercase tracking-wide transition-colors ${isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Right icons */}
            <div className="hidden xl:flex items-center gap-4 lg:gap-5">
              {/* Search */}
              <button
                aria-label="Open search"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 -m-2 text-gray-600 hover:text-primary transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <button
                aria-label="Open cart"
                onClick={openCart}
                className="relative p-2 -m-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-white text-[0.7rem] font-black rounded-full flex items-center justify-center"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </button>

              {/* Auth */}
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full hover:border-primary/50 transition-colors text-gray-800"
                  >
                    <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-xs font-black">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold max-w-[5rem] truncate">{user?.name}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-52 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-50">
                          <p className="text-xs text-gray-400 uppercase tracking-widest">Signed in as</p>
                          <p className="font-bold text-sm truncate">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                        >
                          <User className="h-4 w-4 text-gray-400" /> My Profile
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4 text-gray-400" /> Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50"
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-bold uppercase tracking-wide text-gray-700 hover:text-primary transition-colors">
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary text-white text-sm font-bold uppercase tracking-wide px-4 py-2 hover:bg-primary/90 transition-colors rounded-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="xl:hidden flex items-center gap-4">
              <button aria-label="Open cart" onClick={openCart} className="relative p-2 -m-2 text-gray-700">
                <ShoppingBag className="h-5 w-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-white text-[0.65rem] font-black rounded-full flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </button>
              <button aria-label="Toggle menu" className="p-2 -m-2 text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="xl:hidden fixed inset-x-0 bottom-0 top-20 z-50 bg-[#111111]/98 text-white backdrop-blur-xl flex flex-col overflow-y-auto"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex-1 flex flex-col justify-between p-6 sm:p-10 gap-8"
              >
                {/* Search and Navigation Links */}
                <div className="space-y-8">
                  {/* Premium Search Trigger */}
                  <motion.button
                    variants={itemVariants}
                    onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}
                    className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-white/40 hover:text-white transition-all text-left text-xs uppercase tracking-wider font-black"
                  >
                    <Search className="h-4 w-4 text-white/40" />
                    Search the collection...
                  </motion.button>

                  {/* Primary Nav Links */}
                  <div className="flex flex-col">
                    {navLinks.map(({ to, label }, idx) => (
                      <motion.div key={to} variants={itemVariants}>
                        <Link
                          to={to}
                          onClick={() => setIsMenuOpen(false)}
                          className="group flex items-baseline gap-4 py-4 border-b border-white/5"
                        >
                          <span className="text-[10px] font-mono text-white/20 font-bold">0{idx + 1}</span>
                          <span className="font-oswald font-black text-3xl sm:text-4xl uppercase tracking-tighter group-hover:text-amber-400 group-hover:translate-x-2 transition-all duration-300">
                            {label}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer and User Profile Section */}
                <div className="space-y-6">
                  {isLoggedIn ? (
                    <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 p-5 rounded-[1.5rem] flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center text-lg font-black shadow-lg">
                          {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Logged in as</p>
                          <p className="font-oswald font-bold text-lg text-white truncate max-w-[200px]">{user?.name}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold text-xs uppercase tracking-wider text-white"
                        >
                          <User className="h-4 w-4" /> Profile
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold text-xs uppercase tracking-wider text-white"
                          >
                            <LayoutDashboard className="h-4 w-4" /> Admin
                          </Link>
                        )}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all font-black text-xs uppercase tracking-widest"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center py-4 rounded-xl border border-white/20 hover:border-white transition-all font-bold text-xs uppercase tracking-widest text-white"
                      >
                        Log In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center py-4 rounded-xl bg-white hover:bg-[#F3EDE6] text-black transition-all font-black text-xs uppercase tracking-widest"
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                  )}

                  {/* Brand Meta & Social Links */}
                  <motion.div variants={itemVariants} className="flex justify-between items-center border-t border-white/5 pt-5 text-white/40">
                    <span className="text-[8px] font-black uppercase tracking-[0.25em]">NOXERA. EST. 2026</span>
                    <div className="flex gap-4">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-[9px] font-black uppercase tracking-wider">Instagram</a>
                      <a href="https://wa.me/201026490075" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:opacity-80 transition-opacity text-[9px] font-black uppercase tracking-wider">WhatsApp</a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
