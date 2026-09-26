import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0f172a] border-t border-t-[rgba(255,255,255,0.08)] pt-[60px] pb-[20px] mt-[80px] text-[#94a3b8] relative box-border">
      <div className="max-w-[1200px] mx-auto px-[16px] flex flex-col gap-[48px]">
        {/* Top Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-[32px] sm:gap-[40px] lg:gap-[32px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Brand Info */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-[1.5rem] font-bold text-[#f8fafc] m-0">
              Phone<span className="text-[#0088ff]">Store</span>
            </h2>
            <p className="text-[0.85rem] leading-[1.6] m-0 text-[#94a3b8]">
              Your premier destination for the latest smartphones and mobile tech. High quality products with official warranties and fast delivery.
            </p>
            <div className="flex gap-[12px]">
              <a href="#" className="w-[36px] h-[36px] rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94a3b8] transition-all duration-300 no-underline hover:bg-[#0088ff] hover:text-white hover:border-[#0088ff] hover:shadow-[0_0_12px_rgba(0,136,255,0.4)]" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.23 0-1.62.77-1.62 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a href="#" className="w-[36px] h-[36px] rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94a3b8] transition-all duration-300 no-underline hover:bg-[#0088ff] hover:text-white hover:border-[#0088ff] hover:shadow-[0_0_12px_rgba(0,136,255,0.4)]" aria-label="Twitter">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="w-[36px] h-[36px] rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94a3b8] transition-all duration-300 no-underline hover:bg-[#0088ff] hover:text-white hover:border-[#0088ff] hover:shadow-[0_0_12px_rgba(0,136,255,0.4)]" aria-label="Instagram">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#f8fafc] text-[1rem] font-semibold m-0 mb-[16px]">Quick Links</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
              <li><a href="#" className="text-[#94a3b8] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0088ff]">Home</a></li>
              <li><a href="#" className="text-[#94a3b8] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0088ff]">All Phones</a></li>
              <li><a href="#" className="text-[#94a3b8] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0088ff]">Latest Deals</a></li>
              <li><a href="#" className="text-[#94a3b8] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0088ff]">Top Brands</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[#f8fafc] text-[1rem] font-semibold m-0 mb-[16px]">Customer Care</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
              <li><a href="#" className="text-[#94a3b8] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0088ff]">Order Tracking</a></li>
              <li><a href="#" className="text-[#94a3b8] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0088ff]">Warranty Policy</a></li>
              <li><a href="#" className="text-[#94a3b8] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0088ff]">Returns & Exchanges</a></li>
              <li><a href="#" className="text-[#94a3b8] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0088ff]">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-[12px]">
            <h4 className="text-[#f8fafc] text-[1rem] font-semibold m-0 mb-[16px]">Stay Updated</h4>
            <p className="text-[0.85rem] leading-[1.6] m-0 text-[#94a3b8]">Subscribe to get special discounts and new arrivals updates.</p>
            <form className="flex gap-[8px]" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#1e293b] border border-[rgba(255,255,255,0.08)] rounded-lg py-[10px] px-[14px] text-[#f8fafc] text-[0.85rem] outline-none transition-colors duration-200 focus:border-[#0088ff]"
                required
              />
              <button type="submit" className="bg-[#0088ff] text-white border-none rounded-lg py-[10px] px-[18px] text-[0.85rem] font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#0077e6]">Join</button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-t-[rgba(255,255,255,0.05)] pt-[24px] flex flex-col sm:flex-row justify-between items-center text-[0.8rem] gap-[16px] sm:gap-0 sm:text-left text-center">
          <p className="m-0">© {new Date().getFullYear()} PhoneStore. All rights reserved.</p>
          <div className="flex gap-[12px] text-[#64748b] font-semibold">
            <span>VISA</span>
            <span>MasterCard</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}