import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Leaf, Award, Layers, SlidersHorizontal } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { ScrollGrid } from "../components/ui/ScrollGrid";

const craftProducts = products.filter((p) => p.material);
const categories = ["All", ...Array.from(new Set(craftProducts.map(p => p.category)))];

const pillars = [
    {
        icon: <Leaf className="h-7 w-7" />,
        title: "Bold Streetwear Design",
        description: "We create box-fit streetwear pieces that stand out — built for confidence, attitude, and everyday wear.",
    },
    {
        icon: <Layers className="h-7 w-7" />,
        title: "Premium Craft & Embroidery",
        description: "From heavy cotton fabrics to detailed embroidery, every piece is made to feel premium and look powerful.",
    },
    {
        icon: <CheckCircle className="h-7 w-7" />,
        title: "Quality You Can Trust",
        description: "Every item is carefully checked to ensure perfect stitching, fit, and durability before it reaches you.",
    },
    {
        icon: <Award className="h-7 w-7" />,
        title: "Limited & Unique Drops",
        description: "We don't mass produce. Every drop is limited, making each piece exclusive and part of a special release.",
    },
];

const processSteps = [
    { num: "01", title: "Design", desc: "We sketch bold streetwear concepts inspired by youth culture and modern trends." },
    { num: "02", title: "Fabric Selection", desc: "We choose high-quality cotton and materials that fit the boxy streetwear style." },
    { num: "03", title: "Production", desc: "Each piece is cut, sewn, and embroidered with attention to detail." },
    { num: "04", title: "Final Check", desc: "Every product is inspected to make sure it matches the Noxera standard before shipping." },
];

export default function CraftQualityPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const filtered = activeFilter === "All" ? craftProducts : craftProducts.filter(p => p.category === activeFilter);

    return (
        <div className="bg-white">
            {/* Hero Scroll Grid */}
            <ScrollGrid />

            {/* Pillars of Quality */}
            <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-14">
                    <h2 className="font-oswald font-black text-4xl uppercase tracking-tight mb-3">Our Commitment</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Four pillars that define the Noxera identity.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group p-8 border border-gray-100 hover:border-accent hover:shadow-lg transition-all duration-300"
                        >
                            <div className="text-accent mb-5 group-hover:scale-110 transition-transform duration-300">{pillar.icon}</div>
                            <h3 className="font-oswald font-bold text-lg uppercase tracking-tight mb-2">{pillar.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* The Process */}
            <section className="bg-[#f7f5f2] py-20">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-oswald font-black text-4xl uppercase tracking-tight mb-12 text-center">From Idea to Outfit</h2>
                    <div className="relative">
                        <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gray-300" />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {processSteps.map((step, i) => (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15, duration: 0.5 }}
                                    className="relative text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white font-oswald font-black text-2xl mb-5 relative z-10">
                                        {step.num}
                                    </div>
                                    <h3 className="font-oswald font-bold text-xl uppercase mb-2">{step.title}</h3>
                                    <p className="text-gray-500 text-sm">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern Filter Bar */}
            <section className="py-8 border-y border-gray-100 bg-white sticky top-[80px] z-30">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-neutral-400 mr-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">Filter</span>
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                                        activeFilter === cat
                                            ? "bg-neutral-900 text-white shadow-lg shadow-black/15"
                                            : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800"
                                    }`}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </div>
                        <span className="ml-auto text-xs font-bold text-neutral-400 whitespace-nowrap">
                            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
                        </span>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="font-oswald font-black text-3xl uppercase tracking-tight">Shop the Collection</h2>
                        <p className="text-gray-500 mt-1">Each piece crafted with intention</p>
                    </div>
                    <span className="text-sm text-gray-400">{craftProducts.length} pieces</span>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filtered.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07, duration: 0.4 }}
                            >
                                <ProductCard
                                    id={product.id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    tag={product.tag}
                                    tagColor={product.tagColor}
                                    rating={product.rating}
                                    reviews={product.reviews}
                                />
                                {product.material && (
                                    <p className="text-[10px] uppercase tracking-widest text-accent mt-2 px-1 font-bold">{product.material}</p>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
                {filtered.length === 0 && (
                    <div className="text-center py-24 text-gray-400">
                        <p className="font-oswald font-bold text-2xl uppercase">No items in this category yet</p>
                    </div>
                )}
            </section>
        </div>
    );
}
