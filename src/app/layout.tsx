import { Outlet, useLocation, Navigate } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { useSiteSettings } from "./context/SiteSettingsContext";
import { useAuth } from "./context/AuthContext";

export default function Root() {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith("/admin");
  const { settings } = useSiteSettings();
  const { isAdmin } = useAuth();

  if (settings.maintenanceMode && !isAdmin && pathname !== "/login") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center z-50">
        <h1 className="text-5xl md:text-7xl font-oswald font-black uppercase mb-6 tracking-tighter">Site Updating<span className="text-accent">.</span></h1>
        <p className="text-white/60 text-lg md:text-xl max-w-lg mb-12">
          We're currently performing scheduled maintenance and updates on the NOXERA engine. We'll be back shortly!
        </p>
        <a href="/login" className="text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">Admin Access</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F5F5F0] text-[#1A1A1A]">
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}
