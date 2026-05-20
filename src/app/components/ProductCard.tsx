import { ShoppingBag, Heart, Star, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  rating?: number;
  reviews?: number;
  tag?: string;
  tagColor?: string;
}

export function ProductCard({
  id,
  image,
  title,
  price,
  rating = 5,
  reviews = 0,
  tag,
  tagColor = "green",
}: ProductCardProps) {
  const navigate = useNavigate();
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleNavigate = () => navigate(`/product/${id}`);

  const tagBg =
    tagColor === "green"
      ? "bg-emerald-500"
      : tagColor === "red"
      ? "bg-rose-500"
      : tagColor === "accent"
      ? "bg-accent"
      : "bg-neutral-900";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleNavigate}
      className="group relative flex flex-col cursor-pointer"
      style={{ willChange: "transform" }}
    >
      {/* ── Image Wrapper ── */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 shadow-md group-hover:shadow-2xl transition-shadow duration-500">

        {/* Product Image */}
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Dark gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />

        {/* Tag Badge */}
        {tag && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className={`absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white rounded-full shadow-lg ${tagBg}`}
          >
            {tag}
          </motion.span>
        )}

        {/* Wishlist Button */}
        <motion.button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            setWished((w) => !w);
          }}
          whileTap={{ scale: 0.85 }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 shadow-lg border ${
            wished
              ? "bg-rose-500 border-rose-400 text-white shadow-rose-500/30"
              : "bg-white/80 border-white/50 text-neutral-500 hover:text-rose-500"
          }`}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
        </motion.button>

        {/* Hover bottom CTA bar */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="cta-bar"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 flex gap-2"
            >
              {/* Quick View */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/25 transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                Quick View
              </button>

              {/* Shop Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-colors shadow-lg"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Shop Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Content Area ── */}
      <div className="mt-4 px-1 flex flex-col gap-1">
        {/* Title */}
        <h3 className="font-oswald font-black text-sm uppercase tracking-wide text-neutral-900 line-clamp-1 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>

        {/* Stars + Price row */}
        <div className="flex items-center justify-between mt-0.5">
          {/* Stars */}
          {reviews > 0 ? (
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(rating) ? "fill-current" : "text-neutral-200 fill-neutral-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-neutral-400">({reviews})</span>
            </div>
          ) : (
            <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">New</span>
          )}

          {/* Price */}
          <span className="font-oswald font-black text-base tracking-tight text-neutral-900">
            {price}
            <span className="text-[10px] font-bold text-neutral-400 ml-1">EGP</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
