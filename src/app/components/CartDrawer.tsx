import { AnimatePresence, motion } from "motion/react";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalCount, clearCart } = useCart();
    const { createOrder } = useOrders();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");

    const handleCheckout = async () => {
        if (!isLoggedIn) {
            closeCart();
            navigate("/login");
            return;
        }

        setIsCheckingOut(true);
        // Simulate processing
        setTimeout(() => {
            const result = createOrder(items, totalPrice);
            if (result.success) {
                setOrderId(result.orderId);
                setIsSuccess(true);
                clearCart();
            } else {
                setIsCheckingOut(false);
            }
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !isCheckingOut && closeCart()}
                        className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md z-[90] bg-white shadow-2xl flex flex-col"
                    >
                        {/* Success Overlay */}
                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 12 }}
                                    >
                                        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                                    </motion.div>
                                    <h3 className="font-oswald font-black text-3xl uppercase tracking-tighter mb-2">Order Confirmed!</h3>
                                    <p className="text-xs text-gray-500 mb-6">Your box-fit style drop is registered successfully.</p>
                                    
                                    <div className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-8 space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Order Identifier</span>
                                        <span className="font-oswald font-black text-xl text-black block">#{orderId}</span>
                                        <p className="text-[10px] text-gray-400 max-w-[240px] mx-auto leading-normal">
                                            Keep this reference code for inquiries or delivery tracking.
                                        </p>
                                    </div>

                                    <div className="w-full space-y-2.5">
                                        <a
                                            href={`https://wa.me/201026490075?text=Hello%20Noxera%2C%20I%20have%20an%20inquiry%20regarding%20my%20order%20%23${orderId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 font-bold uppercase tracking-wider rounded-xl transition-all duration-300 text-xs shadow-md shadow-green-500/10"
                                        >
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.497.003 9.967-4.468 9.97-9.97.002-2.665-1.034-5.171-2.917-7.056C16.442 1.703 13.939.666 11.279.666c-5.498 0-9.968 4.469-9.971 9.97-.001 1.83.486 3.62 1.412 5.2l-.93 3.398 3.475-.912zm12.91-4.82c-.107-.18-.395-.29-.828-.507-.432-.217-2.555-1.262-2.945-1.407-.39-.145-.675-.217-.96.217-.286.435-1.107 1.407-1.356 1.696-.25.29-.497.325-.93.108-.432-.217-1.826-.673-3.478-2.148-1.284-1.147-2.152-2.564-2.404-3-.252-.435-.027-.67.19-.886.195-.195.432-.507.648-.76.217-.253.29-.434.432-.723.145-.29.072-.542-.036-.76-.108-.217-.96-2.316-1.317-3.184-.348-.84-.704-.726-.96-.74l-.815-.014c-.282 0-.74.106-1.127.53-.388.423-1.48 1.447-1.48 3.529 0 2.08 1.514 4.09 1.726 4.38.212.29 2.98 4.549 7.218 6.373 1.008.434 1.796.693 2.41.888 1.012.32 1.934.275 2.662.166.81-.12 2.555-.957 2.917-1.882.363-.925.363-1.718.255-1.898z" />
                                            </svg>
                                            Inquire on WhatsApp
                                        </a>
                                        <button
                                            onClick={() => {
                                                setIsSuccess(false);
                                                setIsCheckingOut(false);
                                                closeCart();
                                                navigate("/profile");
                                            }}
                                            className="w-full py-3.5 bg-primary hover:bg-accent text-white font-black text-[10px] uppercase tracking-widest transition-all rounded-xl shadow-sm hover:shadow-md"
                                        >
                                            Go to My Orders
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="h-5 w-5" />
                                <span className="font-oswald font-bold text-xl uppercase tracking-tight">
                                    Cart <span className="text-accent">({totalCount})</span>
                                </span>
                            </div>
                            <button
                                aria-label="Close cart"
                                onClick={closeCart}
                                disabled={isCheckingOut}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="h-8 w-8 text-gray-300" />
                                    </div>
                                    <p className="font-oswald font-bold text-xl uppercase text-gray-400">Your bag is empty</p>
                                    <p className="text-sm text-gray-400">Add something you love</p>
                                    <button
                                        onClick={closeCart}
                                        className="mt-2 px-6 py-3 bg-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-accent transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex gap-4 py-4 border-b border-gray-50"
                                        >
                                            <div className="w-20 h-24 bg-gray-100 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm uppercase tracking-tight truncate">{item.title}</h4>
                                                {item.color && item.size && (
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                                                        {item.color} / {item.size}
                                                    </p>
                                                )}
                                                <p className="text-accent font-oswald font-bold text-lg mt-1">{item.price} EGP</p>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <button
                                                        aria-label="Decrease quantity"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={isCheckingOut}
                                                        className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-black transition-colors disabled:opacity-30"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-sm" aria-label="Quantity">{item.quantity}</span>
                                                    <button
                                                        aria-label="Increase quantity"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={isCheckingOut}
                                                        className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-black transition-colors disabled:opacity-30"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                aria-label="Remove item"
                                                onClick={() => removeItem(item.id)}
                                                disabled={isCheckingOut}
                                                className="text-gray-300 hover:text-red-500 transition-colors self-start mt-1 disabled:opacity-30"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-100 px-6 py-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 uppercase tracking-wider font-bold">Subtotal</span>
                                    <span className="font-oswald font-black text-2xl">{totalPrice.toFixed(2)} EGP</span>
                                </div>
                                <p className="text-[11px] text-gray-400">Shipping & taxes calculated at checkout.</p>

                                {/* WhatsApp Inquiry banner */}
                                <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg flex items-start gap-2.5">
                                    <span className="text-lg">💬</span>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black uppercase tracking-wider text-primary">Need sizing details or questions?</p>
                                        <p className="text-[9px] text-gray-400 mt-0.5 leading-normal">
                                            Chat with us directly on WhatsApp at <a href="https://wa.me/201026490075" target="_blank" rel="noopener noreferrer" className="text-accent underline font-bold">01026490075</a> for styling advice or references.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full bg-primary hover:bg-accent text-white py-4 font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-wait"
                                >
                                    {isCheckingOut ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                            <ShoppingBag className="h-4 w-4" />
                                        </motion.div>
                                    ) : (
                                        <>Checkout <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                                <button
                                    onClick={closeCart}
                                    disabled={isCheckingOut}
                                    className="w-full py-3 border border-gray-200 hover:border-black font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-30"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
