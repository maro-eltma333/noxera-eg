import { X, Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { products } from "../data/products";
import { Link } from "react-router";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredProducts = searchTerm.trim() === ""
    ? []
    : products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-oswald font-bold text-3xl tracking-tighter uppercase">Search</span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-10">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-4 text-2xl font-bold border-b-2 border-gray-200 focus:border-black outline-none bg-transparent placeholder:text-gray-300 transition-colors"
              />
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto pb-8">
              {searchTerm.trim() === "" ? (
                <div className="text-center mt-20 text-gray-400">
                  <p className="text-lg">Start typing to search</p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block w-full">Popular Searches</span>
                    {["Hoodies", "Tops", "Bottoms", "Outerwear"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchTerm(term)}
                        className="px-4 py-2 bg-gray-100 hover:bg-black hover:text-white rounded-full text-sm font-medium transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div>
                  <p className="text-sm text-gray-500 mb-6">{filteredProducts.length} results found</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <Link to="#" key={product.id} className="group flex flex-col gap-2" onClick={onClose}>
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
                          <img
                            src={product.image}
                            alt={product.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase truncate group-hover:text-accent transition-colors">{product.title}</h4>
                          <span className="text-sm text-gray-500">{product.price} EGP</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center mt-20 text-gray-500">
                  <p>No results found for "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
