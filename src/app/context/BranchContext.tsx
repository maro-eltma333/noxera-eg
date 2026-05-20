import React, { createContext, useContext, useState, useEffect } from "react";

export interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string;
    hours: string;
    image: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
    mapLink: string;
}

interface BranchContextType {
    branches: Branch[];
    addBranch: (branch: Omit<Branch, 'id'>) => void;
    updateBranch: (id: string, branch: Partial<Branch>) => void;
    deleteBranch: (id: string) => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

const initialBranches: Branch[] = [
    {
        id: "1",
        name: "Noxera Streetwear Port Said",
        address: "شارع طرح البحر ممر الفرح بيتش قريه النورس ستايل - بورسعيد",
        phone: "01026490075",
        whatsapp: "+201026490075",
        hours: "10:00 AM - 11:00 PM",
        image: "/images/noxera_logo.jpg",
        facebook: "https://web.facebook.com/people/Noxera-Eg/61574437406102/",
        instagram: "https://www.instagram.com/noxera.eg",
        tiktok: "https://www.tiktok.com/@noxera_eg",
        mapLink: "https://maps.app.goo.gl/6cGJXtRhHHbeKhAX9"
    }
];

export const BranchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [branches, setBranches] = useState<Branch[]>(() => {
        const saved = localStorage.getItem("site_branches");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Wipe cache if it contains "Stockey", has multiple legacy branches, or holds the old unsplash image
                const hasLegacy = parsed.some((b: any) => 
                    b.name.toLowerCase().includes("stockey") || 
                    b.address.toLowerCase().includes("stockey") ||
                    (b.id === "1" && b.image && b.image.includes("unsplash.com"))
                );
                if (hasLegacy || parsed.length > 1) {
                    return initialBranches;
                }
                return parsed;
            } catch (e) {
                return initialBranches;
            }
        }
        return initialBranches;
    });

    useEffect(() => {
        localStorage.setItem("site_branches", JSON.stringify(branches));
    }, [branches]);

    const addBranch = (branch: Omit<Branch, 'id'>) => {
        const newBranch = { ...branch, id: Date.now().toString() };
        setBranches([...branches, newBranch]);
    };

    const updateBranch = (id: string, updatedFields: Partial<Branch>) => {
        setBranches(branches.map(b => b.id === id ? { ...b, ...updatedFields } : b));
    };

    const deleteBranch = (id: string) => {
        setBranches(branches.filter(b => b.id !== id));
    };

    return (
        <BranchContext.Provider value={{ branches, addBranch, updateBranch, deleteBranch }}>
            {children}
        </BranchContext.Provider>
    );
};

export const useBranches = () => {
    const context = useContext(BranchContext);
    if (!context) throw new Error("useBranches must be used within a BranchProvider");
    return context;
};
