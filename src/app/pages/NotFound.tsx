import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-12"
            >
                <span className="text-[12rem] md:text-[20rem] font-oswald font-black text-[#f3f3f3] leading-none select-none">
                    404
                </span>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 md:pt-16">
                    <h1 className="text-3xl md:text-5xl font-oswald font-bold uppercase tracking-tighter text-primary">
                        Lost in Style
                    </h1>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-md"
            >
                <p className="text-gray-500 mb-10 leading-relaxed">
                    The page you're searching for seems to have slipped out of our collection.
                    Don't worry, even the best styles sometimes go missing.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white px-8 py-4 font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-accent/20"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-black px-8 py-4 font-bold uppercase tracking-wider transition-all duration-300"
                    >
                        Explore Shop <ShoppingBag className="h-4 w-4" />
                    </Link>
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="mt-20 flex gap-8 opacity-20 hidden md:flex">
                <div className="w-px h-24 bg-primary"></div>
                <div className="w-px h-24 bg-primary mt-8"></div>
                <div className="w-px h-24 bg-primary"></div>
            </div>
        </div>
    );
}
