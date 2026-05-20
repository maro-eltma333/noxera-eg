import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
    id: string;
    title: string;
    price: string;
    image: string;
    quantity: number;
    color?: string;
    size?: string;
}

interface CartContextType {
    items: CartItem[];
    totalCount: number;
    totalPrice: number;
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "noxera_cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const stored = localStorage.getItem(CART_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === newItem.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
        setIsOpen(true);
    };

    const removeItem = (id: string) =>
        setItems((prev) => prev.filter((i) => i.id !== id));

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) return removeItem(id);
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => setItems([]);

    const totalCount = items.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = items.reduce(
        (s, i) => s + parseFloat(i.price) * i.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                totalCount,
                totalPrice,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isOpen,
                openCart: () => setIsOpen(true),
                closeCart: () => setIsOpen(false),
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
