import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    LayoutDashboard, Package, Users, Settings, TrendingUp,
    DollarSign, ShoppingBag, Star, Edit2, Trash2, Save, X,
    ChevronRight, ChevronDown, AlertCircle, Check, ArrowUpRight, LogOut,
    BarChart3, PieChart, Activity, Search, Filter, Plus, Clock, Link2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { products as initialProducts, Product } from "../data/products";
import { Link, useNavigate } from "react-router";
import { useOrders } from "../context/OrderContext";
import { useSiteSettings, SiteSettings, SocialLink } from "../context/SiteSettingsContext";
import { useBranches, Branch } from "../context/BranchContext";
import { MapPin, Tag, Smartphone, Instagram as InstagramIcon, Facebook as FacebookIcon, Phone as PhoneIcon, Youtube as YoutubeIcon } from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────
type Tab = "overview" | "products" | "settings" | "branches";

// ── Data ───────────────────────────────────────────────────────────────────
const salesData = [
    { month: "Aug", val: 4200, growth: 5 },
    { month: "Sep", val: 5800, growth: 12 },
    { month: "Oct", val: 4900, growth: -8 },
    { month: "Nov", val: 7200, growth: 15 },
    { month: "Dec", val: 9100, growth: 22 },
    { month: "Jan", val: 6800, growth: -12 },
    { month: "Feb", val: 8400, growth: 18 },
];

const categoryData = [
    { name: "Dresses", pct: 34, color: "#111111", items: 42 },
    { name: "Outerwear", pct: 22, color: "#4a3728", items: 28 },
    { name: "Accessories", pct: 18, color: "#8b6f5e", items: 56 },
    { name: "Tops", pct: 15, color: "#c4a898", items: 34 },
    { name: "Other", pct: 11, color: "#e8dbd5", items: 12 },
];

const allUsers = [
    { id: "1", name: "Maro", email: "maro@mail.com", role: "user", joinedAt: "2026-01-15", orders: 12, status: "Active" },
    { id: "2", name: "Maro Admin", email: "maro@admin.com", role: "admin", joinedAt: "2025-12-01", orders: 0, status: "Active" },
    { id: "3", name: "Sara Ahmed", email: "sara@mail.com", role: "user", joinedAt: "2026-01-22", orders: 7, status: "Active" },
    { id: "4", name: "Layla Hassan", email: "layla@mail.com", role: "user", joinedAt: "2026-01-30", orders: 3, status: "Idle" },
    { id: "5", name: "Nour Khaled", email: "nour@mail.com", role: "user", joinedAt: "2026-02-04", orders: 15, status: "Active" },
    { id: "6", name: "Dina Youssef", email: "dina@mail.com", role: "user", joinedAt: "2026-02-10", orders: 2, status: "Banned" },
];

