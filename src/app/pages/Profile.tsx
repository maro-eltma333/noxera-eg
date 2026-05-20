import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Lock, Eye, EyeOff, Check, AlertCircle, Edit2, X, Save, ShoppingBag, LogOut, PackageCheck, Settings, Camera, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import { useNavigate, Link } from "react-router";

export default function ProfilePage() {
    const { user, isLoggedIn, updateProfile, changePassword, logout } = useAuth();
    const { getUserOrders } = useOrders();
    const navigate = useNavigate();

    const [editingField, setEditingField] = useState<"name" | "email" | null>(null);
    const [nameInput, setNameInput] = useState(user?.name || "");
    const [emailInput, setEmailInput] = useState(user?.email || "");

    const [pwdOpen, setPwdOpen] = useState(false);
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [pwdMsg, setPwdMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [updateMsg, setUpdateMsg] = useState("");

    // Redirect if not logged in
    if (!isLoggedIn) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
                    <User className="h-10 w-10 text-gray-300" />
                </div>
                <h2 className="font-oswald font-black text-4xl uppercase tracking-tight">Access Restricted</h2>
                <p className="text-gray-500 max-w-xs leading-relaxed">Please log in to your Noxera account to view and manage your profile.</p>
                <Link to="/login" className="bg-black text-white px-12 py-4 font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all duration-300 shadow-xl shadow-black/10">
                    Sign In
                </Link>
            </div>
        );
    }

    const myOrders = getUserOrders(user?.id || "");

    const handleUpdateProfile = () => {
        if (editingField === "name") {
            if (!nameInput.trim()) return;
            updateProfile({ name: nameInput.trim() });
            setUpdateMsg("Name updated successfully!");
        } else if (editingField === "email") {
            if (!emailInput.trim() || !emailInput.includes("@")) return;
            updateProfile({ email: emailInput.trim() });
            setUpdateMsg("Email updated successfully!");
        }
        setEditingField(null);
        setTimeout(() => setUpdateMsg(""), 3000);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setPwdMsg(null);
        if (newPwd !== confirmPwd) {
            setPwdMsg({ type: "error", text: "New passwords don't match." });
            return;
        }
        if (newPwd.length < 3) {
            setPwdMsg({ type: "error", text: "Password must be at least 3 characters." });
            return;
        }
        const result = changePassword(oldPwd, newPwd);
        setPwdMsg({ type: result.success ? "success" : "error", text: result.message });
        if (result.success) {
            setOldPwd("");
            setNewPwd("");
            setConfirmPwd("");
            setTimeout(() => setPwdOpen(false), 1800);
        }
    };

    const statItems = [
        { label: "Orders Placed", value: myOrders.length.toString(), color: "text-accent" },
        { label: "Wishlist Items", value: "8", color: "text-red-500" },
        { label: "Noxera Points", value: "340", color: "text-amber-500" },
        { label: "Elite Member", value: "Silver", color: "text-slate-400" },
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-32">
            {/* Modern Header Section */}
            <div className="bg-[#111111] pt-32 pb-48 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2" />
                <div className="absolute -bottom-24 left-0 w-full h-48 bg-[#FDFDFD] -skew-y-3 origin-bottom-left" />

                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-center md:items-end justify-between gap-12"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Modern Avatar with Edit Icon */}
                            <div className="relative group">
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-accent to-black rounded-[2.5rem] flex items-center justify-center text-white font-oswald font-black text-6xl shadow-2xl relative z-10">
                                    {user?.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer">
                                    <Camera className="text-white h-8 w-8" />
                                </div>
                                <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] blur-2xl -z-10" />
                            </div>

                            <div className="text-center md:text-left space-y-2">
                                <p className="text-accent font-black uppercase tracking-[0.4em] text-xs">Aesthetic Member</p>
                                <h1 className="font-oswald font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tighter leading-none">{user?.name}</h1>
                                <p className="text-white/40 text-lg font-medium">Member since {user?.joinedAt}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => { logout(); navigate("/"); }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:border-red-500 transition-all duration-300 flex items-center gap-3 group"
                        >
                            Log Out <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
                {/* Modern Stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
                    {statItems.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] shadow-xl shadow-black/[0.03] border border-gray-100 text-center"
                        >
                            <div className={`font-oswald font-black text-4xl mb-1 ${s.color}`}>{s.value}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Settings */}
                    <div className="lg:col-span-4 space-y-8">
                        <section className="bg-white p-5 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-black/[0.03] border border-gray-100">
                            <h2 className="font-oswald font-black text-2xl uppercase tracking-tight mb-10 flex items-center gap-3">
                                <Settings className="h-6 w-6 text-accent" /> Profile Settings
                            </h2>

                            <div className="space-y-8">
                                {/* Name Edit */}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">Full Name</label>
                                    {editingField === "name" ? (
                                        <div className="space-y-3">
                                            <input
                                                value={nameInput}
                                                onChange={(e) => setNameInput(e.target.value)}
                                                className="w-full bg-gray-50 border-2 border-accent border-transparent px-5 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                                                autoFocus
                                            />
                                            <div className="flex gap-2">
                                                <button onClick={handleUpdateProfile} className="flex-1 bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors"><Save className="h-4 w-4" /> Save</button>
                                                <button onClick={() => setEditingField(null)} className="px-4 border-2 border-gray-100 rounded-xl hover:border-black transition-colors"><X className="h-4 w-4" /></button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl group cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => { setEditingField("name"); setNameInput(user?.name || ""); }}>
                                            <div className="flex items-center gap-4">
                                                <User className="h-5 w-5 text-gray-300" />
                                                <span className="font-bold text-sm">{user?.name}</span>
                                            </div>
                                            <Edit2 className="h-4 w-4 text-gray-300 group-hover:text-accent transition-colors" />
                                        </div>
                                    )}
                                </div>

                                {/* Email Edit */}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">Email Address</label>
                                    {editingField === "email" ? (
                                        <div className="space-y-3">
                                            <input
                                                value={emailInput}
                                                onChange={(e) => setEmailInput(e.target.value)}
                                                className="w-full bg-gray-50 border-2 border-accent border-transparent px-5 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                                                autoFocus
                                            />
                                            <div className="flex gap-2">
                                                <button onClick={handleUpdateProfile} className="flex-1 bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors"><Save className="h-4 w-4" /> Save</button>
                                                <button onClick={() => setEditingField(null)} className="px-4 border-2 border-gray-100 rounded-xl hover:border-black transition-colors"><X className="h-4 w-4" /></button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl group cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => { setEditingField("email"); setEmailInput(user?.email || ""); }}>
                                            <div className="flex items-center gap-4">
                                                <Mail className="h-5 w-5 text-gray-300" />
                                                <span className="font-bold text-sm">{user?.email}</span>
                                            </div>
                                            <Edit2 className="h-4 w-4 text-gray-300 group-hover:text-accent transition-colors" />
                                        </div>
                                    )}
                                </div>

                                {updateMsg && (
                                    <motion.p
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-green-600 text-xs font-black uppercase bg-green-50 p-4 rounded-xl flex items-center gap-2"
                                    >
                                        <Check className="h-4 w-4" /> {updateMsg}
                                    </motion.p>
                                )}
                            </div>
                        </section>

                        {/* Security Card */}
                        <section className="bg-white p-5 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-black/[0.03] border border-gray-100 overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-oswald font-black text-2xl uppercase tracking-tight flex items-center gap-3">
                                    <Lock className="h-6 w-6 text-accent" /> Security
                                </h2>
                                <button
                                    onClick={() => setPwdOpen(!pwdOpen)}
                                    className="p-3 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all"
                                >
                                    {pwdOpen ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
                                </button>
                            </div>

                            <AnimatePresence>
                                {pwdOpen ? (
                                    <motion.form
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        onSubmit={handleChangePassword}
                                        className="space-y-4"
                                    >
                                        {pwdMsg && (
                                            <div className={`flex items-center gap-3 text-xs p-4 rounded-xl border ${pwdMsg.type === "success" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"}`}>
                                                {pwdMsg.type === "success" ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                                <span className="font-bold uppercase tracking-tight">{pwdMsg.text}</span>
                                            </div>
                                        )}
                                        <div className="relative">
                                            <input
                                                type={showOld ? "text" : "password"}
                                                value={oldPwd}
                                                onChange={(e) => setOldPwd(e.target.value)}
                                                placeholder="Current Password"
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-accent px-5 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all pr-12"
                                            />
                                            <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                {showOld ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showNew ? "text" : "password"}
                                                value={newPwd}
                                                onChange={(e) => setNewPwd(e.target.value)}
                                                placeholder="New Password"
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-accent px-5 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all pr-12"
                                            />
                                            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        <input
                                            type="password"
                                            value={confirmPwd}
                                            onChange={(e) => setConfirmPwd(e.target.value)}
                                            placeholder="Confirm New Password"
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-accent px-5 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                                        />
                                        <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all duration-300 shadow-xl shadow-black/10">
                                            Apply New Password
                                        </button>
                                    </motion.form>
                                ) : (
                                    <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl opacity-60">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                                            <Lock className="h-5 w-5 text-gray-300" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</p>
                                            <p className="font-black tracking-[0.5em] text-gray-300">••••••••</p>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </section>
                    </div>

                    {/* Right Column: Orders */}
                    <div className="lg:col-span-8">
                        <section className="bg-white p-5 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-xl shadow-black/[0.03] border border-gray-100 h-full">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                                <h2 className="font-oswald font-black text-4xl uppercase tracking-tighter flex items-center gap-4">
                                    <ShoppingBag className="h-10 w-10 text-accent" /> Checkout History
                                </h2>
                                <span className="px-5 py-2 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    {myOrders.length} Total Orders
                                </span>
                            </div>

                            {myOrders.length === 0 ? (
                                <div className="py-32 text-center">
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <PackageCheck className="h-10 w-10 text-gray-200" />
                                    </div>
                                    <p className="text-gray-400 font-black uppercase tracking-widest text-sm mb-6">Your wardrobe looks empty</p>
                                    <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all duration-300">
                                        Start Your Style Journey
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {myOrders.map((order) => (
                                        <motion.div
                                            key={order.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="bg-[#FDFDFD] p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 hover:border-accent hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group"
                                        >
                                            <div className="flex flex-wrap justify-between gap-8 mb-10">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Identifier</span>
                                                    <span className="font-oswald font-bold text-lg tracking-tight">#{order.id.slice(-8).toUpperCase()}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Timeline</span>
                                                    <span className="font-bold text-sm">{order.date}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Status</span>
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                        <Check className="h-3 w-3" /> {order.status}
                                                    </span>
                                                </div>
                                                <div className="space-y-1 text-right">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Investment</span>
                                                    <span className="font-oswald font-black text-2xl text-black">EGP {order.total.toLocaleString()}</span>
                                                </div>
                                            </div>
                                                                                  {/* Order Items Preview */}
                                            <div className="flex items-center justify-between border-t border-gray-50 pt-6 mt-6">
                                                <div className="flex -space-x-4">
                                                    {order.items.slice(0, 4).map((item, idx) => (
                                                        <div key={idx} className="w-16 h-20 rounded-xl overflow-hidden border-4 border-white shadow-lg relative z-0 hover:z-10 hover:scale-110 transition-all cursor-pointer">
                                                            <img src={item.image} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt={item.title} />
                                                        </div>
                                                    ))}
                                                    {order.items.length > 4 && (
                                                        <div className="w-16 h-20 rounded-xl bg-gray-100 border-4 border-white flex items-center justify-center font-black text-xs text-gray-400 relative z-0">
                                                            +{order.items.length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={`https://wa.me/201026490075?text=Hello%20Noxera%2C%20I%20have%20an%20inquiry%20regarding%20my%20order%20%23${order.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                                                    >
                                                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.497.003 9.967-4.468 9.97-9.97.002-2.665-1.034-5.171-2.917-7.056C16.442 1.703 13.939.666 11.279.666c-5.498 0-9.968 4.469-9.971 9.97-.001 1.83.486 3.62 1.412 5.2l-.93 3.398 3.475-.912zm12.91-4.82c-.107-.18-.395-.29-.828-.507-.432-.217-2.555-1.262-2.945-1.407-.39-.145-.675-.217-.96.217-.286.435-1.107 1.407-1.356 1.696-.25.29-.497.325-.93.108-.432-.217-1.826-.673-3.478-2.148-1.284-1.147-2.152-2.564-2.404-3-.252-.435-.027-.67.19-.886.195-.195.432-.507.648-.76.217-.253.29-.434.432-.723.145-.29.072-.542-.036-.76-.108-.217-.96-2.316-1.317-3.184-.348-.84-.704-.726-.96-.74l-.815-.014c-.282 0-.74.106-1.127.53-.388.423-1.48 1.447-1.48 3.529 0 2.08 1.514 4.09 1.726 4.38.212.29 2.98 4.549 7.218 6.373 1.008.434 1.796.693 2.41.888 1.012.32 1.934.275 2.662.166.81-.12 2.555-.957 2.917-1.882.363-.925.363-1.718.255-1.898z" />
                                                        </svg>
                                                        WhatsApp Support
                                                    </a>
                                                    <button className="p-4 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all group-hover:bg-accent group-hover:text-white">
                                                        <ChevronRight className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
