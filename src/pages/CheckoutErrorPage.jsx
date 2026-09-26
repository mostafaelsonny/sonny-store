import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiErrorCircle, BiArrowBack, BiSupport } from "react-icons/bi";

export default function CheckoutErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const reason =
    location.state?.reason ||
    "An unexpected error occurred during checkout. Please try again.";

  return (
    <div className="[direction:ltr] bg-[#f8fafc] min-h-screen py-[60px] px-5 flex justify-center items-center">
      <motion.div
        className="bg-white p-10 rounded-[20px] border border-[#fee2e2] text-center max-w-[520px] w-full shadow-[0_10px_30px_rgba(239,68,68,0.08)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Icon */}
        <div className="text-[4rem] text-[#ef4444] mb-4 flex justify-center">
          <BiErrorCircle />
        </div>

        <h1 className="text-2xl font-bold text-[#0f172a] mb-3">Payment Not Completed</h1>

        {/* Error reason box */}
        <div className="bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-[0.88rem] rounded-[10px] px-5 py-4 mb-6 text-left leading-relaxed">
          <strong>Reason:</strong> {reason}
        </div>

        <p className="text-[#64748b] text-[0.93rem] mb-7">
          Your order has <strong>not</strong> been placed and no charge has been made. 
          You can go back to checkout and try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/checkout")}
            className="flex items-center justify-center gap-2 bg-[#0088ff] hover:bg-[#006ecc] text-white font-bold py-3 px-6 rounded-[10px] cursor-pointer transition-colors border-none"
          >
            <BiArrowBack /> Back to Checkout
          </button>
          <a
            href="mailto:support@sonnystore.com"
            className="flex items-center justify-center gap-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] font-bold py-3 px-6 rounded-[10px] transition-colors no-underline"
          >
            <BiSupport /> Contact Support
          </a>
        </div>
      </motion.div>
    </div>
  );
}
