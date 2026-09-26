import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BiTimeFive, 
  BiUser, 
  BiChevronDown, 
  BiChevronUp,
  BiCheckCircle,
  BiMobileAlt
} from "react-icons/bi";
import TopHeader from "../components/layout/TopHeader";
import BotHeader from "../components/layout/BotHeader";
import Footer from "../components/layout/Footer";
import Testimonials from "../components/ui/Testimonials";

const articlesData = [

 
 
  {
    id: 4,
    title: "Top 5 Mobile Gaming Beasts Under 30,000 EGP in 2026",
    author: "Youssef 'Gamer' Hassan",
    role: "Mobile Gaming Analyst",
    date: "Aug 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop",
    summary: "Evaluating frame stability, bypass charging features, and liquid cooling performance in mid-range flagships.",
    content: `
      You don't need to spend 60,000+ EGP to enjoy locked 120 FPS in PUBG Mobile or Genshin Impact. The mid-range flagship segment in 2026 offers incredible value for performance enthusiasts.

      1. Poco F7 Pro: Packed with a dedicated graphics display chip and Snapdragon 8 series power, delivering continuous high-frame gameplay without frame drops.
      2. Realme GT 7 Pro: Outstanding stainless-steel vapor chamber cooling that keeps skin temperatures under 41°C during intense gaming sessions.
      3. Xiaomi 14T: Features bypass charging technology, sending power directly to the motherboard without routing through the battery, reducing heat during plugged-in sessions.

      All five top recommendations are stocked at Sonny Store with official local warranty and gaming accessory bundles.
    `,
  },
  {
    id: 5,
    title: "Tempered Glass vs Hydrogel vs Privacy Films: Which Screen Protector Wins?",
    author: "Sarah El-Sayed",
    role: "Accessories Product Manager",
    date: "Aug 09, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1000&auto=format&fit=crop",
    summary: "Real drop-test results and ultrasonic fingerprint sensor compatibility breakdowns.",
    content: `
      Choosing the right screen protection depends on your daily environment and device screen curvature.

      • 9H Tempered Glass: Offers superior impact absorption against direct drops on hard concrete. Recommended for flat-screen phones like iPhone 16/17 series and Galaxy S26 flat models.
      • Self-Healing Hydrogel: Ideal for curved edge displays. While it offers lower impact resistance against sharp drops, it heals minor key scratches automatically within 24 hours.
      • Privacy Tempered Glass: Limits side viewing angles to protect sensitive data in public. Note that privacy films slightly reduce maximum screen brightness outdoors and may require re-registering ultrasonic fingerprints.
    `,
  },

  {
    id: 7,
    title: "GaN Fast Chargers vs Cheap Adapters: Protecting Your Phone's IC Chip",
    author: "Omar Farouk",
    role: "Electrical & Accessories Specialist",
    date: "Aug 01, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1000&auto=format&fit=crop",
    summary: "Why Gallium Nitride (GaN) technology prevents motherboard power IC burnouts.",
    content: `
      Using low-quality, uncertified wall chargers is the number one cause of power IC chip burnouts and motherboard failures in modern smartphones.

      Cheap adapters lack voltage ripple filters. When power surges occur on the electrical grid, unstable current flows straight into your smartphone's power management integrated circuit (PMIC), leading to sudden device death.

      GaN (Gallium Nitride) chargers use advanced semiconductor material that conducts higher voltages with minimal heat generation. They include smart PD (Power Delivery) handshakes that negotiate exact voltage requirements with your phone before transmitting power.
    `,
  },
  {
    id: 8,
    title: "Seamless Data Migration: Android to iOS & iOS to Android Guide",
    author: "Nourhan Ali",
    role: "Customer Support Specialist",
    date: "Jul 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1000&auto=format&fit=crop",
    summary: "Complete zero-data-loss guide for transferring WhatsApp, gallery media, and app data.",
    content: `
      Switching ecosystems no longer means losing your valuable chat history or family photos.

      • Move to iOS Official App: Connect both devices to the same local Wi-Fi network and keep screens active. Ensure your WhatsApp account is backed up directly inside the app settings before starting transfer.
      • Cable Transfer (Fastest): Using a direct Type-C to Type-C cable speeds up 100GB+ transfers by 4x compared to wireless transfer.
      • Password Syncing: Export your passwords via encrypted CSV or sync through cross-platform managers like Bitwarden or Google Passwords for instant login on your new device.
    `,
  },
];

