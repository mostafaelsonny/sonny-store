import { motion } from "framer-motion";
export default function PromotionalBanners() {
  const banners = [
    {
      id: 1,
      variant: "primary",
      badge: "Limited Time Offer",
      title: "iPhone 15 Pro Max",
      subtitle: "Titanium design with A17 Pro chip. Get up to $150 off today.",
      buttonText: "Shop Now",
      image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg", // استبدلها برابط صورتك
    },
    {
      id: 2,
      variant: "secondary",
      badge: "New Arrival",
      title: "samsung-galaxy-s26-ultra",
      subtitle: "Welcome to the era of mobile AI. Experience extreme power.",
      buttonText: "Explore More",
      image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s26-ultra-new.jpg", // استبدلها برابط صورتك
    },
  ];

  return (
    <section className="w-full max-w-[1600px] my-[40px] mx-auto px-[16px] box-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
        {banners.map((banner, index) => {
          const isPrimary = banner.variant === "primary";

          return (
            <motion.div
              key={banner.id}
              className={`relative rounded-[20px] overflow-hidden h-[220px] md:h-[260px] flex items-center p-[24px] md:p-[32px] box-border border shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer before:content-[''] before:absolute before:-top-[50%] before:-left-[50%] before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(0,136,255,0.12)_0%,transparent_60%)] before:pointer-events-none ${
                isPrimary 
                  ? "bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)] border-[rgba(0,136,255,0.2)]" 
                  : "bg-[linear-gradient(135deg,#1e1b4b_0%,#1e293b_100%)] border-[rgba(129,140,248,0.2)]"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Content Left Side */}
              <div className="relative z-[2] max-w-[60%] flex flex-col items-start gap-[12px]">
                <span className={`text-[0.75rem] font-bold uppercase tracking-[1px] py-[4px] px-[12px] rounded-[20px] border ${
                  isPrimary
                    ? "bg-[rgba(0,136,255,0.15)] text-[#0088ff] border-[rgba(0,136,255,0.3)]"
                    : "bg-[rgba(129,140,248,0.15)] text-[#818cf8] border-[rgba(129,140,248,0.3)]"
                }`}>{banner.badge}</span>
                <h3 className="text-[#f8fafc] text-[1.25rem] md:text-[1.5rem] font-bold m-0 leading-[1.2]">{banner.title}</h3>
                <p className="text-[#94a3b8] text-[0.85rem] m-0 leading-[1.4]">{banner.subtitle}</p>

                <motion.button
                  className={`mt-[8px] py-[10px] px-[20px] text-white border-none rounded-[10px] text-[0.85rem] font-semibold cursor-pointer flex items-center gap-[8px] ${
                    isPrimary 
                      ? "bg-[#0088ff] shadow-[0_4px_14px_rgba(0,136,255,0.3)]"
                      : "bg-[#6366f1] shadow-[0_4px_14px_rgba(99,102,241,0.3)]"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {banner.buttonText}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                </motion.button>
              </div>

              {/* Image Right Side with Floating Motion */}
              <motion.div
                className="absolute right-[10px] -bottom-[10px] w-[45%] h-[110%] flex items-center justify-center z-[1]"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.08, rotate: -2 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="max-w-full max-h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)]"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}