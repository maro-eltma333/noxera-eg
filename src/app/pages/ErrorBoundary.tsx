import { useRouteError, isRouteErrorResponse, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { AlertTriangle, RefreshCw, Home, ChevronRight } from "lucide-react";

export default function ErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    let title = "Something went wrong";
    let message = "An unexpected error occurred. Please try again or go back home.";
    let code = "500";

    if (isRouteErrorResponse(error)) {
        code = String(error.status);
        if (error.status === 404) {
            title = "Page Not Found";
            message = "The page you're looking for doesn't exist or has been moved.";
        } else if (error.status === 403) {
            title = "Access Denied";
            message = "You don't have permission to view this page.";
        } else if (error.status === 503) {
            title = "Service Unavailable";
            message = "Our servers are temporarily down. Please try again in a moment.";
        } else {
            message = error.statusText || message;
        }
    } else if (error instanceof Error) {
        message = error.message;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 overflow-hidden relative">
            {/* Ambient background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-red-500/5 blur-[80px]"
                />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 max-w-xl w-full text-center">
                {/* Error Code */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="font-oswald font-black text-[120px] md:text-[180px] leading-none text-white/5 select-none tracking-tighter mb-0">
                        {code}
                    </p>
                </motion.div>

                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="-mt-16 mb-6 flex justify-center"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl scale-150" />
                        <div className="relative w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-9 w-9 text-red-400" />
                        </div>
                    </div>
                </motion.div>

                {/* Title & Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <h1 className="font-oswald font-black text-4xl md:text-5xl uppercase tracking-tight text-white mb-4 leading-tight">
                        {title}<span className="text-accent">.</span>
                    </h1>
                    <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                        {message}
                    </p>
                </motion.div>

                {/* Error detail (dev-like block) */}
                {error instanceof Error && error.stack && (
                    <motion.details
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mb-8 text-left"
                    >
                        <summary className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white/40 cursor-pointer transition-colors mb-2 select-none">
                            View Technical Details
                        </summary>
                        <pre className="bg-white/5 border border-white/10 rounded-2xl p-4 text-[10px] text-red-400/70 font-mono overflow-auto max-h-32 text-left leading-relaxed whitespace-pre-wrap break-all">
                            {error.stack.split("\n").slice(0, 6).join("\n")}
                        </pre>
                    </motion.details>
                )}

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] rounded-full font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                    >
                        <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </button>

                    <Link
                        to="/"
                        className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto justify-center"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                        <ChevronRight className="h-3 w-3 opacity-50 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Brand watermark */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-16 text-white/10 text-[10px] font-black uppercase tracking-[0.4em]"
                >
                    NOXERA<span className="text-accent/30">.</span>
                </motion.p>
            </div>
        </div>
    );
}