export default function BlogPage() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="[direction:ltr] text-left bg-white text-[#0f172a]">
        <TopHeader/>
        <BotHeader/>
      {/* 1️⃣ Hero Header Section */}
      <section className="bg-[linear-gradient(135deg,#0b1736_0%,#0f172a_100%)] py-20 px-5 text-white text-center">
        <motion.div 
          className="max-w-[800px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-[#0088ff]/15 text-[#0088ff] border border-[#0088ff]/30 py-[6px] px-4 rounded-[30px] text-[0.8rem] font-bold inline-flex items-center gap-2 mb-[18px]"><BiMobileAlt /> SONNY TECH JOURNAL</span>
          <h1 className="text-[2rem] sm:text-[2.6rem] font-extrabold mb-[14px]">Expert Smartphone Guides & Technical Insights</h1>
          <p className="text-[#94a3b8] text-[1.05rem] leading-[1.6]">Unbiased comparisons, hardware maintenance advice, and official warranty guides straight from our engineering team.</p>
        </motion.div>
      </section>

      {/* 2️⃣ Articles Section */}
      <section className="max-w-[900px] -mt-10 mx-auto mb-[60px] px-5 relative z-[5]">
        <div className="flex justify-center gap-5 flex-wrap">
          {articlesData.map((article, index) => {
            const isExpanded = expandedId === article.id;

            return (
              <motion.article 
                key={article.id}
                className={`bg-white rounded-[18px] overflow-hidden border border-[#e2e8f0] shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color] duration-300 ease-in-out hover:border-[#cbd5e1] hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)] ${isExpanded ? "expanded" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Image Header */}
                <div className="relative w-full h-[220px] sm:h-[320px] overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,rgba(15,23,42,0.4)_100%)]"></div>
                </div>

                {/* Article Content */}
                <div className="p-5 sm:p-8">
                  {/* Meta Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0088ff]/10 text-[#0088ff] rounded-full flex items-center justify-center text-[1.2rem]"><BiUser /></div>
                      <div>
                        <span className="font-bold text-[0.95rem] text-[#0f172a] block">{article.author}</span>
                        <span className="text-[0.78rem] text-[#0088ff] font-semibold block">{article.role}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#64748b] text-[0.85rem]">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1"><BiTimeFive /> {article.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-[1.3rem] sm:text-[1.6rem] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">{article.title}</h2>
                  <p className="text-[#475569] text-base leading-[1.6] mb-5">{article.summary}</p>

                  {/* Complete Full Text Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        className="overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="h-[1px] bg-[#e2e8f0] my-5"></div>
                        {article.content.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx} className="text-[#334155] text-[0.98rem] leading-[1.7] mb-4 whitespace-pre-line">{paragraph}</p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand/Collapse Button */}
                  <button 
                    className="bg-transparent text-[#0088ff] border border-[#0088ff]/30 py-[10px] px-5 rounded-lg font-bold text-[0.9rem] cursor-pointer inline-flex items-center gap-[6px] transition-all duration-200 ease-in-out mt-[10px] hover:bg-[#0088ff] hover:text-white hover:border-[#0088ff]" 
                    onClick={() => toggleExpand(article.id)}
                  >
                    {isExpanded ? (
                      <>Collapse Article <BiChevronUp /></>
                    ) : (
                      <>Read Full Complete Article <BiChevronDown /></>
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 3️⃣ Trust Footer Note */}
      <section className="max-w-[900px] mx-auto px-5">
        <div className="bg-[#0b1736] text-[#94a3b8] py-5 px-6 rounded-xl flex items-center gap-[14px] text-[0.9rem]">
          <BiCheckCircle className="text-[#38bdf8] text-[1.8rem] shrink-0" />
          <p>All articles and technical guides are authored by Sonny Store’s certified mobile engineers and product auditors.</p>
        </div>
      </section>
      <Testimonials/>
      <Footer/>
    </div>
  );
}