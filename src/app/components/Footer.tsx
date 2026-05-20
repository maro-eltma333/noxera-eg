import { Facebook, Instagram, Twitter, Youtube, Phone, CheckCircle, Mail, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useSiteSettings } from "../context/SiteSettingsContext";

export function Footer() {
  const { settings } = useSiteSettings();
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setEmail("");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <>
      <footer className="bg-[#F5F5F0] pt-20 pb-10 border-t border-gray-200">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="space-y-4">
              <span className="font-oswald font-bold text-3xl tracking-tighter uppercase">{settings.siteName}</span>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                {settings.footerAbout}
              </p>
              <div className="flex space-x-3">
                {settings.socialLinks?.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${link.platform} page`}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.platform === 'facebook' && <Facebook className="h-4 w-4" />}
                    {link.platform === 'instagram' && <Instagram className="h-4 w-4" />}
                    {link.platform === 'whatsapp' && <Phone className="h-4 w-4" />}
                    {link.platform === 'tiktok' && (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
                      </svg>
                    )}
                    {link.platform === 'youtube' && <Youtube className="h-4 w-4" />}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-oswald font-bold text-lg mb-4 uppercase">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {settings.footerShopLinks?.map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="hover:text-accent transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-oswald font-bold text-lg mb-4 uppercase">Help</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {settings.footerHelpLinks?.map((link, i) => (
                  <li key={i}>
                    {link.to.startsWith('#') || link.to.startsWith('http') ? (
                      <a href={link.to} className="hover:text-accent transition-colors">{link.label}</a>
                    ) : (
                      <Link to={link.to} className="hover:text-accent transition-colors">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h3 className="font-oswald font-bold text-lg mb-4 uppercase">Subscribe</h3>
              <p className="text-gray-600 text-sm mb-4">
                Be the first to know about our new arrivals and exclusive offers.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className={`relative rounded-lg border-2 transition-all duration-300 ${isFocused ? "border-primary shadow-[0_0_12px_rgba(26,26,26,0.1)]" : "border-gray-300"}`}>
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${isFocused ? "text-primary" : "text-gray-400"}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Your email address"
                    aria-label="Your email address for newsletter subscription"
                    required
                    className="w-full bg-white text-gray-900 placeholder-gray-400 text-sm pl-10 pr-4 py-3 rounded-lg focus:outline-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden bg-black text-white font-extrabold text-sm uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <span className="relative z-10">Join Now</span>
                  <ArrowRight className="h-4 w-4 relative z-10" />
                </motion.button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Popup */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-white border border-gray-200 shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 15, delay: 0.15 }}
            >
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </motion.div>
            <div>
              <p className="font-bold text-gray-900 text-sm">You're subscribed! 🎉</p>
              <p className="text-gray-500 text-xs mt-0.5">Check your inbox for a welcome surprise.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