const demoOrders = [
    {
        id: "ORD-9281",
        userId: "Sarah J.",
        date: "2026-02-26",
        total: 280.00,
        status: "Delivered",
        items: [{ title: "Velvet Evening Dress", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=200" }]
    },
    {
        id: "ORD-8822",
        userId: "Emily R.",
        date: "2026-02-25",
        total: 110.00,
        status: "Processing",
        items: [{ title: "Ribbed Knit Set", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=200" }]
    },
    {
        id: "ORD-7163",
        userId: "Michael K.",
        date: "2026-02-25",
        total: 450.50,
        status: "Shipped",
        items: [{ title: "Camel Wool Coat", image: "https://images.unsplash.com/photo-1709756196418-11d0340446db?w=200" }]
    },
    {
        id: "ORD-6610",
        userId: "Linda W.",
        date: "2026-02-24",
        total: 95.00,
        status: "Pending",
        items: [{ title: "Floral Slip Dress", image: "https://m.media-amazon.com/images/I/51G7FFeWToL._AC_SY606_.jpg" }]
    },
    {
        id: "ORD-5541",
        userId: "Adam S.",
        date: "2026-02-23",
        total: 1200.00,
        status: "Delivered",
        items: [{ title: "Leather Boots", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200" }]
    },
];

// ── Components ───────────────────────────────────────────────────────────────

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white/80 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-2xl ${className}`}>
        {children}
    </div>
);

const ModernBarChart = () => {
    const max = Math.max(...salesData.map((d) => d.val));
    return (
        <div className="flex justify-between h-48 gap-3 pt-6 border-b border-gray-100/50">
            {salesData.map((d, i) => (
                <div key={d.month} className="group relative flex-1 h-full flex flex-col items-center justify-end gap-3">
                    {/* Tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none bg-primary text-white text-[10px] px-2 py-1 rounded-md mb-2 shadow-lg z-20 whitespace-nowrap">
                        ${d.val.toLocaleString()} ({d.growth > 0 ? "+" : ""}{d.growth}%)
                    </div>

                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.val / max) * 100}%` }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full max-w-[32px] rounded-t-lg shadow-sm transition-all duration-300 ${d.growth >= 0 ? "bg-primary group-hover:bg-accent" : "bg-gray-300 group-hover:bg-gray-400"
                            }`}
                    />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d.month}</span>
                </div>
            ))}
        </div>
    );
};

const ModernDonutChart = () => {
    let offset = 0;
    const r = 50, cx = 70, cy = 70, circum = 2 * Math.PI * r;
    return (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-8 py-4">
            <div className="relative w-[140px] h-[140px]">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f8f9fa" strokeWidth="16" />
                    {categoryData.map((c) => {
                        const dash = (c.pct / 100) * circum;
                        const gap = circum - dash;
                        const seg = (
                            <motion.circle
                                key={c.name}
                                initial={{ strokeDasharray: `0 ${circum}` }}
                                animate={{ strokeDasharray: `${dash} ${gap}` }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                cx={cx} cy={cy} r={r}
                                fill="none"
                                stroke={c.color}
                                strokeWidth="16"
                                strokeDashoffset={-offset}
                                strokeLinecap="round"
                                className="transition-all duration-300 hover:stroke-[20px]"
                                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                            />
                        );
                        offset += dash;
                        return seg;
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
                    <span className="font-oswald font-black text-xl leading-none">172</span>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 gap-2 min-w-[120px]">
                {categoryData.map((c) => (
                    <div key={c.name} className="flex items-center gap-2 group cursor-default">
                        <span className="w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125" style={{ background: c.color }} />
                        <span className="text-xs font-bold text-gray-500 truncate group-hover:text-primary transition-colors">{c.name}</span>
                        <span className="ml-auto font-oswald text-xs font-black">{c.pct}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ModernSelect = ({ value, onChange, options, label, icon: Icon }: {
    value: string,
    onChange: (val: string) => void,
    options: { label: string, value: string }[],
    label: string,
    icon?: any
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div className="relative min-w-[200px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between gap-3 bg-white border ${isOpen ? 'border-primary ring-4 ring-primary/5' : 'border-gray-200'} rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95`}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {Icon && <Icon className="h-3.5 w-3.5 text-gray-400 shrink-0" />}
                    <span className="text-gray-400 shrink-0">{label}:</span>
                    <span className="text-primary truncate">{selectedOption.label}</span>
                </div>
                <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 5, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[24px] overflow-hidden p-2"
                        >
                            <div className="max-h-[240px] overflow-y-auto no-scrollbar">
                                {options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => {
                                            onChange(opt.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all mb-1 last:mb-0 ${value === opt.value
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'hover:bg-gray-50 text-gray-500 hover:text-primary'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            {opt.label}
                                            {value === opt.value && <Check className="h-3 w-3" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const SocialPlatformSelect = ({ value, onChange, options }: {
    value: string,
    onChange: (val: string) => void,
    options: { label: string, value: string }[]
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div className="relative min-w-[140px] z-[20]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`w-full flex items-center justify-between gap-2 bg-gray-50 border ${isOpen ? 'border-primary ring-4 ring-primary/5' : 'border-transparent'} rounded-2xl px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-4 focus:ring-primary/5`}
            >
                <span className="text-primary truncate">{selectedOption?.label || value}</span>
                <ChevronDown className={`h-3 w-3 text-gray-400 pointer-events-none transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 5, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[16px] overflow-hidden p-2"
                        >
                            <div className="max-h-[200px] overflow-y-auto no-scrollbar">
                                {options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(opt.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all mb-1 last:mb-0 ${value === opt.value
                                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                                            : 'hover:bg-gray-50 text-gray-500 hover:text-primary'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            {opt.label}
                                            {value === opt.value && <Check className="h-3 w-3" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Admin Dashboard Component ────────────────────────────────────────────────

const SidebarContent = ({ activeTab, setActiveTab, user, logout, navigate }: any) => {
    const sidebarItems = [
        { id: "overview", label: "Dashboard", icon: <LayoutDashboard /> },
        { id: "products", label: "Inventory", icon: <Package /> },
        { id: "branches", label: "Branches", icon: <MapPin /> },
        { id: "settings", label: "Site Settings", icon: <Settings /> },
    ] as const;

    return (
        <>
            <div className="p-8 pb-4">
                <Link to="/" className="font-oswald font-black text-3xl tracking-tighter block mb-2">
                    NOXERA<span className="text-accent">.</span>
                </Link>
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">Admin Hub</span>
                </div>
            </div>

            <nav className="flex-1 p-6 space-y-2 mt-4 overflow-y-auto no-scrollbar">
                {sidebarItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === item.id
                            ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                            : "text-gray-400 hover:bg-gray-50 hover:text-primary"
                            }`}
                    >
                        <span className={`transition-colors h-5 w-5 flex items-center justify-center ${activeTab === item.id ? "text-white" : "text-gray-300"}`}>
                            {item.icon}
                        </span>
                        {item.label}
                        {activeTab === item.id && (
                            <motion.div layoutId="activePill" className="ml-auto w-1 h-4 bg-accent/40 rounded-full" />
                        )}
                    </button>
                ))}
            </nav>

            <div className="p-6 border-t border-gray-100">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black shadow-md flex-shrink-0">
                        {user?.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-black truncate">{user?.name}</p>
                        <p className="text-[10px] text-gray-400 truncate tracking-tight">{user?.email}</p>
                    </div>
                    <button
                        onClick={() => { logout(); navigate("/"); }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default function AdminDashboard() {
    const { user, isAdmin, logout } = useAuth();
    const { orders } = useOrders();
    const { settings: globalSettings, updateSettings: globalUpdateSettings } = useSiteSettings();
    const navigate = useNavigate();
    const { branches, addBranch, updateBranch, deleteBranch } = useBranches();

    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [productList, setProductList] = useState<Product[]>(initialProducts);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editForm, setEditForm] = useState<Partial<Product>>({});
    const [settings, setSettings] = useState(globalSettings);

    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
    const [isAddingBranch, setIsAddingBranch] = useState(false);
    const [newBranchForm, setNewBranchForm] = useState<Omit<Branch, 'id'>>({
        name: "", address: "", phone: "", hours: "", image: "", mapLink: "",
        facebook: "", instagram: "", tiktok: "", whatsapp: ""
    });

    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [sortBy, setSortBy] = useState<"none" | "price-low" | "price-high" | "score">("none");
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [globalSearchQuery, setGlobalSearchQuery] = useState("");
    const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
    const [newProductForm, setNewProductForm] = useState<Partial<Product>>({
        title: "",
        price: "0.00",
        category: "Dresses",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        rating: 5,
        reviews: 0,
    });

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
                    <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="h-12 w-12" />
                    </div>
                    <h1 className="font-oswald font-black text-4xl uppercase mb-3">Unauthorized</h1>
                    <p className="text-gray-500 mb-8">Access to this area is reserved for administrators only.</p>
                    <Link to="/login" className="inline-block bg-primary text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all duration-300">
                        Log In as Admin
                    </Link>
                </motion.div>
            </div>
        );
    }

    const globalSearchResults = useMemo(() => {
        if (!globalSearchQuery.trim() || globalSearchQuery.length < 2) return [];
        const q = globalSearchQuery.toLowerCase();
        const results: { type: string; label: string; sub: string; tab: Tab; icon: string }[] = [];

        productList.forEach(p => {
            if (p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
                results.push({ type: "Product", label: p.title, sub: `${p.category} · ${p.price} EGP`, tab: "products", icon: "📦" });
            }
        });
        branches.forEach(b => {
            if (b.name.toLowerCase().includes(q) || b.address.toLowerCase().includes(q)) {
                results.push({ type: "Branch", label: b.name, sub: b.address, tab: "branches", icon: "📍" });
            }
        });

        return results.slice(0, 8);
    }, [globalSearchQuery, productList, branches]);

    const categories = useMemo(() => ["All", ...new Set(productList.map(p => p.category))], [productList]);

    const filteredProducts = useMemo(() => {
        let result = productList.filter(p =>
            (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (filterCategory === "All" || p.category === filterCategory)
        );

        if (sortBy === "price-low") result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        if (sortBy === "price-high") result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        if (sortBy === "score") result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        return result;
    }, [productList, searchQuery, filterCategory, sortBy]);

    const handleSaveSettings = () => {
        setSaveStatus("saving");
        setTimeout(() => {
            globalUpdateSettings(settings);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        }, 1500);
    };

    const handleAddProduct = () => {
        if (!newProductForm.title || !newProductForm.category) return;
        const newProd: Product = {
            ...newProductForm as Product,
            id: Date.now().toString(),
            rating: 5,
            reviews: 0
        };
        setProductList([...productList, newProd]);
        setIsAddingProduct(false);
        setNewProductForm({
            title: "",
            price: "0.00",
            category: "Dresses",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            rating: 5,
            reviews: 0,
        });
    };

    const handleUpdateProduct = () => {
        if (!editingProduct) return;
        setProductList(productList.map(p => p.id === editingProduct.id ? editingProduct : p));
        setEditingProduct(null);
    };

    const handleAddBranch = () => {
        addBranch(newBranchForm);
        setIsAddingBranch(false);
        setNewBranchForm({
            name: "", address: "", phone: "", hours: "", image: "", mapLink: "",
            facebook: "", instagram: "", tiktok: "", whatsapp: ""
        });
    };

    const handleUpdateBranch = () => {
        if (!editingBranch) return;
        updateBranch(editingBranch.id, editingBranch);
        setEditingBranch(null);
    };

    const sidebarItems = [
        { id: "overview", label: "Dashboard", icon: <LayoutDashboard /> },
        { id: "products", label: "Inventory", icon: <Package /> },
        { id: "branches", label: "Branches", icon: <MapPin /> },
        { id: "settings", label: "Site Settings", icon: <Settings /> },
    ] as const;

    return (
        <div className="min-h-screen bg-[#F0F2F5] text-[#1A1A1A] font-sans flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex w-[280px] flex-col bg-white border-r border-gray-200 sticky top-0 h-screen z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} user={user} logout={logout} navigate={navigate} />
            </aside>

            {/* Sidebar - Mobile Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[50] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[60] lg:hidden flex flex-col shadow-2xl"
                        >
                            <SidebarContent
                                activeTab={activeTab}
                                setActiveTab={(tab: Tab) => { setActiveTab(tab); setIsSidebarOpen(false); }}
                                user={user}
                                logout={logout}
                                navigate={navigate}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-primary transition-colors"
                        >
                            <LayoutDashboard className="h-5 w-5" />
                        </button>
                        <div className="h-8 w-[1px] bg-gray-200 hidden lg:block mx-2" />
                        <div>
                            <h2 className="font-oswald font-black text-2xl uppercase tracking-tight">{activeTab}</h2>
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Admin / {activeTab}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Global Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            <input
                                value={globalSearchQuery}
                                onChange={(e) => { setGlobalSearchQuery(e.target.value); setIsGlobalSearchOpen(true); }}
                                onFocus={() => setIsGlobalSearchOpen(true)}
                                placeholder="Search products or branches..."
                                className="bg-gray-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm w-72 focus:ring-2 focus:ring-primary/10 transition-all focus:bg-white focus:shadow-sm"
                            />
                            {/* Dropdown */}
                            <AnimatePresence>
                                {isGlobalSearchOpen && globalSearchQuery.length >= 2 && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 z-40"
                                            onClick={() => setIsGlobalSearchOpen(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 4, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-100 shadow-2xl shadow-black/10 rounded-2xl overflow-hidden"
                                        >
                                            {globalSearchResults.length > 0 ? (
                                                <div className="py-2 max-h-80 overflow-y-auto">
                                                    {globalSearchResults.map((r, i) => (
                                                        <button
                                                            key={i}
                                                            type="button"
                                                            onClick={() => {
                                                                setActiveTab(r.tab);
                                                                if (r.tab === "products") setSearchQuery(globalSearchQuery);
                                                                setGlobalSearchQuery("");
                                                                setIsGlobalSearchOpen(false);
                                                            }}
                                                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                                                        >
                                                            <span className="text-xl flex-shrink-0">{r.icon}</span>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-sm font-bold text-gray-800 truncate group-hover:text-primary transition-colors">{r.label}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">{r.sub}</p>
                                                            </div>
                                                            <span className="flex-shrink-0 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-gray-100 text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">{r.type}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="py-8 text-center">
                                                    <p className="text-2xl mb-2">🔍</p>
                                                    <p className="text-sm font-bold text-gray-400">No results for "{globalSearchQuery}"</p>
                                                    <p className="text-[10px] text-gray-300 mt-1">Try a product name or branch</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </header>

                {/* Content Area */}
                <div className="p-6 lg:p-10 max-w-[1400px] mx-auto w-full">
                    <AnimatePresence mode="wait">
                        {/* ── OVERVIEW ──────────────────────────────────────── */}
                        {activeTab === "overview" && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-10"
                            >
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {[
                                        { label: "Gross Revenue", value: "$128,421", change: "+14.2%", icon: <DollarSign />, color: "bg-blue-500" },
                                        { label: "Weekly Orders", value: "348", change: "+5.1%", icon: <ShoppingBag />, color: "bg-accent" },
                                        { label: "Active Customers", value: "2,402", change: "+12.5%", icon: <Users />, color: "bg-purple-500" },
                                        { label: "Conversion Rate", value: "3.24%", change: "-0.8%", icon: <Activity />, color: "bg-orange-500" },
                                    ].map((stat, i) => (
                                        <GlassCard key={i} className="p-6 overflow-hidden group">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                                                    {stat.icon}
                                                </div>
                                                <div className={`text-[10px] font-black px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                    {stat.change}
                                                </div>
                                            </div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                            <h3 className="font-oswald font-black text-3xl tracking-tight">{stat.value}</h3>
                                        </GlassCard>
                                    ))}
                                </div>

                                {/* Charts Row */}
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                    <GlassCard className="xl:col-span-2 p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h3 className="font-oswald font-black text-xl uppercase tracking-tight">Revenue Analytics</h3>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Performance over last 7 months</p>
                                            </div>
                                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all">
                                                Monthly View <ChevronRight className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <ModernBarChart />
                                    </GlassCard>

                                    <GlassCard className="p-8">
                                        <h3 className="font-oswald font-black text-xl uppercase tracking-tight mb-2">Category Split</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">Sales distribution</p>
                                        <ModernDonutChart />
                                        <button className="w-full mt-6 py-3 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 hover:text-primary transition-all">
                                            View Detailed Report
                                        </button>
                                    </GlassCard>
                                </div>

                                {/* Bottom Row */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
                                    <GlassCard className="p-0 overflow-hidden">
                                        <div className="p-6 bg-white flex items-center justify-between border-b border-gray-100">
                                            <h3 className="font-oswald font-black text-xl uppercase tracking-tight">Recent Orders</h3>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Feed</span>
                                            </div>
                                        </div>
                                        <div className="divide-y divide-gray-50 max-h-[440px] overflow-y-auto">
                                            {([...demoOrders, ...orders]).slice().reverse().map((order: any, idx) => (
                                                <div key={order.id + idx} className="group p-5 flex items-center justify-between hover:bg-gray-50/80 transition-all cursor-pointer border-l-2 border-transparent hover:border-accent">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                                            {order.items && order.items[0] ? (
                                                                <img src={order.items[0].image} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center font-black text-[10px] text-gray-400">
                                                                    NA
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors truncate max-w-[180px]">
                                                                {order.items && order.items[0] ? order.items[0].title : `Order #${order.id.slice(-4)}`}
                                                                {order.items && order.items.length > 1 && <span className="text-xs text-gray-400 ml-1">+{order.items.length - 1} more</span>}
                                                            </p>
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{order.date}</p>
                                                                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                                                <p className="text-[10px] text-accent font-black uppercase tracking-widest">{order.userId.length > 10 ? order.userId.slice(0, 8) + '...' : order.userId}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0 ml-4">
                                                        <p className="font-oswald font-black text-lg text-primary">${typeof order.total === 'string' ? order.total : order.total.toFixed(2)}</p>
                                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-50 text-green-500' :
                                                            order.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                                                                order.status === 'Processing' ? 'bg-blue-50 text-blue-500' :
                                                                    'bg-gray-50 text-gray-400'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </GlassCard>

                                    <GlassCard className="p-8">
                                        <h3 className="font-oswald font-black text-xl uppercase tracking-tight mb-8">Performance Pulse</h3>
                                        <div className="space-y-8">
                                            {[
                                                { label: "Active Sessions", value: "842", progress: 65, color: "bg-blue-500" },
                                                { label: "Average Session", value: "4m 12s", progress: 42, color: "bg-accent" },
                                                { label: "Bounce Rate", value: "24.2%", progress: 24, color: "bg-purple-500" },
                                                { label: "Direct Sales", value: "$42,000", progress: 78, color: "bg-green-500" },
                                            ].map((pulse, i) => (
                                                <div key={i}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{pulse.label}</span>
                                                        <span className="font-oswald font-black text-sm">{pulse.value}</span>
                                                    </div>
                                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${pulse.progress}%` }}
                                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                                            className={`h-full ${pulse.color}`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </GlassCard>
                                </div>
                            </motion.div>
                        )}

                        {/* ── PRODUCTS ──────────────────────────────────────── */}
                        {activeTab === "products" && (
                            <motion.div key="products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="space-y-4 mb-8">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="relative flex-1 max-w-md w-full">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Filter by name, category, SKU..."
                                                className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <ModernSelect
                                                label="Category"
                                                icon={Filter}
                                                value={filterCategory}
                                                onChange={setFilterCategory}
                                                options={categories.map(cat => ({ label: cat, value: cat }))}
                                            />
                                            <ModernSelect
                                                label="Sort"
                                                icon={ArrowUpRight}
                                                value={sortBy}
                                                onChange={(val) => setSortBy(val as any)}
                                                options={[
                                                    { label: "Default", value: "none" },
                                                    { label: "Price: Low to High", value: "price-low" },
                                                    { label: "Price: High to Low", value: "price-high" },
                                                    { label: "Top Rated", value: "score" },
                                                ]}
                                            />
                                            <button
                                                onClick={() => setIsAddingProduct(true)}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-accent hover:shadow-xl hover:shadow-accent/20 transition-all transform active:scale-95"
                                            >
                                                <Plus className="h-4 w-4" /> Add Item
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <GlassCard className="overflow-hidden p-0 border-none shadow-xl">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100">
                                                    <th className="px-8 py-6">Identity</th>
                                                    <th className="px-6 py-6">Category</th>
                                                    <th className="px-6 py-6 text-center">Price</th>
                                                    <th className="px-6 py-6 text-center">Score</th>
                                                    <th className="px-8 py-6 text-right">Utility</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {filteredProducts.map((p) => (
                                                    <motion.tr layout key={p.id} className="hover:bg-gray-50/40 transition-colors group">
                                                        <td className="px-8 py-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="h-16 w-12 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                                                                    <img src={p.image} referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="font-bold text-sm text-primary truncate max-w-[200px]">{p.title}</p>
                                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SKU: STK-{p.id.slice(0, 4)}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                                {p.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="font-oswald font-black text-lg">{p.price} EGP</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="flex items-center justify-center gap-1.5">
                                                                <Star className="h-3 w-3 fill-accent text-accent" />
                                                                <span className="text-xs font-black">{p.rating}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button onClick={() => setEditingProduct(p)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary hover:border-primary transition-all">
                                                                    <Edit2 className="h-4 w-4" />
                                                                </button>
                                                                <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}

                        {/* ── SETTINGS ──────────────────────────────────────── */}
                        {activeTab === "settings" && (
                            <motion.div key="settings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="max-w-6xl space-y-8">
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                        <div className="space-y-8">
                                            <GlassCard className="p-8">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="p-3 bg-primary text-white rounded-2xl shadow-lg">
                                                        <Settings className="h-6 w-6" />
                                                    </div>
                                                    <h3 className="font-oswald font-black text-2xl uppercase tracking-tight">System Core</h3>
                                                </div>

                                                <div className="space-y-6">
                                                    {[
                                                        { key: "siteName", label: "Brand Identity", desc: "Global store name" },
                                                        { key: "tagline", label: "Slogan / Motto", desc: "SEO subtitle" },
                                                    ].map(({ key, label, desc }) => (
                                                        <div key={key} className="space-y-2">
                                                            <div className="flex justify-between">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary">{label}</label>
                                                                <span className="text-[10px] text-gray-400 font-bold">{desc}</span>
                                                            </div>
                                                            <input
                                                                value={(settings as any)[key]}
                                                                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                                                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-primary/5 transition-all"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </GlassCard>

                                            <GlassCard className="p-8">
                                                <h3 className="font-oswald font-black text-xl uppercase tracking-tight mb-8">Homepage Engine</h3>
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Hero Title Left</label>
                                                            <input
                                                                value={settings.heroTitleLeft}
                                                                onChange={(e) => setSettings({ ...settings, heroTitleLeft: e.target.value })}
                                                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Hero Title Right</label>
                                                            <input
                                                                value={settings.heroTitleRight}
                                                                onChange={(e) => setSettings({ ...settings, heroTitleRight: e.target.value })}
                                                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Hero Subtitle</label>
                                                        <textarea
                                                            value={settings.heroSubtitle}
                                                            onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                                                            rows={2}
                                                            className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm resize-none"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Hero Banner URL</label>
                                                        <input
                                                            value={settings.heroImage}
                                                            onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                                                            className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm"
                                                        />
                                                    </div>

                                                    {/* Featured Product Editing */}
                                                    <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">Featured Hero Carousel Item</h4>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Card Label</label>
                                                                <input
                                                                    value={settings.featuredProduct.topLabel}
                                                                    onChange={(e) => setSettings({
                                                                        ...settings,
                                                                        featuredProduct: { ...settings.featuredProduct, topLabel: e.target.value }
                                                                    })}
                                                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-xs"
                                                                    placeholder="Top of the hour"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Options (e.g. Gold / Silver)</label>
                                                                <input
                                                                    value={settings.featuredProduct.optionLabel}
                                                                    onChange={(e) => setSettings({
                                                                        ...settings,
                                                                        featuredProduct: { ...settings.featuredProduct, optionLabel: e.target.value }
                                                                    })}
                                                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Title</label>
                                                            <input
                                                                value={settings.featuredProduct.title}
                                                                onChange={(e) => setSettings({
                                                                    ...settings,
                                                                    featuredProduct: { ...settings.featuredProduct, title: e.target.value }
                                                                })}
                                                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-xs"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price (EGP)</label>
                                                                <input
                                                                    value={settings.featuredProduct.price}
                                                                    onChange={(e) => setSettings({
                                                                        ...settings,
                                                                        featuredProduct: { ...settings.featuredProduct, price: e.target.value }
                                                                    })}
                                                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-xs"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Photo URL</label>
                                                                <input
                                                                    value={settings.featuredProduct.image}
                                                                    onChange={(e) => setSettings({
                                                                        ...settings,
                                                                        featuredProduct: { ...settings.featuredProduct, image: e.target.value }
                                                                    })}
                                                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </div>

                                        <div className="space-y-8">
                                            <GlassCard className="p-8">
                                                <h3 className="font-oswald font-black text-xl uppercase tracking-tight mb-8">Footer Management</h3>
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">About Text</label>
                                                        <textarea
                                                            value={settings.footerAbout}
                                                            onChange={(e) => setSettings({ ...settings, footerAbout: e.target.value })}
                                                            rows={3}
                                                            className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm resize-none"
                                                        />
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Shop Section Links</label>
                                                            <button
                                                                type="button"
                                                                onClick={() => setSettings({
                                                                    ...settings,
                                                                    footerShopLinks: [...settings.footerShopLinks, { label: "New Link", to: "#" }]
                                                                })}
                                                                className="flex items-center gap-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-accent transition-all"
                                                            >
                                                                <span className="text-base leading-none">+</span> Add Link
                                                            </button>
                                                        </div>
                                                        {settings.footerShopLinks.map((link, i) => (
                                                            <div key={i} className="flex gap-2">
                                                                <input
                                                                    value={link.label}
                                                                    onChange={(e) => {
                                                                        const newLinks = [...settings.footerShopLinks];
                                                                        newLinks[i].label = e.target.value;
                                                                        setSettings({ ...settings, footerShopLinks: newLinks });
                                                                    }}
                                                                    placeholder="Label"
                                                                    className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-xs"
                                                                />
                                                                <input
                                                                    value={link.to}
                                                                    onChange={(e) => {
                                                                        const newLinks = [...settings.footerShopLinks];
                                                                        newLinks[i].to = e.target.value;
                                                                        setSettings({ ...settings, footerShopLinks: newLinks });
                                                                    }}
                                                                    placeholder="URL"
                                                                    className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-xs"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newLinks = settings.footerShopLinks.filter((_, idx) => idx !== i);
                                                                        setSettings({ ...settings, footerShopLinks: newLinks });
                                                                    }}
                                                                    className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Help Section Links */}
                                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Help Section Links</label>
                                                            <button
                                                                type="button"
                                                                onClick={() => setSettings({
                                                                    ...settings,
                                                                    footerHelpLinks: [...(settings.footerHelpLinks || []), { label: "New Link", to: "#" }]
                                                                })}
                                                                className="flex items-center gap-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-accent transition-all"
                                                            >
                                                                <span className="text-base leading-none">+</span> Add Link
                                                            </button>
                                                        </div>
                                                        {(settings.footerHelpLinks || []).map((link, i) => (
                                                            <div key={i} className="flex gap-2">
                                                                <input
                                                                    value={link.label}
                                                                    onChange={(e) => {
                                                                        const newLinks = [...settings.footerHelpLinks];
                                                                        newLinks[i].label = e.target.value;
                                                                        setSettings({ ...settings, footerHelpLinks: newLinks });
                                                                    }}
                                                                    placeholder="Label"
                                                                    className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-xs"
                                                                />
                                                                <input
                                                                    value={link.to}
                                                                    onChange={(e) => {
                                                                        const newLinks = [...settings.footerHelpLinks];
                                                                        newLinks[i].to = e.target.value;
                                                                        setSettings({ ...settings, footerHelpLinks: newLinks });
                                                                    }}
                                                                    placeholder="URL"
                                                                    className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-xs"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newLinks = settings.footerHelpLinks.filter((_, idx) => idx !== i);
                                                                        setSettings({ ...settings, footerHelpLinks: newLinks });
                                                                    }}
                                                                    className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Social Media Management */}
                                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Social Media Protocols</label>
                                                            <button
                                                                type="button"
                                                                onClick={() => setSettings({
                                                                    ...settings,
                                                                    socialLinks: [...settings.socialLinks, { platform: 'instagram', url: "" }]
                                                                })}
                                                                className="flex items-center gap-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-accent transition-all"
                                                            >
                                                                <span className="text-base leading-none">+</span> Link Account
                                                            </button>
                                                        </div>
                                                        {settings.socialLinks.map((link, i) => (
                                                            <div key={i} className="flex gap-4 items-center group relative" style={{ zIndex: 50 - i }}>
                                                                <SocialPlatformSelect
                                                                    value={link.platform}
                                                                    onChange={(val) => {
                                                                        const newLinks = [...settings.socialLinks];
                                                                        newLinks[i].platform = val as any;
                                                                        setSettings({ ...settings, socialLinks: newLinks });
                                                                    }}
                                                                    options={[
                                                                        { label: "Facebook", value: "facebook" },
                                                                        { label: "Instagram", value: "instagram" },
                                                                        { label: "TikTok", value: "tiktok" },
                                                                        { label: "WhatsApp", value: "whatsapp" },
                                                                        { label: "YouTube", value: "youtube" }
                                                                    ]}
                                                                />
                                                                <div className="flex-1 relative">
                                                                    <input
                                                                        value={link.url}
                                                                        onChange={(e) => {
                                                                            const newLinks = [...settings.socialLinks];
                                                                            newLinks[i].url = e.target.value;
                                                                            setSettings({ ...settings, socialLinks: newLinks });
                                                                        }}
                                                                        placeholder="Protocol URL / Handle"
                                                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-3 text-sm focus:ring-4 focus:ring-primary/5 transition-all"
                                                                    />
                                                                </div>
                                                                <button
                                                                    onClick={() => {
                                                                        const newLinks = settings.socialLinks.filter((_, idx) => idx !== i);
                                                                        setSettings({ ...settings, socialLinks: newLinks });
                                                                    }}
                                                                    className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                        <GlassCard className="p-8">
                                            <h3 className="font-oswald font-black text-xl uppercase tracking-tight mb-6">Security & Resilience</h3>
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between p-6 bg-gray-900 text-white rounded-3xl">
                                                    <div className="flex items-center gap-4">
                                                        <Activity className={`h-6 w-6 ${settings.maintenanceMode ? 'text-red-400' : 'text-green-400'}`} />
                                                        <div>
                                                            <p className="font-bold text-sm">Maintenance Protocol</p>
                                                            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Offline mode status</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                                                        className={`w-14 h-8 rounded-full transition-all relative ${settings.maintenanceMode ? 'bg-red-500' : 'bg-green-500'}`}
                                                    >
                                                        <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all ${settings.maintenanceMode ? 'translate-x-6' : ''}`} />
                                                    </button>
                                                </div>
                                            </div>
                                        </GlassCard>

                                        <GlassCard className="p-8 border-none bg-gradient-to-br from-primary to-[#4a3728] text-white flex flex-col justify-center">
                                            <h3 className="font-oswald font-black text-xl uppercase tracking-tight mb-4 text-white">Operations Engine</h3>
                                            <p className="text-white/60 text-sm mb-8 leading-relaxed">Changes to system core parameters take effect immediately. Ensure protocol review before syncing.</p>

                                            <button
                                                onClick={handleSaveSettings}
                                                disabled={saveStatus !== "idle"}
                                                className={`w-full py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-2xl mt-auto ${saveStatus === "saved"
                                                    ? "bg-green-500 text-white shadow-green-500/20"
                                                    : saveStatus === "saving"
                                                        ? "bg-white/10 text-white/50 cursor-wait"
                                                        : "bg-white text-primary hover:bg-accent hover:text-white hover:-translate-y-1"
                                                    }`}
                                            >
                                                {saveStatus === "saving" && <Activity className="h-4 w-4 animate-spin" />}
                                                {saveStatus === "saved" && <Check className="h-4 w-4" />}
                                                {saveStatus === "idle" && <Save className="h-4 w-4" />}
                                                {saveStatus === "idle" ? "Publish Changes" : saveStatus === "saving" ? "Optimizing..." : "Engine Updated"}
                                            </button>
                                        </GlassCard>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── BRANCHES ──────────────────────────────────────── */}
                        {activeTab === "branches" && (
                            <motion.div key="branches" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-oswald font-black text-3xl uppercase tracking-tighter">Branch Network</h3>
                                    <button
                                        onClick={() => setIsAddingBranch(true)}
                                        className="bg-black text-white px-8 py-3 rounded-2xl font-black text-xs uppercase hover:bg-accent transition-all flex items-center gap-2"
                                    >
                                        Establish New branch +
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {branches.map((branch) => (
                                        <GlassCard key={branch.id} className="group overflow-hidden">
                                            <div className="aspect-video relative overflow-hidden">
                                                <img src={branch.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                                <div className="absolute top-4 right-4 flex gap-2">
                                                    <button onClick={() => setEditingBranch(branch)} className="p-2 bg-white/90 backdrop-blur shadow-xl rounded-xl hover:bg-white text-primary">
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button onClick={() => deleteBranch(branch.id)} className="p-2 bg-white/90 backdrop-blur shadow-xl rounded-xl hover:bg-red-50 text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h4 className="font-oswald font-black text-xl uppercase mb-2">{branch.name}</h4>
                                                <p className="text-gray-500 text-xs mb-4 line-clamp-2">{branch.address}</p>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        <Smartphone className="h-3 w-3" /> {branch.phone}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        <Clock className="h-3 w-3" /> {branch.hours || "Not Specified"}
                                                    </div>
                                                    {branch.mapLink && (
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest">
                                                            <Link2 className="h-3 w-3" /> Map Protocol Active
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-6 flex flex-wrap gap-2">
                                                    {branch.whatsapp && (
                                                        <div className="px-3 py-1.5 bg-green-50 rounded-lg flex items-center gap-2">
                                                            <PhoneIcon className="h-3 w-3 text-green-500" />
                                                            <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">WhatsApp: {branch.whatsapp}</span>
                                                        </div>
                                                    )}
                                                    {branch.facebook && <FacebookIcon className="h-3.5 w-3.5 text-gray-400" />}
                                                    {branch.instagram && <InstagramIcon className="h-3.5 w-3.5 text-gray-400" />}
                                                    {branch.tiktok && (
                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </GlassCard>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Add/Edit Modals */}
                <AnimatePresence>
                    {
                        (editingProduct || isAddingProduct) && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }}
                                    className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden p-10 max-h-[90vh] overflow-y-auto no-scrollbar"
                                >
                                    <h3 className="font-oswald font-black text-3xl uppercase tracking-tighter mb-8">
                                        {isAddingProduct ? "New Collection Item" : "Refine Inventory"}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-6 mb-10">
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Product Name</label>
                                            <input
                                                value={isAddingProduct ? newProductForm.title : editingProduct?.title}
                                                onChange={(e) => isAddingProduct
                                                    ? setNewProductForm({ ...newProductForm, title: e.target.value })
                                                    : setEditingProduct({ ...editingProduct!, title: e.target.value })
                                                }
                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/5"
                                                placeholder="E.g. Vintage Velvet Gown"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Price (EGP)</label>
                                            <input
                                                type="number"
                                                value={isAddingProduct ? newProductForm.price : editingProduct?.price}
                                                onChange={(e) => isAddingProduct
                                                    ? setNewProductForm({ ...newProductForm, price: e.target.value })
                                                    : setEditingProduct({ ...editingProduct!, price: e.target.value })
                                                }
                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-black focus:ring-4 focus:ring-primary/5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Category</label>
                                            <input
                                                list="category-suggestions"
                                                value={isAddingProduct ? newProductForm.category : editingProduct?.category}
                                                onChange={(e) => isAddingProduct
                                                    ? setNewProductForm({ ...newProductForm, category: e.target.value })
                                                    : setEditingProduct({ ...editingProduct!, category: e.target.value })
                                                }
                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/5"
                                                placeholder="Select or type new..."
                                            />
                                            <datalist id="category-suggestions">
                                                {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat} />)}
                                            </datalist>
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Image URL</label>
                                            <div className="flex gap-4">
                                                <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                                                    <img
                                                        src={isAddingProduct ? newProductForm.image : editingProduct?.image}
                                                        referrerPolicy="no-referrer"
                                                        className="w-full h-full object-cover"
                                                        alt="Preview"
                                                    />
                                                </div>
                                                <input
                                                    value={isAddingProduct ? newProductForm.image : editingProduct?.image}
                                                    onChange={(e) => isAddingProduct
                                                        ? setNewProductForm({ ...newProductForm, image: e.target.value })
                                                        : setEditingProduct({ ...editingProduct!, image: e.target.value })
                                                    }
                                                    className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 text-xs font-mono focus:ring-4 focus:ring-primary/5"
                                                    placeholder="Paste image URL here..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={isAddingProduct ? handleAddProduct : handleUpdateProduct}
                                            className="flex-1 py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] bg-primary text-white hover:bg-accent transition-all hover:-translate-y-1 shadow-xl shadow-primary/20"
                                        >
                                            {isAddingProduct ? "Publish Item" : "Confirm Sync"}
                                        </button>
                                        <button
                                            onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }}
                                            className="px-10 py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] bg-gray-100 text-gray-400 hover:bg-gray-200 transition-all font-bold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )
                    }

                    {
                        (editingBranch || isAddingBranch) && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setEditingBranch(null); setIsAddingBranch(false); }} className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" />
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-10 max-h-[90vh] overflow-y-auto no-scrollbar">
                                    <h3 className="font-oswald font-black text-3xl uppercase tracking-tighter mb-8">{isAddingBranch ? "New Outpost" : "Update Facility"}</h3>
                                    <div className="space-y-6 mb-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Branch Name</label>
                                            <input
                                                value={isAddingBranch ? newBranchForm.name : editingBranch?.name}
                                                onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, name: e.target.value }) : setEditingBranch({ ...editingBranch!, name: e.target.value })}
                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Address</label>
                                            <input
                                                value={isAddingBranch ? newBranchForm.address : editingBranch?.address}
                                                onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, address: e.target.value }) : setEditingBranch({ ...editingBranch!, address: e.target.value })}
                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</label>
                                                <input
                                                    value={isAddingBranch ? newBranchForm.phone : editingBranch?.phone}
                                                    onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, phone: e.target.value }) : setEditingBranch({ ...editingBranch!, phone: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Operating Hours</label>
                                                <input
                                                    value={isAddingBranch ? newBranchForm.hours : editingBranch?.hours}
                                                    onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, hours: e.target.value }) : setEditingBranch({ ...editingBranch!, hours: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Visual DNA (Image URL)</label>
                                            <input
                                                value={isAddingBranch ? newBranchForm.image : editingBranch?.image}
                                                onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, image: e.target.value }) : setEditingBranch({ ...editingBranch!, image: e.target.value })}
                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-xs font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Map Protocol (Link)</label>
                                            <input
                                                value={isAddingBranch ? newBranchForm.mapLink : editingBranch?.mapLink}
                                                onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, mapLink: e.target.value }) : setEditingBranch({ ...editingBranch!, mapLink: e.target.value })}
                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-xs font-mono"
                                                placeholder="https://maps.google.com/..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">WhatsApp Number</label>
                                                <input
                                                    value={isAddingBranch ? newBranchForm.whatsapp : editingBranch?.whatsapp}
                                                    onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, whatsapp: e.target.value }) : setEditingBranch({ ...editingBranch!, whatsapp: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm"
                                                    placeholder="+20..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Facebook URL</label>
                                                <input
                                                    value={isAddingBranch ? newBranchForm.facebook : editingBranch?.facebook}
                                                    onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, facebook: e.target.value }) : setEditingBranch({ ...editingBranch!, facebook: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-xs font-mono"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Instagram URL</label>
                                                <input
                                                    value={isAddingBranch ? newBranchForm.instagram : editingBranch?.instagram}
                                                    onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, instagram: e.target.value }) : setEditingBranch({ ...editingBranch!, instagram: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-xs font-mono"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">TikTok URL</label>
                                                <input
                                                    value={isAddingBranch ? newBranchForm.tiktok : editingBranch?.tiktok}
                                                    onChange={(e) => isAddingBranch ? setNewBranchForm({ ...newBranchForm, tiktok: e.target.value }) : setEditingBranch({ ...editingBranch!, tiktok: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-xs font-mono"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={isAddingBranch ? handleAddBranch : handleUpdateBranch} className="flex-1 py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] bg-primary text-white hover:bg-black transition-all">
                                            {isAddingBranch ? "Deploy Branch" : "Commit Changes"}
                                        </button>
                                        <button onClick={() => { setEditingBranch(null); setIsAddingBranch(false); }} className="px-10 py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] bg-gray-100 text-gray-400">Cancel</button>
                                    </div>
                                </motion.div>
                            </div>
                        )
                    }


                </AnimatePresence >
            </main >
        </div >
    );
}
