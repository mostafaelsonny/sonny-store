import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Ahmed Tarek",
      role: "Verified Buyer",
      avatar: "https://i.pravatar.cc/150?img=11",
      stars: "★★★★★",
      boughtItem: "iPhone 15 Pro Max - 256GB",
      text: "The delivery was surprisingly fast, and the packaging was super secure. The phone is 100% original with official warranty. Absolutely standard-setting service!",
    },
    {
      id: 2,
      name: "Sarah Hassan",
      role: "Tech Enthusiast",
      avatar: "https://i.pravatar.cc/150?img=5",
      stars: "★★★★★",
      boughtItem: "Samsung Galaxy S24 Ultra",
      text: "Bought my S24 Ultra during the Flash Deals. Saved around $100 compared to local market prices. Customer support helped me seamlessly through trade-in.",
    },
    {
      id: 3,
      name: "Omar Khaled",
      role: "Verified Buyer",
      avatar: "https://i.pravatar.cc/150?img=12",
      stars: "★★★★★",
      boughtItem: "Xiaomi 14 Ultra",
      text: "Smooth checkout process and pristine item condition upon receipt. I love the dark theme UI of this website too, made shopping feel truly premium!",
    },
    {
      id: 4,
      name: "Mariam Ali",
      role: "Verified Buyer",
      avatar: "https://i.pravatar.cc/150?img=9",
      stars: "★★★★★",
      boughtItem: "Google Pixel 8 Pro",
      text: "Hassle-free 14-day return policy gave me total peace of mind. Highly recommended for anyone looking for authentic smartphones in Egypt.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="relative w-full min-h-[600px] bg-white py-[80px] px-[16px] box-border overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-[1200px] mx-auto relative z-[2]">
        {/* Header */}
        <div className="mb-[40px]">
          <span className="text-[#0088ff] text-[0.85rem] font-bold uppercase tracking-[2px] flex items-center gap-[8px] before:content-[''] before:w-[20px] before:h-[2px] before:bg-[#0088ff]">Testimonials</span>
          <h2 className="text-[2rem] md:text-[3rem] font-black leading-[1.1] mt-[12px] mb-0 text-black uppercase tracking-[-0.5px]">
            REAL BUYERS. <br />
            <span className="text-[#0088ff]">REAL EXPERIENCES.</span>
          </h2>
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row gap-[32px] md:items-center items-start">
          {/* Vertical Avatars */}
          <div className="flex flex-row md:flex-col gap-[16px]">
            {reviews.map((rev, index) => (
              <button
                key={rev.id}
                className={`w-[48px] h-[48px] rounded-full p-[2px] bg-transparent cursor-pointer transition-all duration-300 ${
                  index === currentIndex ? "border-2 border-[#0088ff] opacity-100 shadow-[0_0_16px_rgba(0,136,255,0.5)] scale-110" : "border-2 border-transparent opacity-50"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img src={rev.avatar} alt={rev.name} className="w-full h-full rounded-full object-cover" />
              </button>
            ))}
          </div>

          {/* Testimonial Glass Card with Framer Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              className="flex-1 w-full max-w-[100%] md:max-w-[650px] bg-white border border-[rgba(255,255,255,0.08)] backdrop-blur-[16px] rounded-[20px] p-6 md:p-[36px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-[2.5rem] text-[rgba(0,136,255,0.4)] leading-none font-serif mb-[8px]">“</div>
              <div className="text-[#0088ff] text-[1.1rem] mb-[16px]">{currentReview.stars}</div>
              <p className="text-[#696969] text-[1.05rem] leading-[1.6] italic mb-[24px]">{currentReview.text}</p>

              <div className="inline-flex items-center gap-[8px] bg-[rgba(0,136,255,0.12)] border border-[rgba(0,136,255,0.3)] text-[#0088ff] py-[6px] px-[14px] rounded-[20px] text-[0.8rem] font-semibold mb-[24px]">
                📱 {currentReview.boughtItem}
              </div>

              <div className="h-[1px] bg-[rgba(255,255,255,0.08)] mb-[20px]"></div>

              <div className="flex items-center gap-[12px]">
                <img
                  src={currentReview.avatar}
                  alt={currentReview.name}
                  className="w-[44px] h-[44px] rounded-full object-cover"
                />
                <div>
                  <h4 className="text-[#0088ff] text-[1rem] font-bold m-0">{currentReview.name}</h4>
                  <p className="text-[#94a3b8] text-[0.8rem] m-0">{currentReview.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-[16px] mt-[24px] ml-0 md:ml-[80px]">
          <button className="w-[40px] h-[40px] rounded-full bg-[rgba(30,41,59,0.8)] border border-[rgba(255,255,255,0.1)] text-[#f8fafc] flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#0088ff] hover:border-[#0088ff] hover:shadow-[0_0_12px_rgba(0,136,255,0.4)]" onClick={handlePrev}>
            ←
          </button>
          <div className="flex gap-[8px]">
            {reviews.map((_, idx) => (
              <span
                key={idx}
                className={`w-[8px] h-[8px] rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? "bg-[#0088ff]" : "bg-[#39393933]"}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
          <button className="w-[40px] h-[40px] rounded-full bg-[rgba(30,41,59,0.8)] border border-[rgba(255,255,255,0.1)] text-[#f8fafc] flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#0088ff] hover:border-[#0088ff] hover:shadow-[0_0_12px_rgba(0,136,255,0.4)]" onClick={handleNext}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}