import { useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BiCheckCircle, BiPackage, BiHome } from "react-icons/bi";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartProvider";

export default function OrderSuccessPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  // جلب رقم الطلب سواء من state التوجيه الداخلي (COD) أو من الـ URL (Stripe Callback)
  const orderId = location.state?.orderId || searchParams.get("order_id") || "N/A";
  const isStripeRedirect = searchParams.get("payment") === "stripe";

useEffect(() => {
  if (isStripeRedirect && orderId !== "N/A") {
    // 1. مسح السلة
    clearCart();

    // 2. تحديث حالة الطلب إلى completed في Supabase
    supabase
      .from("orders")
      .update({ status: "completed" })
      .eq("id", orderId)
      .then(({ error }) => {
        if (error) console.error("Error updating order status:", error);
      });
  }
}, [isStripeRedirect, orderId]);

  return (
    <div className="[direction:ltr] bg-[#f8fafc] min-h-[80vh] py-[60px] px-5 flex justify-center items-center">
      <motion.div 
        className="bg-white p-10 rounded-[20px] border border-[#e2e8f0] text-center max-w-[500px] w-full shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-[4rem] text-[#10b981] mb-2.5 flex justify-center"><BiCheckCircle /></div>
        <h1 className="text-2xl font-bold text-[#0f172a] mb-2">Order Placed Successfully!</h1>
        <p className="text-[#64748b] text-[0.95rem] leading-relaxed">
          {isStripeRedirect
            ? "Your online payment was verified successfully. Thank you for shopping with Sonny Store!"
            : "Thank you for shopping with Sonny Store. Your order tracking ID is:"}
        </p>
        <div className="bg-[#f1f5f9] text-[#0088ff] font-extrabold py-2 px-4 rounded-lg inline-block my-4 mb-7">#{orderId}</div>

        <div className="flex gap-3 justify-center">
          <Link to="/my-orders" className="py-3 px-5 rounded-[10px] no-underline font-bold flex items-center gap-2 bg-[#0088ff] text-white">
            <BiPackage /> View My Orders
          </Link>
          <Link to="/" className="py-3 px-5 rounded-[10px] no-underline font-bold flex items-center gap-2 bg-[#e2e8f0] text-[#0f172a]">
            <BiHome /> Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}