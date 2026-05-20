import { useState, useRef, useEffect } from "react";
import { ArrowRight, Download, ChevronRight, ChevronLeft, Play, Pause, Maximize, Minimize, Sparkles, Flame, Percent } from "lucide-react";
import { Hero } from "../components/Hero";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router";
import { products } from "../data/products";
import { motion } from "motion/react";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Bestsellers");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current;
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    }
  };

  // Set video to 4 seconds on load to show the preview frame
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 4;
    }
  }, []);

  // Simple mock filtering
  const filteredProducts = activeFilter === "Top Drops"
    ? products.filter(p => p.category === "Tops")
    : activeFilter === "New Arrivals"
      ? [...products].reverse()
      : products;

  return (
    <div className="bg-[#F9F9F9]">
      <Hero />

      {/* NEW: Special Offer Section */}
      <section className="bg-white overflow-hidden py-24 border-b border-gray-100 mb-16 relative">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-accent/5 -skew-x-12 transform translate-x-1/2" />
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-accent/20">
                <Sparkles className="h-4 w-4" /> FULL EMBROIDERY / تطريز بالكامل
              </div>
              <h2 className="font-oswald font-black text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-6 text-primary">
                noxera<span className="text-accent">.</span>
              </h2>

              {/* Embroidery Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">BOX FIT / OVERSIZED</span>
                  <span className="font-bold text-sm text-neutral-800 block mt-1">ستايل واسع لمظهر عصري</span>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">PREMIUM QUALITY</span>
                  <span className="font-bold text-sm text-neutral-800 block mt-1">قماش ثقيل وخامة فاخرة</span>
                </div>

                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">FULL EMBROIDERY</span>
                  <span className="font-bold text-sm text-neutral-800 block mt-1">EMBROIDERY بأعلى دقة</span>
                </div>

                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">FOR EVERYONE</span>
                  <span className="font-bold text-sm text-neutral-800 block mt-1">للولاد والبنات - ستايل للجميع</span>
                </div>
              </div>

              {/* Slogan */}
              <p className="text-neutral-500 text-base mb-8 leading-relaxed font-semibold italic text-right sm:text-left">
                كل قطعة بتنعمل بشغف عشان تعبر عن شخصيتك.
              </p>

              <Link
                to="/boxfit"
                className="group flex items-center justify-center md:justify-start gap-3 bg-black hover:bg-accent text-white px-12 py-5 font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-2xl shadow-black/10 w-full md:w-fit rounded-full"
              >
                SHOP NOW <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </motion.div>

            {/* Campaign Photo Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 aspect-[4/5] bg-gray-100">
                <img
                  src="https://scontent.fcai1-2.fna.fbcdn.net/v/t39.30808-6/686336917_122108364086814580_6677716961366853587_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEf4Gme8ciQoVYIKBB9i2_IrHys4H5FDresfKzgfkUOt4q7FjCuKuTY5qCiNdh63VFcGTWULItvFFa_NE4XQuUX&_nc_ohc=Id_wh-pJKfwQ7kNvwF2BNvG&_nc_oc=AdrA24hz8qwjqNBxYpbO2JrTnw3wly2ScKguWU_pRARMzOUswh_EjeTRzlhlVUEidJ0&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=mA_xzSX-v55mn_RBA0uvEg&_nc_ss=7e2a8&oh=00_Af44JhznpsU75xMcN7sADSAsBbGAkE_fb3bnV2_YEgqvDw&oe=6A12D419"
                  alt="Noxera Embroidery Campaign"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
                
                {/* Floating Slogan Top Left */}
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
                  <p className="text-[9px] font-black tracking-widest text-white uppercase">DON’T FOLLOW, CREATE.</p>
                </div>

                {/* Floating Slogan Bottom Left */}
                <div className="absolute bottom-6 left-6">
                  <p className="font-oswald font-black text-2xl tracking-widest text-white uppercase italic">NO XERA . E G</p>
                </div>
              </div>

              {/* Floating Sizing Card Bottom Right */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-xl z-20 border border-neutral-100 max-w-[240px]">
                <div className="space-y-3">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-accent block">NOXERA DEFINE</span>
                    <span className="font-black text-[11px] uppercase tracking-tight text-neutral-800 block">DETAILS THAT DEFINE</span>
                    <span className="font-bold text-[9px] text-gray-400 block mt-0.5">تفاصيل بتصنع الفرق</span>
                  </div>
                  <div className="h-px bg-neutral-100" />
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">SIZING</span>
                    <span className="font-bold text-xs text-black tracking-wider whitespace-nowrap">M / L / XL / 2XL</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: The Collection Showcase - Editorial Style */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="xl:col-span-4"
            >
              <div className="relative rounded-3xl overflow-hidden group shadow-2xl shadow-black/5 aspect-[3/4]">
                <img
                  src="https://scontent.fcai1-2.fna.fbcdn.net/v/t39.30808-6/678522025_122106966812814580_1613362949076485720_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF_ELeX-xwpSQgHxj_9NdFY6KQqUghFgq7opCpSCEWCrltD9QG9C0U478s2y-BeVozyaeELbWgluMaIkXpNAFGN&_nc_ohc=rU0ICHGDuRIQ7kNvwF3w1P8&_nc_oc=Adrt9-u0R70Zyx_fFiKq38urxSb41Xz_vWj5elTCw1-pAUTk2ML1mCnzh7kA2w-3ja0&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=U3nYtDLwNWdKv3qRNJhKxg&_nc_ss=7e2a8&oh=00_Af7EnUEZMdjR69JFbiM4eYtveP5FRddGi2pvmNRGAIgHLA&oe=6A12EDA7"
                  alt="LV Premium Box Fit Tee"
                  referrerPolicy="no-referrer"
                  width="400"
                  height="533"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  <h4 className="font-oswald font-black uppercase tracking-widest text-lg">LV Premium Box Fit Tee</h4>
                  <p className="text-xs font-bold text-white/80">Premium Heavyweight Quality</p>
                </div>
              </div>
            </motion.div>

            {/* Center Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="xl:col-span-4 text-center px-4"
            >
              <div className="inline-flex items-center justify-center mb-6">
                <span className="h-px w-8 bg-accent/40" />
                <span className="mx-4 text-xs font-black uppercase tracking-[0.2em] text-accent">The Signature Drop</span>
                <span className="h-px w-8 bg-accent/40" />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-black text-gray-900 uppercase leading-[1.1] mb-6">
                Bold streetwear <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">for every vibe</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                Premium box fit cuts and heavyweight materials thoughtfully designed to bring effortless street presence, comfort, and ultimate confidence to your daily rotation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <Link to="/craft-quality" className="group relative px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs overflow-hidden w-full sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Discover Drops <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </Link>

                <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                  <span className="font-oswald font-black text-3xl text-primary leading-none">#1</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">Voted</span>
                    <span className="text-xs font-bold text-gray-500 uppercase leading-none mt-0.5">Best Streetwear 2026</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="xl:col-span-4"
            >
              <div className="relative rounded-3xl overflow-hidden group shadow-2xl shadow-black/5 aspect-[3/4]">
                <img
                  src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670928019_17856257607690314_7084855395818442166_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFj2HAdjoXaBhmoMkzAXt1LEmR5w-grX3kSZHnD6CtfeUSQh_apu16f_NrzGSiF5ONwTxVljEgERLGyW11-GrsL&_nc_ohc=vkNbdcWVxiYQ7kNvwFAgDBZ&_nc_oc=AdovcMAHgeYIVmQWEVPj2HBso6TpFJ4jSnoqwGwJgMw9dxWesU3uZ0xux0Ry_0rXHAM&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=jk4D-C-37IXku1YfwCY77Q&_nc_ss=7e2a8&oh=00_Af5Ww4hcgl_hJW-XFaCk19rjiBuKvFXaxaFIUI9NGvMkTg&oe=6A12FE16"
                  alt="Box Fit Tee Collection"
                  referrerPolicy="no-referrer"
                  width="400"
                  height="533"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-4 border border-white/30 rounded-2xl z-10 pointer-events-none" />
                <div className="absolute bottom-[-10px] right-[-10px] bg-white p-6 rounded-tl-3xl z-20 shadow-[-10px_-10px_30px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                      <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670928019_17856257607690314_7084855395818442166_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFj2HAdjoXaBhmoMkzAXt1LEmR5w-grX3kSZHnD6CtfeUSQh_apu16f_NrzGSiF5ONwTxVljEgERLGyW11-GrsL&_nc_ohc=vkNbdcWVxiYQ7kNvwFAgDBZ&_nc_oc=AdovcMAHgeYIVmQWEVPj2HBso6TpFJ4jSnoqwGwJgMw9dxWesU3uZ0xux0Ry_0rXHAM&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=jk4D-C-37IXku1YfwCY77Q&_nc_ss=7e2a8&oh=00_Af5Ww4hcgl_hJW-XFaCk19rjiBuKvFXaxaFIUI9NGvMkTg&oe=6A12FE16" alt="Box Fit Tee" referrerPolicy="no-referrer" width="48" height="48" loading="lazy" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Trending Now</p>
                      <p className="text-sm font-bold text-primary">Box Fit Tees</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Product Grid */}
      <section className="bg-[#fcfbf9] py-24 border-y border-gray-100 relative">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl sm:text-5xl font-oswald font-black uppercase text-gray-900 mb-3">Handpicked Styles</h2>
              <p className="text-gray-500 text-lg">Designed for heavy presence and premium street aesthetic.</p>
            </div>
            <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-full">
              <button
                onClick={() => setActiveFilter("Bestsellers")}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors ${activeFilter === "Bestsellers" ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-primary"}`}
              >
                Bestsellers
              </button>
              <button
                onClick={() => setActiveFilter("New Arrivals")}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors ${activeFilter === "New Arrivals" ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-primary"}`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveFilter("Top Drops")}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors ${activeFilter === "Top Drops" ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-primary"}`}
              >
                Top Drops
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/boxfit" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full text-xs font-black uppercase tracking-widest transition-all">
              View All Styles
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Cinematic / Testimonial Experience */}
      <section className="bg-primary text-white py-0 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Text/Testimonial Side */}
          <div className="px-8 py-20 lg:py-32 lg:px-20 flex flex-col justify-center relative z-10 bg-gradient-to-br from-primary to-primary/95">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Sparkles className="w-64 h-64" />
            </div>

            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-oswald font-black mb-8 uppercase leading-[1.1] text-white">
                Premium streetwear,<br /> <span className="text-accent">ready to drop.</span>
              </h2>
              <p className="text-gray-300 text-lg mb-12 max-w-lg leading-relaxed">
                Join thousands of streetwear enthusiasts who wear Noxera daily. Heavy fleece box-fit drops designed to stand out in any room.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex-1 relative group hover:bg-white/10 transition-colors">
                  <div className="flex text-accent mb-3 gap-1">
                    {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-4 h-4 fill-accent" />)}
                  </div>
                  <p className="text-sm text-gray-200 italic mb-4">"The 500 GSM weight is insane! Sits perfectly crop-box fit and stays thick after multiple washes. Noxera is on top."</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">— Omar K. (Mansoura)</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex-1 relative group hover:bg-white/10 transition-colors">
                  <div className="flex text-accent mb-3 gap-1">
                    {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-4 h-4 fill-accent" />)}
                  </div>
                  <p className="text-sm text-gray-200 italic mb-4">"Fast delivery and absolute premium packaging. Limited drops make it super exclusive, no one else has my fits!"</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">— Youssef M. (Cairo)</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cinematic Video Side */}
          <div className="relative h-[70vh] lg:h-auto lg:min-h-[600px] w-full bg-black overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              src="/images/VID.mp4"
              muted
              loop
              playsInline
              preload="auto"
              poster=""
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
            />

            {/* Play / Pause Button */}
            <motion.button
              onClick={toggleVideo}
              whileTap={{ scale: 0.9 }}
              className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-300 ${
                isPlaying ? "bg-transparent hover:bg-black/10" : "bg-black/40"
              }`}
            >
              <motion.div
                initial={false}
                animate={{ scale: isPlaying ? 0 : 1, opacity: isPlaying ? 0 : 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-black/30"
              >
                <Play className="h-8 w-8 text-black ml-1" fill="black" />
              </motion.div>
            </motion.button>

            {/* Pause indicator on hover when playing */}
            {isPlaying && (
              <motion.button
                onClick={toggleVideo}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <Pause className="h-6 w-6 text-white" fill="white" />
                </div>
              </motion.button>
            )}

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg"
              title="Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
