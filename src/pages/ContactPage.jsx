import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  BiPhoneCall, 
  BiEnvelope, 
  BiMapPin, 
  BiPaperPlane,
  BiSupport
} from "react-icons/bi";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import TopHeader from "../components/layout/TopHeader";
import BotHeader from "../components/layout/BotHeader";
import Footer from "../components/layout/Footer";

// 🛡️ Zod Validation Schema
const contactSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  subject: z.string().min(3, { message: "Subject is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  // 📲 Send Directly to WhatsApp Logic
  const onSubmit = (data) => {
    const whatsappNumber = "201117021184"; // Your WhatsApp Number
    
    // Formatting the message for clean WhatsApp readability
    const formattedMessage = `Hello Mostafa! 👋%0A%0A*New Inquiry from Sonny Store Website*%0A%0A👤 *Name:* ${encodeURIComponent(data.fullName)}%0A📞 *Phone:* ${encodeURIComponent(data.phone)}%0A📌 *Subject:* ${encodeURIComponent(data.subject)}%0A%0A💬 *Message:*%0A${encodeURIComponent(data.message)}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
    reset();
  };

  return (
    <div className="[direction:ltr] text-left bg-[#f8fafc] text-[#0f172a]">
        <TopHeader/>
        <BotHeader/>
      {/* 1️⃣ Hero Header */}
      <section className="bg-[linear-gradient(135deg,#0b1736_0%,#0f172a_100%)] pt-[80px] px-5 pb-[100px] text-white text-center">
        <motion.div 
          className="max-w-[750px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-[rgba(0,136,255,0.15)] text-[#0088ff] border border-[rgba(0,136,255,0.3)] px-4 py-1.5 rounded-[30px] text-[0.8rem] font-bold inline-flex items-center gap-2 mb-[18px]"><BiSupport /> GET IN TOUCH</span>
          <h1 className="text-[2.6rem] font-extrabold mb-[14px]">Let's Connect & Build Something Great</h1>
          <p className="text-[#94a3b8] text-[1.05rem] leading-[1.6]">Have questions about flagship devices, warranty support, or custom software projects? Reach out directly via WhatsApp or our channels.</p>
        </motion.div>
      </section>

      {/* 2️⃣ Main Grid Container */}
      <section className="max-w-[1100px] -mt-[50px] mx-auto px-5 relative z-[6]">
        <div className="grid grid-cols-1 min-[851px]:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          
          {/* Left Side: Contact Cards & Social Links */}
          <motion.div 
            className="bg-white p-[36px] rounded-[18px] border border-[#e2e8f0] shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-[1.6rem] font-extrabold text-[#0f172a] mb-[10px]">Direct Channels</h2>
            <p className="text-[#64748b] text-[0.95rem] mb-[28px] leading-[1.5]">Feel free to message us directly on WhatsApp or follow our latest updates across GitHub and LinkedIn.</p>

            <div className="flex flex-col gap-4">
              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/201117024184" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 px-5 py-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] no-underline text-inherit transition-all duration-[250ms] ease-in-out hover:-translate-y-[3px] hover:border-[#25d366] hover:shadow-[0_8px_20px_rgba(37,211,102,0.12)]"
              >
                <div className="w-[44px] h-[44px] rounded-[10px] bg-[#25d366] text-white flex items-center justify-center text-[1.3rem] shrink-0"><FaWhatsapp /></div>
                <div>
                  <span className="block text-[0.78rem] text-[#64748b] font-semibold uppercase tracking-[0.5px]">WhatsApp Direct</span>
                  <span className="block text-[0.98rem] font-bold text-[#0f172a]">+20 111 702 4184</span>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a 
                href="https://www.linkedin.com/in/mostafa-elsonny-4115ba404" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 px-5 py-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] no-underline text-inherit transition-all duration-[250ms] ease-in-out hover:-translate-y-[3px] hover:border-[#0088ff] hover:shadow-[0_8px_20px_rgba(0,136,255,0.08)]"
              >
                <div className="w-[44px] h-[44px] rounded-[10px] bg-[#0a66c2] text-white flex items-center justify-center text-[1.3rem] shrink-0"><FaLinkedin /></div>
                <div>
                  <span className="block text-[0.78rem] text-[#64748b] font-semibold uppercase tracking-[0.5px]">LinkedIn Profile</span>
                  <span className="block text-[0.98rem] font-bold text-[#0f172a]">Mostafa Elsonny</span>
                </div>
              </a>

              {/* GitHub Card */}
              <a 
                href="https://github.com/mostafaelsonny" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 px-5 py-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] no-underline text-inherit transition-all duration-[250ms] ease-in-out hover:-translate-y-[3px] hover:border-[#0088ff] hover:shadow-[0_8px_20px_rgba(0,136,255,0.08)]"
              >
                <div className="w-[44px] h-[44px] rounded-[10px] bg-[#24292e] text-white flex items-center justify-center text-[1.3rem] shrink-0"><FaGithub /></div>
                <div>
                  <span className="block text-[0.78rem] text-[#64748b] font-semibold uppercase tracking-[0.5px]">GitHub Repository</span>
                  <span className="block text-[0.98rem] font-bold text-[#0f172a]">mostafaelsonny</span>
                </div>
              </a>

              {/* Phone & Location */}
              <div className="flex items-center gap-4 px-5 py-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] text-inherit cursor-default transition-all duration-[250ms] ease-in-out">
                <div className="w-[44px] h-[44px] rounded-[10px] bg-[#0f172a] text-white flex items-center justify-center text-[1.3rem] shrink-0"><BiMapPin /></div>
                <div>
                  <span className="block text-[0.78rem] text-[#64748b] font-semibold uppercase tracking-[0.5px]">Store Location</span>
                  <span className="block text-[0.98rem] font-bold text-[#0f172a]">Giza, Egypt</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive WhatsApp Form */}
          <motion.div 
            className="bg-white p-[36px] rounded-[18px] border border-[#e2e8f0] shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="form-header">
              <h2 className="text-[1.6rem] font-extrabold text-[#0f172a] mb-1.5">Send a Direct Message</h2>
              <p className="text-[#64748b] text-[0.9rem] mb-6">Fills will automatically open a formatted WhatsApp chat with your inquiry.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
              
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.88rem] font-bold text-[#334155]">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Ahmed Mahmoud"
                  className={`w-full px-4 py-3 rounded-[10px] border text-[#0f172a] text-[0.95rem] outline-none transition-all duration-[250ms] ease-in-out focus:bg-white focus:border-[#0088ff] focus:shadow-[0_0_0_4px_rgba(0,136,255,0.12)] ${errors.fullName ? "border-[#ef4444] bg-[#fef2f2]" : "border-[#cbd5e1] bg-[#f8fafc]"}`}
                  {...register("fullName")}
                />
                {errors.fullName && <span className="text-[#ef4444] text-[0.8rem] font-semibold">{errors.fullName.message}</span>}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.88rem] font-bold text-[#334155]">Phone Number / WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="e.g. 01117021184"
                  className={`w-full px-4 py-3 rounded-[10px] border text-[#0f172a] text-[0.95rem] outline-none transition-all duration-[250ms] ease-in-out focus:bg-white focus:border-[#0088ff] focus:shadow-[0_0_0_4px_rgba(0,136,255,0.12)] ${errors.phone ? "border-[#ef4444] bg-[#fef2f2]" : "border-[#cbd5e1] bg-[#f8fafc]"}`}
                  {...register("phone")}
                />
                {errors.phone && <span className="text-[#ef4444] text-[0.8rem] font-semibold">{errors.phone.message}</span>}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.88rem] font-bold text-[#334155]">Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. Inquiry about iPhone 17 Pro Max Warranty"
                  className={`w-full px-4 py-3 rounded-[10px] border text-[#0f172a] text-[0.95rem] outline-none transition-all duration-[250ms] ease-in-out focus:bg-white focus:border-[#0088ff] focus:shadow-[0_0_0_4px_rgba(0,136,255,0.12)] ${errors.subject ? "border-[#ef4444] bg-[#fef2f2]" : "border-[#cbd5e1] bg-[#f8fafc]"}`}
                  {...register("subject")}
                />
                {errors.subject && <span className="text-[#ef4444] text-[0.8rem] font-semibold">{errors.subject.message}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.88rem] font-bold text-[#334155]">Your Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Write your inquiry or required device specs here..."
                  className={`w-full px-4 py-3 rounded-[10px] border text-[#0f172a] text-[0.95rem] outline-none transition-all duration-[250ms] ease-in-out focus:bg-white focus:border-[#0088ff] focus:shadow-[0_0_0_4px_rgba(0,136,255,0.12)] ${errors.message ? "border-[#ef4444] bg-[#fef2f2]" : "border-[#cbd5e1] bg-[#f8fafc]"}`}
                  {...register("message")}
                ></textarea>
                {errors.message && <span className="text-[#ef4444] text-[0.8rem] font-semibold">{errors.message.message}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="mt-[10px] bg-[#25d366] text-white border-0 px-6 py-3.5 rounded-[10px] text-[1rem] font-bold cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-[250ms] ease-in-out shadow-[0_4px_15px_rgba(37,211,102,0.25)] hover:bg-[#1eb954] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(37,211,102,0.35)]" 
                disabled={isSubmitting}
              >
                <BiPaperPlane className="text-[1.2rem]" />
                <span>Send to WhatsApp</span>
              </button>
            </form>
          </motion.div>

        </div>
      </section>
      <Footer/>
    </div>
  );
}