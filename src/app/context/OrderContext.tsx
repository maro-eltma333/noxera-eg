import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface OrderItem {
    id: string;
    title: string;
    price: string;
    image: string;
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: "Pending" | "Processing" | "In Transit" | "Delivered";
    date: string;
}

interface OrderContextType {
    orders: Order[];
    createOrder: (items: OrderItem[], total: number) => { success: boolean; orderId: string };
    getUserOrders: (userId: string) => Order[];
    getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | null>(null);

const ORDERS_KEY = "noxera_orders";

export function OrderProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>(() => {
        try {
            const stored = localStorage.getItem(ORDERS_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }, [orders]);

    const createOrder = (items: OrderItem[], total: number) => {
        if (!user) return { success: false, orderId: "" };

        const newOrder: Order = {
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            userId: user.id,
            items,
            total,
            status: "Processing",
            date: new Date().toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
        };

        setOrders((prev) => [newOrder, ...prev]);
        return { success: true, orderId: newOrder.id };
    };

    const getUserOrders = (userId: string) => {
        return orders.filter(o => o.userId === userId);
    };

    const getAllOrders = () => orders;

    return (
        <OrderContext.Provider value={{ orders, createOrder, getUserOrders, getAllOrders }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error("useOrders must be used within OrderProvider");
    return ctx;
}
