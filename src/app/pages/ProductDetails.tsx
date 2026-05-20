import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  ArrowLeft,
  ShoppingBag,
  Check,
  MessageCircle,
  ChevronDown,
  Truck,
  RotateCcw,
  Shield,
  Sparkles,
  ZoomIn,
  X,
} from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (!product) navigate("/boxfit");
  }, [product, navigate]);

  if (!product) return null;

  const colors = product.colors || ["Black"];
  const sizes = product.sizes || ["M", "L", "XL", "2XL"];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [addedToBag, setAddedToBag] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (product.images) {
      const match = product.images.find(
        (img) => img.color.toLowerCase() === selectedColor.toLowerCase()
      );
      if (match) setActiveImage(match.image);
    }
  }, [selectedColor, product]);

  const getColorHex = (colorName: string) => {
    switch (colorName.toLowerCase()) {
      case "green": return "#1F4E3D";
      case "black": return "#111111";
      case "white": return "#F5F5F7";
      case "grey": return "#8E8E93";
      case "blue denim": return "#4A6B82";
      case "green ripstop": return "#2E4F3F";
      default: return "#777777";
    }
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    const compoundId = `${product.id}-${selectedColor.replace(/\s+/g, "")}-${selectedSize}`;
    addItem({
      id: compoundId,
      title: `${product.title} — ${selectedColor} / ${selectedSize}`,
      price: product.price,
      image: activeImage,
      color: selectedColor,
      size: selectedSize,
    });
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2500);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `مرحبا Noxera 👋\nاستفسار عن: ${product.title}\nاللون: ${selectedColor}${selectedSize ? `\nالمقاس: ${selectedSize}` : ""}`
    );
    return `https://wa.me/201026490075?text=${text}`;
  };

  const allImages = product.images
    ? product.images
    : [{ color: selectedColor, image: product.image }];

  const tagBg =
    product.tagColor === "green"
      ? "bg-[#1F4E3D]"
      : product.tagColor === "red"
      ? "bg-red-600"
      : product.tagColor === "accent"
      ? "bg-amber-500"
      : "bg-black";

  const accordionItems = [
    {
      key: "details",
      label: "Product Details",
      content: (
        <ul className="space-y-2.5 text-sm text-neutral-500 font-medium leading-relaxed">
          <li className="flex items-start gap-2.5"><span className="text-amber-500 mt-0.5">◆</span> Premium heavyweight cut explicitly drafted for streetwear.</li>
          <li className="flex items-start gap-2.5"><span className="text-amber-500 mt-0.5">◆</span> Stiff structured mock-neck collar stays tight over time.</li>
          <li className="flex items-start gap-2.5"><span className="text-amber-500 mt-0.5">◆</span> Dropped shoulders silhouette for absolute street presence.</li>
          <li className="flex items-start gap-2.5"><span className="text-amber-500 mt-0.5">◆</span> Designed & manufactured locally at Port Said, Egypt.</li>
        </ul>
      ),
    },
    {
      key: "specs",
      label: "Fabric & Specs",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Fabric", value: product.material || "100% Fine Combed Cotton" },
            { label: "Cut", value: "Oversized Crop / Boxy Fit" },
            { label: "Collar", value: "Heavy Flat-knit Mock Neck" },
            { label: "Preshrunk", value: "Yes — washed process complete" },
          ].map((row) => (
            <div key={row.label} className="bg-neutral-50 rounded-xl p-3">
              <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block mb-1">{row.label}</span>
              <span className="text-xs font-bold text-neutral-800">{row.value}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "shipping",
      label: "Shipping & Returns",
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Truck className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-black text-neutral-700 uppercase tracking-wider">Port Said Delivery</p>
              <p className="text-xs text-neutral-400 mt-0.5">24 – 48 Hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-black text-neutral-700 uppercase tracking-wider">Nationwide Egypt</p>
              <p className="text-xs text-neutral-400 mt-0.5">2 – 4 Business Days</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-black text-neutral-700 uppercase tracking-wider">Easy Exchange</p>
              <p className="text-xs text-neutral-400 mt-0.5">Size exchange at any official branch</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={activeImage}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white min-h-screen">

        {/* Top Nav Bar */}
        <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <button
              onClick={() => navigate("/boxfit")}
              className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>BoxFit <span className="hidden sm:inline">Drops</span></span>
            </button>
            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300">Noxera</span>
              <span className="text-neutral-200">/</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 truncate max-w-[200px]">{product.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#25D366] hover:opacity-80 transition-opacity"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <div className="h-4 w-px bg-neutral-200 hidden sm:block" />
              <button
                onClick={() => navigate("/boxfit")}
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
                title="Close"
              >
                <X className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_480px] min-h-[calc(100vh-56px)]">

            {/* ===== LEFT: GALLERY ===== */}
            <div className="relative bg-neutral-50">

              {/* Main Image */}
              <div className="lg:sticky lg:top-[136px] lg:h-[calc(100vh-136px)] flex flex-col">
                <div
                  className="relative flex-1 aspect-[4/5] sm:aspect-square lg:aspect-auto overflow-hidden cursor-zoom-in group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImage}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        src={activeImage}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                  </AnimatePresence>

                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-50/80 to-transparent pointer-events-none" />

                  {/* Zoom hint */}
                  <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="h-4 w-4 text-white" />
                  </div>

                  {/* Product Tag */}
                  {product.tag && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`absolute top-5 left-5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white rounded-full shadow-lg ${tagBg}`}
                    >
                      {product.tag}
                    </motion.span>
                  )}

                  {/* Color label on image */}
                  <div className="absolute bottom-16 left-5 right-5">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-neutral-400">
                      Colorway
                    </p>
                    <p className="font-oswald font-black text-2xl text-neutral-800 uppercase tracking-wider leading-none">
                      {selectedColor}
                    </p>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-2.5 p-4 overflow-x-auto no-scrollbar bg-white border-t border-neutral-100">
                    {allImages.map((img, i) => {
                      const isActive = img.image === activeImage;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveImage(img.image);
                            setSelectedColor(img.color);
                          }}
                          className={`relative flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                            isActive
                              ? "ring-2 ring-black ring-offset-1 opacity-100"
                              : "opacity-50 hover:opacity-80 hover:ring-1 hover:ring-neutral-300"
                          }`}
                        >
                          <img
                            src={img.image}
                            alt={img.color}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {isActive && (
                            <div className="absolute inset-x-0 bottom-0 bg-black py-0.5">
                              <p className="text-white text-[7px] font-black uppercase text-center tracking-wider truncate px-1">{img.color}</p>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ===== RIGHT: CONFIGURATION PANEL ===== */}
            <div
              ref={rightPanelRef}
              className="flex flex-col border-l border-neutral-100"
            >
              <div className="flex-1 px-6 lg:px-10 py-10 space-y-8 overflow-y-auto">

                {/* Category Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">
                      {product.category} / Limited Drop
                    </span>
                  </span>
                  {product.isTrending && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black rounded-full">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Trending</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h1 className="font-oswald font-black text-4xl sm:text-5xl uppercase tracking-tighter leading-[0.95] text-neutral-900 italic mb-3">
                    {product.title}
                  </h1>
                  {product.material && (
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      {product.material}
                    </p>
                  )}
                </div>

                {/* Price + Rating */}
                <div className="flex items-center justify-between py-5 border-y border-neutral-100">
                  <div>
                    <span className="font-oswald font-black text-4xl text-black tracking-tighter leading-none">
                      EGP {product.price}
                    </span>
                    <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1">
                      VAT Included · Free Port Said Delivery
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex justify-end gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-200 fill-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      {product.reviews} reviews
                    </span>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {product.description}
                  </p>
                )}

                {/* COLOR SWATCHES */}
                {colors.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                        Color:{" "}
                        <span className="text-neutral-900 font-black">{selectedColor}</span>
                      </span>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      {colors.map((color) => {
                        const isSelected = color === selectedColor;
                        const hex = getColorHex(color);
                        const isLight = color.toLowerCase() === "white";
                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            aria-label={`Select ${color}`}
                            title={color}
                            className={`relative group flex-shrink-0 transition-all duration-300 ${
                              isSelected ? "scale-110" : "hover:scale-105"
                            }`}
                          >
                            <div
                              className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shadow-sm transition-all ${
                                isSelected
                                  ? isLight
                                    ? "border-neutral-800 shadow-md"
                                    : "border-white shadow-md ring-2 ring-offset-2 ring-neutral-800"
                                  : isLight
                                  ? "border-neutral-200 hover:border-neutral-400"
                                  : "border-transparent hover:ring-2 hover:ring-offset-2 hover:ring-neutral-300"
                              }`}
                              style={{ backgroundColor: hex }}
                            >
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className={`w-2.5 h-2.5 rounded-full ${isLight ? "bg-black" : "bg-white"}`}
                                />
                              )}
                            </div>
                            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-wider text-neutral-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                              {color}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SIZE SELECTOR */}
                {sizes.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${sizeError ? "text-red-500" : "text-neutral-400"}`}>
                        {sizeError ? "⚠ Please select a size" : "Select Size"}
                      </span>
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#25D366] hover:opacity-80 transition-opacity"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Size Guide
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => {
                        const isSelected = size === selectedSize;
                        return (
                          <motion.button
                            key={size}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => { setSelectedSize(size); setSizeError(false); }}
                            className={`relative flex-1 min-w-[64px] max-w-[100px] py-4 text-xs font-black uppercase tracking-wider rounded-2xl transition-all duration-200 border-2 overflow-hidden ${
                              isSelected
                                ? "bg-black text-white border-black shadow-lg shadow-black/15"
                                : sizeError
                                ? "bg-red-50 text-red-400 border-red-200 hover:border-red-400"
                                : "bg-white text-neutral-600 border-neutral-150 hover:border-neutral-300 hover:bg-neutral-50"
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId="sizeIndicator"
                                className="absolute inset-0 bg-black"
                                style={{ zIndex: -1 }}
                              />
                            )}
                            {size}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* QUANTITY + ADD TO BAG */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    {/* Quantity */}
                    <div className="flex items-center bg-neutral-100 rounded-2xl px-1 shrink-0">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-12 flex items-center justify-center text-neutral-500 hover:text-black font-black text-lg transition-colors rounded-xl"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-sm text-neutral-900 select-none tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-12 flex items-center justify-center text-neutral-500 hover:text-black font-black text-lg transition-colors rounded-xl"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Bag CTA */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToBag}
                      className={`flex-1 relative h-14 font-black uppercase tracking-widest text-xs rounded-2xl transition-all duration-400 flex items-center justify-center gap-2 overflow-hidden ${
                        addedToBag
                          ? "bg-[#1F4E3D] text-white"
                          : "bg-black hover:bg-neutral-800 text-white shadow-xl shadow-black/20"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {addedToBag ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                          >
                            <Check className="h-4 w-4 stroke-[3]" /> Added to Bag!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                          >
                            <ShoppingBag className="h-4 w-4" /> Add to Bag
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-12 border-2 border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 text-[#128C7E] rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-200"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Order via WhatsApp
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 py-2">
                  {[
                    { icon: Shield, label: "Authentic", sub: "100% Original" },
                    { icon: Truck, label: "Fast Ship", sub: "2–4 Days Egypt" },
                    { icon: RotateCcw, label: "Easy Return", sub: "At any branch" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex flex-col items-center text-center p-3 bg-neutral-50 rounded-2xl">
                      <Icon className="h-5 w-5 text-amber-500 mb-1.5" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-700">{label}</span>
                      <span className="text-[9px] text-neutral-400 mt-0.5">{sub}</span>
                    </div>
                  ))}
                </div>

                {/* ACCORDION */}
                <div className="space-y-2 border-t border-neutral-100 pt-6">
                  {accordionItems.map((item) => (
                    <div
                      key={item.key}
                      className="border border-neutral-100 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setOpenAccordion(
                            openAccordion === item.key ? null : item.key
                          )
                        }
                        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-neutral-50 transition-colors"
                      >
                        <span className="text-xs font-black uppercase tracking-widest text-neutral-700">
                          {item.label}
                        </span>
                        <motion.div
                          animate={{ rotate: openAccordion === item.key ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ChevronDown className="h-4 w-4 text-neutral-400" />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {openAccordion === item.key && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-neutral-100 bg-white">
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Port Said Badge */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-amber-50/30 border border-amber-100 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-base">
                    🇪🇬
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                      Port Said Certified
                    </p>
                    <p className="text-xs text-neutral-500 leading-snug mt-0.5">
                      Crafted with passion so every piece expresses your personality.
                    </p>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-wider mt-1">
                      NO XERA · EG
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
