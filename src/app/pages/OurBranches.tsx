import { motion } from "motion/react";
import { MapPin, Phone, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";

import { useBranches } from "../context/BranchContext";

export default function OurBranches() {
    const { branches } = useBranches();
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1800&q=80"
                    alt="Noxera Store"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                <div className="relative z-10 text-center px-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-accent font-bold uppercase tracking-[0.3em] text-sm mb-4"
                    >
                        Visit Us Today
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-oswald font-black text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tighter leading-none"
                    >
                        Our Branches
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-1.5 w-32 bg-accent mx-auto mt-8"
                    />
                </div>
            </section>

            {/* Branches Grid */}
            <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {branches.map((branch, i) => (
                        <motion.div
                            key={branch.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={branch.image}
                                    alt={branch.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-4 left-4 right-4 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500">
                                    <a
                                        href={branch.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-white text-black py-3 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-colors shadow-lg"
                                    >
                                        View on Maps <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="font-oswald font-bold text-2xl uppercase tracking-tight mb-4 group-hover:text-accent transition-colors">
                                    {branch.name}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                                        <p className="text-gray-600 text-sm leading-relaxed">{branch.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-accent shrink-0" />
                                        <p className="text-gray-600 text-sm font-medium">{branch.phone}</p>
                                    </div>
                                    {branch.whatsapp && (
                                        <div className="flex items-center gap-3">
                                            <svg className="h-5 w-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            <p className="text-gray-600 text-sm">{branch.whatsapp}</p>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-accent shrink-0" />
                                        <p className="text-gray-600 text-sm">{branch.hours}</p>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center gap-4 mt-8 pb-8 border-b border-gray-100">
                                    {branch.facebook && (
                                        <a href={branch.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-[#1877F2] hover:text-white transition-all duration-300">
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </a>
                                    )}
                                    {branch.instagram && (
                                        <a href={branch.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-white transition-all duration-300">
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                            </svg>
                                        </a>
                                    )}
                                    {branch.tiktok && (
                                        <a href={branch.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-black hover:text-white transition-all duration-300">
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512">
                                                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                            </svg>
                                        </a>
                                    )}
                                    {branch.mapLink && (
                                        <a href={branch.mapLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-accent hover:text-white transition-all duration-300">
                                            <MapPin className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>

                                <a
                                    href={branch.whatsapp ? `https://wa.me/${branch.whatsapp.replace('+', '')}` : `https://m.me/noxera_eg`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-8 text-black font-black uppercase text-xs tracking-widest hover:text-accent transition-colors group/link"
                                >
                                    Contact Store <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="bg-primary py-24">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-oswald font-black text-4xl md:text-6xl text-white uppercase tracking-tighter mb-6">
                        Find a Store Near You
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto mb-12 text-lg">
                        Our stores are designed to provide an immersive shopping experience. Come visit us and explore our latest collections in person.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/boxfit"
                            className="bg-accent text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto"
                        >
                            Shop Online
                        </Link>
                        <button className="border-2 border-white/20 text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
                            Customer Support
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
