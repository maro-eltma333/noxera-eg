import React, { createContext, useContext, useState, useEffect } from "react";

interface FooterLink {
    label: string;
    to: string;
}

export interface SocialLink {
    platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'whatsapp';
    url: string;
}

export interface FeaturedProduct {
    topLabel: string;
    optionLabel: string;
    title: string;
    price: string;
    image: string;
}

export interface SiteSettings {
    siteName: string;
    tagline: string;
    heroTitleLeft: string;
    heroTitleRight: string;
    heroSubtitle: string;
    heroImage: string;
    featuredProduct: FeaturedProduct;
    footerAbout: string;
    footerShopLinks: FooterLink[];
    footerHelpLinks: FooterLink[];
    socialLinks: SocialLink[];
    taxRate: string;
    freeShippingThreshold: string;
    maintenanceMode: boolean;
}

interface SiteSettingsContextType {
    settings: SiteSettings;
    updateSettings: (newSettings: SiteSettings) => void;
}

const defaultSettings: SiteSettings = {
    siteName: "NOXERA",
    tagline: "Premium Box Fit Streetwear.",
    heroTitleLeft: "BOX FIT",
    heroTitleRight: "STREETWEAR",
    heroSubtitle: "Limited drops. Premium heavyweight fabrics & box-fit styling.",
    heroImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
    featuredProduct: {
        topLabel: "Trending Drop",
        optionLabel: "M / L / XL / 2XL / BOXFIT",
        title: "Noxera Boxfit Noxr Signature Tee - Green (Women)",
        price: "490",
        image: "https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670361590_17856255294690314_7289482166490305316_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE-QdfNnWIxxVe922p90fxJdq9qUA3rgsl2r2pQDeuCyfF0y4iY58NFmNG-9bfFlQV46MZH2HdIvEYd8YVNPvmE&_nc_ohc=_XQMEG8Zb2gQ7kNvwFIg8wO&_nc_oc=AdqKJfEpDNaBJ02SuzXut1JWFAGqXE4M1Ppsz0kNzLvkert3CsBzLA1F_scO7qHiLeo&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=xLxYGMYbbbSz7a_B2265aA&_nc_ss=7e2a8&oh=00_Af7H1aCqCksNMsDczBusl7Gsc4-WHl-OBLTK6PcnfO1RFQ&oe=6A12EF85"
    },
    footerAbout: "Premium Box Fit Streetwear for men and women. Limited drops, heavyweight fabrics, and modern boxy fits.",
    footerShopLinks: [
        { label: "BoxFit", to: "/boxfit" },
    ],
    footerHelpLinks: [
        { label: "WhatsApp Support", to: "https://wa.me/201026490075" },
        { label: "My Account", to: "/profile" },
        { label: "Find a Store", to: "/branches" },
        { label: "Terms & Policies", to: "#" },
    ],
    socialLinks: [
        { platform: 'facebook', url: 'https://web.facebook.com/people/Noxera-Eg/61574437406102/' },
        { platform: 'instagram', url: 'https://www.instagram.com/noxera.eg' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@noxera_eg' },
        { platform: 'whatsapp', url: 'https://wa.me/201026490075' },
    ],
    taxRate: "14",
    freeShippingThreshold: "1000",
    maintenanceMode: false,
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<SiteSettings>(() => {
        const saved = localStorage.getItem("siteSettings");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Migrate legacy links to prevent old links showing from localStorage cache
                if (parsed.footerShopLinks) {
                    parsed.footerShopLinks = parsed.footerShopLinks.map((link: any) => {
                        if (link.to === "/men" || link.to === "/women") {
                            return { label: "BoxFit", to: "/boxfit" };
                        }
                        return link;
                    }).filter((link: any, index: number, self: any[]) => 
                        self.findIndex((l: any) => l.to === link.to) === index
                    );
                }
                if (parsed.featuredProduct && parsed.featuredProduct.title === "Noxera Heavyweight Box Fit Hoodie") {
                    parsed.featuredProduct = defaultSettings.featuredProduct;
                }
                // Deep merge or at least ensure all keys from defaultSettings exist
                return {
                    ...defaultSettings,
                    ...parsed,
                    // If nested objects exist in parsed, merge them too
                    featuredProduct: { ...defaultSettings.featuredProduct, ...(parsed.featuredProduct || {}) }
                };
            } catch (e) {
                console.error("Failed to parse site settings", e);
                return defaultSettings;
            }
        }
        return defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem("siteSettings", JSON.stringify(settings));
    }, [settings]);

    const updateSettings = (newSettings: SiteSettings) => {
        setSettings(newSettings);
    };

    return (
        <SiteSettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SiteSettingsContext.Provider>
    );
};

export const useSiteSettings = () => {
    const context = useContext(SiteSettingsContext);
    if (!context) {
        throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
    }
    return context;
};
