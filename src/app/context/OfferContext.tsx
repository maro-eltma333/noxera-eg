import React, { createContext, useContext, useState, useEffect } from "react";

export interface Offer {
    id: string;
    title: string;
    description: string;
    image: string;
    badge: string;
    color: string;
}

interface OfferContextType {
    offers: Offer[];
    addOffer: (offer: Omit<Offer, 'id'>) => void;
    updateOffer: (id: string, offer: Partial<Offer>) => void;
    deleteOffer: (id: string) => void;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

const initialOffers: Offer[] = [
    {
        id: "offer-jackets",
        title: "All Jackets 50% OFF",
        description: "Pick your winter style for half the price! Any jacket inside the store is currently 50% OFF. Don't miss out on your favorite styles.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
        badge: "Season Sale 🧥",
        color: "bg-accent"
    },
    {
        id: "offer-bogo",
        title: "Buy 1 Get 2nd 50% OFF",
        description: "Double your style and save! Buy any piece and get the second one at half price. It's time to refresh your wardrobe for less.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
        badge: "Double Deal 🛍️",
        color: "bg-gray-900"
    },
    {
        id: "offer-b2g1",
        title: "Buy 2 Get 1 FREE",
        description: "Yes, really FREE! Buy two pieces and the third one is our gift to you. Stock up on your essentials today!",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",
        badge: "Gift Offer 🎁",
        color: "bg-accent"
    }
];

export const OfferProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [offers, setOffers] = useState<Offer[]>(() => {
        const saved = localStorage.getItem("site_offers");
        return saved ? JSON.parse(saved) : initialOffers;
    });

    useEffect(() => {
        localStorage.setItem("site_offers", JSON.stringify(offers));
    }, [offers]);

    const addOffer = (offer: Omit<Offer, 'id'>) => {
        const newOffer = { ...offer, id: Date.now().toString() };
        setOffers([...offers, newOffer]);
    };

    const updateOffer = (id: string, updatedFields: Partial<Offer>) => {
        setOffers(offers.map(o => o.id === id ? { ...o, ...updatedFields } : o));
    };

    const deleteOffer = (id: string) => {
        setOffers(offers.filter(o => o.id !== id));
    };

    return (
        <OfferContext.Provider value={{ offers, addOffer, updateOffer, deleteOffer }}>
            {children}
        </OfferContext.Provider>
    );
};

export const useOffers = () => {
    const context = useContext(OfferContext);
    if (!context) throw new Error("useOffers must be used within an OfferProvider");
    return context;
};
