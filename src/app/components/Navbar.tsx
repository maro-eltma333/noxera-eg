import { Search, Menu, X, ShoppingBag, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { SearchOverlay } from "./SearchOverlay";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { AnimatePresence, motion } from "motion/react";
import { useSiteSettings } from "../context/SiteSettingsContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalCount, openCart } = useCart();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-white border-t border-gray-100 overflow-y-auto max-h-[calc(100vh-80px)]"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-gray-800 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  {isLoggedIn ? (
                    <>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors">
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors">
                          <LayoutDashboard className="h-4 w-4" /> Admin
                        </Link>
                      )}
                      <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg w-full text-left transition-colors">
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors">Log In</Link>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors">Sign Up</Link>
                    </>
                  )}
                </div>
                <button
                  onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-primary rounded-lg w-full transition-colors"
                >
                  <Search className="h-4 w-4" /> Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
