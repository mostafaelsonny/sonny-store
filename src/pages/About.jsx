import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  BiShieldQuarter,
  BiRocket,
  BiSupport,
  BiChip,
  BiCheckCircle,
} from "react-icons/bi";
import TopHeader from "../components/layout/TopHeader";
import BotHeader from "../components/layout/BotHeader";
import Footer from "../components/layout/Footer";

// Animated Counter Component
function Counter({ from = 0, to, duration = 2 }) {
  const [count, setCount] = useState(from);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const timelineData = [
  {
    year: "2022",
    title: "The Vision Born",
    description:
      "Started as a tech hub reviewing flagship smartphones and mobile innovations.",
  },
  {
    year: "2024",
    title: "Sonny Store Launch",
    description:
      "Transformed into an official e-commerce store offering original devices with guaranteed warranty.",
  },
  {
    year: "2025",
    title: "50K+ Happy Customers",
    description:
      "Expanded delivery network to serve over 50,000 satisfied mobile enthusiasts.",
  },
  {
    year: "2026",
    title: "Next-Gen AI E-Commerce",
    description:
      "Integrated real-time database syncing, smart filters, and ultra-fast shopping flow.",
  },
];

const brandLogos = [
  "Apple",
  "Samsung",
  "Huawei",
  "Google",
  "Xiaomi",
  "Realme",
  "Oppo",
  "OnePlus",
  "Vivo",
  "Infinix",
];

export default function AboutPage() {
  const containerRef = useRef(null);

  // Scroll Progress for Interactive Line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <div className="[direction:ltr] text-left bg-[#f8fafc] text-[#0f172a] overflow-x-hidden">
      <TopHeader />
      <BotHeader />
      {/* 1️⃣ Floating Tech Hero Section */}
      <section className="bg-[linear-gradient(135deg,#0b1736_0%,#0f172a_100%)] pt-[50px] sm:pt-[60px] md:pt-[80px] px-4 sm:px-[20px] pb-[70px] sm:pb-[80px] md:pb-[100px] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] min-[901px]:grid-cols-[1.1fr_0.9fr] gap-[30px] sm:gap-[40px] md:gap-[50px] items-center text-center min-[901px]:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="bg-[rgba(0,136,255,0.15)] text-[#0088ff] border border-[rgba(0,136,255,0.3)] py-[6px] px-[12px] sm:px-[14px] rounded-[30px] text-[0.75rem] sm:text-[0.85rem] font-bold inline-flex items-center gap-[6px] sm:gap-[8px] mb-[16px] sm:mb-[20px]">
              <BiChip /> MODERN MOBILE ECOSYSTEM
            </span>
            <h1 className="text-[1.85rem] sm:text-[2.3rem] md:text-[2.8rem] font-[800] leading-[1.25] mb-[16px] sm:mb-[18px] text-white">Driven By Technology. Built For Flagships.</h1>
            <p className="text-[#94a3b8] text-[0.95rem] sm:text-[1.05rem] leading-[1.6] mb-[20px] sm:mb-[24px]">
              At Sonny Store, we don't just sell phones—we deliver the ultimate
              smartphone experience. From top-tier flagships to certified
              official warranties, your tech journey starts here.
            </p>
            <div className="flex gap-[12px] sm:gap-[16px] flex-wrap justify-center min-[901px]:justify-start">
              <span className="flex items-center gap-[6px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] py-[6px] sm:py-[8px] px-[12px] sm:px-[16px] rounded-[8px] text-[0.8rem] sm:text-[0.85rem] text-[#38bdf8]">
                <BiCheckCircle /> Official Warranty
              </span>
              <span className="flex items-center gap-[6px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] py-[6px] sm:py-[8px] px-[12px] sm:px-[16px] rounded-[8px] text-[0.8rem] sm:text-[0.85rem] text-[#38bdf8]">
                <BiCheckCircle /> 100% Original Devices
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute w-full max-w-[280px] aspect-square bg-[#0088ff] blur-[60px] sm:blur-[90px] opacity-30 rounded-full"></div>
            <motion.img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop"
              alt="Flagship Phone"
              className="w-full max-w-[320px] sm:max-w-[360px] rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative z-[2] object-cover"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Interactive Counter Section */}
      <section className="max-w-[1100px] -mt-[40px] mx-auto mb-[60px] md:mb-[80px] px-4 sm:px-[20px] relative z-10">
        <div className="bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[20px] p-[20px] sm:p-[32px] rounded-[16px] border border-[#e2e8f0] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="text-center">
            <h3 className="text-[1.8rem] sm:text-[2.2rem] font-[800] text-[#0088ff] mb-[4px]">
              <Counter to={50} />
              K+
            </h3>
            <p className="text-[#64748b] text-[0.85rem] sm:text-[0.9rem] font-[600]">Original Devices Sold</p>
          </div>
          <div className="text-center">
            <h3 className="text-[1.8rem] sm:text-[2.2rem] font-[800] text-[#0088ff] mb-[4px]">
              <Counter to={99} />%
            </h3>
            <p className="text-[#64748b] text-[0.85rem] sm:text-[0.9rem] font-[600]">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <h3 className="text-[1.8rem] sm:text-[2.2rem] font-[800] text-[#0088ff] mb-[4px]">
              <Counter to={24} />
              /7
            </h3>
            <p className="text-[#64748b] text-[0.85rem] sm:text-[0.9rem] font-[600]">Technical Support</p>
          </div>
          <div className="text-center">
            <h3 className="text-[1.8rem] sm:text-[2.2rem] font-[800] text-[#0088ff] mb-[4px]">
              <Counter to={100} />%
            </h3>
            <p className="text-[#64748b] text-[0.85rem] sm:text-[0.9rem] font-[600]">Official Warranty</p>
          </div>
        </div>
      </section>

      <section className="w-full my-[60px] md:my-[100px] py-[30px] md:py-[40px] bg-transparent overflow-hidden flex flex-col items-center relative [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
        <div className="text-center mb-[30px] md:mb-[60px] px-4">
          <span className="text-[#0088ff] font-bold text-[0.8rem] sm:text-[0.85rem] tracking-[1px]">OUR BRANDS</span>
          <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-[800] text-[#0f172a] mt-[6px]">The Journey Behind Sonny BRANDS</h2>
        </div>
        <div className="flex gap-[36px] sm:gap-[60px] w-max animate-[scrollMarquee_25s_linear_infinite]">
          {/* بنكرر القائمة مرتين عشان الأنيميشن يفضل شغال بـ Infinite Loop بدون أي قطعية */}
          {[...brandLogos, ...brandLogos].map((brand, index) => (
            <div key={index} className="flex items-center justify-center text-[1.6rem] sm:text-[1.85rem] md:text-[2.1rem] font-[800] text-[#64748b] tracking-[1px] whitespace-nowrap transition duration-300 ease-in-out cursor-default select-none hover:text-[#0088ff] hover:scale-[1.08]">
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </section>
      {/* 3️⃣ Interactive Timeline Section with Scroll Line */}
      <section className="max-w-[900px] mx-auto mb-[60px] md:mb-[100px] px-4 sm:px-[20px]" ref={containerRef}>
        <div className="text-center mb-[40px] md:mb-[60px]">
          <span className="text-[#0088ff] font-bold text-[0.8rem] sm:text-[0.85rem] tracking-[1px]">OUR EVOLUTION</span>
          <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-[800] text-[#0f172a] mt-[6px]">The Journey Behind Sonny Store</h2>
        </div>

        <div className="relative py-[20px] before:content-[''] before:absolute before:top-0 before:left-[16px] sm:before:left-[20px] md:before:left-1/2 before:-translate-x-1/2 before:w-[3px] before:h-full before:bg-[#e2e8f0]">
          <motion.div
            className="absolute top-0 left-[16px] sm:left-[20px] md:left-1/2 -translate-x-1/2 w-[3px] bg-[#0088ff] z-[2] shadow-[0_0_10px_#0088ff]"
            style={{ height: lineHeight }}
          />

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className={`flex relative mb-[36px] sm:mb-[50px] w-full pl-[36px] sm:pl-[50px] pr-0 justify-start md:w-1/2 ${index % 2 === 0 ? "md:justify-end md:pr-[40px] md:pl-0" : "md:ml-auto md:justify-start md:pl-[40px] md:pr-0"}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[#0b1736] text-white p-[18px] sm:p-[24px] rounded-[12px] shadow-[0_10px_25px_rgba(11,23,54,0.12)] border border-[rgba(255,255,255,0.05)] w-full">
                <span className="text-[#0088ff] font-[800] text-[1rem] sm:text-[1.1rem] block mb-[6px]">{item.year}</span>
                <h3 className="text-[1.05rem] sm:text-[1.15rem] font-bold mb-[8px]">{item.title}</h3>
                <p className="text-[#94a3b8] text-[0.85rem] sm:text-[0.9rem] leading-[1.5]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4️⃣ Glassmorphism Value Cards */}
      <section className="max-w-[1100px] mx-auto mb-[60px] md:mb-[100px] px-4 sm:px-[20px]">
        <div className="text-center mb-[40px] md:mb-[60px]">
          <span className="text-[#0088ff] font-bold text-[0.8rem] sm:text-[0.85rem] tracking-[1px]">WHY SONNY STORE</span>
          <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-[800] text-[#0f172a] mt-[6px]">Built for Smartphone Enthusiasts</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[20px] md:gap-[24px]">
          <motion.div
            className="bg-white p-[20px] sm:p-[28px] md:p-[32px] rounded-[16px] border border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="w-[44px] sm:w-[52px] h-[44px] sm:h-[52px] bg-[rgba(0,136,255,0.1)] text-[#0088ff] text-[1.4rem] sm:text-[1.6rem] flex items-center justify-center rounded-[12px] mb-[16px] sm:mb-[20px]">
              <BiShieldQuarter />
            </div>
            <h3 className="text-[1.05rem] sm:text-[1.15rem] font-bold text-[#0f172a] mb-[8px] sm:mb-[10px]">Certified Warranty</h3>
            <p className="text-[#64748b] text-[0.85rem] sm:text-[0.9rem] leading-[1.6]">
              Direct coverage from official brand agents with seamless repair
              and replacement support.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-[20px] sm:p-[28px] md:p-[32px] rounded-[16px] border border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="w-[44px] sm:w-[52px] h-[44px] sm:h-[52px] bg-[rgba(0,136,255,0.1)] text-[#0088ff] text-[1.4rem] sm:text-[1.6rem] flex items-center justify-center rounded-[12px] mb-[16px] sm:mb-[20px]">
              <BiRocket />
            </div>
            <h3 className="text-[1.05rem] sm:text-[1.15rem] font-bold text-[#0f172a] mb-[8px] sm:mb-[10px]">Express Delivery</h3>
            <p className="text-[#64748b] text-[0.85rem] sm:text-[0.9rem] leading-[1.6]">
              Ultra-fast logistics ensuring your flagship device reaches your
              hands safely in no time.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-[20px] sm:p-[28px] md:p-[32px] rounded-[16px] border border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="w-[44px] sm:w-[52px] h-[44px] sm:h-[52px] bg-[rgba(0,136,255,0.1)] text-[#0088ff] text-[1.4rem] sm:text-[1.6rem] flex items-center justify-center rounded-[12px] mb-[16px] sm:mb-[20px]">
              <BiSupport />
            </div>
            <h3 className="text-[1.05rem] sm:text-[1.15rem] font-bold text-[#0f172a] mb-[8px] sm:mb-[10px]">Mobile Experts Support</h3>
            <p className="text-[#64748b] text-[0.85rem] sm:text-[0.9rem] leading-[1.6]">
              Need advice on choosing your next phone? Our dedicated specialists
              are ready to help 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
