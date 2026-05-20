import { ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useCart } from "../context/CartContext";

// Images
const heroImage = "https://web.facebook.com/photo?fbid=122108363270814580";
const ringImage = "/images/Gold Ring.jpg";

export function Hero() {
  const { settings } = useSiteSettings();
  const { addItem } = useCart();
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-4 max-w-[90rem] mx-auto">
      {/* Background Text */}
      <div className="absolute top-[15%] left-0 w-full pointer-events-none select-none z-0 hidden xl:block overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex gap-24 font-oswald font-black text-[#1A1A1A] text-[clamp(6rem,11vw,12rem)] leading-[0.75] tracking-tighter opacity-[0.05] whitespace-nowrap w-max"
        >
          <span>{settings.heroTitleLeft} {settings.heroTitleRight}</span>
          <span>{settings.heroTitleLeft} {settings.heroTitleRight}</span>
          <span>{settings.heroTitleLeft} {settings.heroTitleRight}</span>
          <span>{settings.heroTitleLeft} {settings.heroTitleRight}</span>
        </motion.div>
      </div>
 
       {/* Mobile Title (visible only on small screens) */}
       <div className="xl:hidden text-center mb-6">
         <h1 className="font-oswald font-black text-[#1A1A1A] text-4xl sm:text-5xl leading-[0.9] tracking-tighter mb-2 italic">{settings.heroTitleLeft}</h1>
         <h1 className="font-oswald font-black text-[#1A1A1A] text-4xl sm:text-5xl leading-[0.9] tracking-tighter italic">{settings.heroTitleRight}</h1>
       </div>

      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 items-center mt-4 xl:mt-32">
        {/* Left Content */}
        <div className="xl:col-span-3 flex flex-col justify-end h-full space-y-8 order-2 xl:order-1">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Link to="/boxfit" className="group inline-flex items-center gap-3 bg-primary hover:bg-accent text-white px-8 py-4 font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 rounded-xl">
              Get Styled <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <p className="text-gray-500 font-medium max-w-[220px] leading-relaxed text-sm">
              {settings.heroSubtitle}
            </p>
          </motion.div>
 
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-8 xl:pt-16"
          >
            <div className="flex -space-x-3 mb-4">
              <img className="w-11 h-11 rounded-full border-[3px] border-white shadow-md" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User 1" width="44" height="44" loading="lazy" />
              <img className="w-11 h-11 rounded-full border-[3px] border-white shadow-md" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User 2" width="44" height="44" loading="lazy" />
              <div className="w-11 h-11 rounded-full border-[3px] border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[11px] font-black text-gray-600 shadow-md">+2k</div>
            </div>
            <p className="font-black text-gray-900 leading-tight text-[15px]">
              Well designed and well printed only for you
            </p>
            <Link to="/craft-quality" className="inline-flex items-center gap-1.5 mt-3 text-sm font-black text-gray-700 hover:text-accent transition-colors duration-200 group">
              Collection <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
          </motion.div>
        </div>
 
        {/* Center Image */}
        <div className="xl:col-span-6 relative flex justify-center order-1 xl:order-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 rounded-t-[6.25rem] overflow-hidden shadow-2xl max-w-[25rem] w-full aspect-[3/4]"
          >
            <img
              src={settings.heroImage || heroImage}
              alt="Fashion Model highlighting trending styles"
              width="800"
              height="1067"
              className="w-full h-full object-cover object-top"
              // @ts-ignore - React < 18.3 requires lowercase, but TS expects camelCase
              fetchpriority="high"
            />
          </motion.div>
          {/* Decorative shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#F0EBE5] rounded-full blur-3xl -z-10 opacity-60"></div>
        </div>
 
        {/* Right Product Card */}
        <div className="xl:col-span-3 flex flex-col justify-center items-center xl:items-start h-full order-3 mt-8 xl:mt-0">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 shadow-2xl rounded-2xl w-full max-w-[24rem] border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] uppercase font-black text-gray-400 tracking-widest">{settings.featuredProduct.topLabel}</span>
              <div className="flex gap-1 text-[11px] font-black tracking-widest">
                <span className="text-accent">{settings.featuredProduct.optionLabel.split('/')[0].trim()}</span>
                {settings.featuredProduct.optionLabel.includes('/') && <span className="text-gray-300">/</span>}
                {settings.featuredProduct.optionLabel.includes('/') && (
                  <span className="text-gray-500">{settings.featuredProduct.optionLabel.split('/')[1].trim()}</span>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-oswald font-black text-2xl sm:text-3xl uppercase tracking-tighter leading-none text-gray-900">
                {settings.featuredProduct.title}
              </h3>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden mb-5">
              <img 
                src={settings.featuredProduct.image} 
                alt={settings.featuredProduct.title} 
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover object-top" 
                loading="lazy" 
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-oswald font-black text-3xl sm:text-4xl tracking-tighter">
                {settings.featuredProduct.price} <span className="text-lg text-gray-400 ml-1">EGP</span>
              </span>
              <button
                onClick={() => addItem({
                  id: "featured-1",
                  title: settings.featuredProduct.title,
                  price: settings.featuredProduct.price,
                  image: settings.featuredProduct.image
                })}
                className="flex items-center gap-2 bg-black text-white px-5 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-accent hover:-translate-y-0.5 transition-all duration-300 rounded-xl shadow-lg shadow-black/10"
              >
                Add to Cart <ShoppingBag className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
