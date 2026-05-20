
// Brand transition cache migration: check if local storage has old Stockey keys, and clear them to force new Noxera defaults.
try {
  const settingsRaw = localStorage.getItem("siteSettings");
  if (settingsRaw && settingsRaw.toLowerCase().includes("stockey")) {
    localStorage.removeItem("siteSettings");
  }
  const branchesRaw = localStorage.getItem("site_branches");
  if (branchesRaw && branchesRaw.toLowerCase().includes("stockey")) {
    localStorage.removeItem("site_branches");
  }
  const offersRaw = localStorage.getItem("site_offers");
  if (offersRaw && offersRaw.toLowerCase().includes("stockey")) {
    localStorage.removeItem("site_offers");
  }
} catch (e) {
  console.error("Local storage migration failed", e);
}

import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { AuthProvider } from "./app/context/AuthContext.tsx";
import { CartProvider } from "./app/context/CartContext.tsx";
import { OrderProvider } from "./app/context/OrderContext.tsx";
import { SiteSettingsProvider } from "./app/context/SiteSettingsContext.tsx";
import { BranchProvider } from "./app/context/BranchContext";
import { OfferProvider } from "./app/context/OfferContext";
import { StrictMode } from "react";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SiteSettingsProvider>
        <BranchProvider>
          <OfferProvider>
            <CartProvider>
              <OrderProvider>
                <App />
              </OrderProvider>
            </CartProvider>
          </OfferProvider>
        </BranchProvider>
      </SiteSettingsProvider>
    </AuthProvider>
  </StrictMode>
);