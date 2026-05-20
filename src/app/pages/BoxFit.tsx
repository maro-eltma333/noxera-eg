import { useState } from "react";
import { motion } from "motion/react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

const boxCategories = ["All", "Hoodies", "Tops", "Bottoms"];

const boxProducts = products.filter(
  (p) => !["Accessories"].includes(p.category)
);

const lookbookItems = [
  {
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    label: "The Signature Noxr Edit",
    desc: "100% Interlock Cotton heavyweight drape",
  },
  {
    img: "/images/boxfit_hero.png",
    label: "Dragon Streetwear",
    desc: "Heavy 320 GSM graphic tees with stiff structure",
  },
  {
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    label: "LV & Moncler Collaboration",
    desc: "Luxury details blended with premium crop boxy fits",
  },
];

export default function BoxFitPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? boxProducts
      : boxProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Full-bleed Hero */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <img
          src="/images/boxfit_hero.png"
          alt="BoxFit Collection"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent text-xs font-black uppercase tracking-widest rounded-full mb-4 border border-accent/30">
                <Sparkles className="h-4 w-4" /> Limited Drops / SS26
              </span>
              <h1 className="font-oswald font-black text-6xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] uppercase tracking-tighter leading-none text-white italic">
                BoxFit
              </h1>
            </div>
            <div className="max-w-sm">
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                Premium heavyweight interlock cotton cuts, custom shoulder drapes, and boxy fits designed for ultimate street presence.
              </p>
              <a
                href="https://wa.me/201026490075"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all duration-300 w-full sm:w-auto"
              >
                WhatsApp Inquiry <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lookbook Strip */}
      <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-oswald font-black text-2xl sm:text-3xl uppercase tracking-tight">Explore the Drops</h2>
          <a
            href="https://www.tiktok.com/@noxera_eg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-accent transition-colors"
          >
            View TikTok Showcase →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lookbookItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative group overflow-hidden cursor-pointer h-[320px] sm:h-[400px] rounded-lg"
            >
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-oswald font-bold text-lg sm:text-xl uppercase mb-1">{item.label}</h3>
                <p className="text-white/60 text-xs sm:text-sm">{item.desc}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Filter + Products */}
      <section className="border-t border-gray-100">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sticky Filter Bar */}
          <div className="sticky top-[80px] z-30 bg-white border-b border-gray-100 py-4">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
              {boxCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-all duration-200 ${
                    activeCategory === cat
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="flex-shrink-0 ml-auto text-xs text-gray-400 whitespace-nowrap">
                {filtered.length} items
              </span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="flex flex-col h-full"
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
                    <p className="text-[10px] uppercase tracking-widest text-accent mt-2 px-3 font-black">
                      {product.material}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-24 text-gray-400">
                <p className="font-oswald font-bold text-2xl uppercase">
                  No items in this category yet
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-black text-white py-20">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Official Contact</p>
          <h2 className="font-oswald font-black text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6">
            Limited Drops <br className="md:hidden" /> No Re-stocks
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-10 leading-relaxed text-sm sm:text-base">
            To inquire about custom sizing, bulk packaging, or upcoming limited drop notifications, connect with our support desk on WhatsApp.
          </p>
          <a
            href="https://wa.me/201026490075"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all duration-300"
          >
            Chat on WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
