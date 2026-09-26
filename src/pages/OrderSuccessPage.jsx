import { useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiCheckCircle, BiPackage, BiHome } from "react-icons/bi";
import { useCart } from "../context/CartProvider";
import { placeOrder } from "../context/placeOrder";

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  // For COD orders, orderId comes via React Router state.
  // For Stripe orders, we commit the order here and generate the orderId.
  const codOrderId = location.state?.orderId;
  const isStripeRedirect = searchParams.get("payment") === "stripe";

  // useRef prevents the effect from firing twice in React StrictMode.
  const hasSaved = useRef(false);

  useEffect(() => {
    if (!isStripeRedirect || hasSaved.current) return;

    const saveStripeOrder = async () => {
      hasSaved.current = true;

      // Read the order payload we stored in sessionStorage before redirecting to Stripe.
      const raw = sessionStorage.getItem("pending_stripe_order");
      if (!raw) {
        // No pending order found — could be a direct URL hit. Redirect to home.
        navigate("/", { replace: true });
        return;
      }

      const { shippingData, cartItems, totalAmount, userId } = JSON.parse(raw);

      // ✅ This is the ONLY place we write a Stripe order to the database —
      // after Stripe has already confirmed payment by sending the user here.
      const result = await placeOrder({
        shippingData,
        cartItems,
        totalAmount,
        userId,
        clearCart,
      });

      // Always clean up sessionStorage regardless of DB result.
      sessionStorage.removeItem("pending_stripe_order");

      if (!result.success) {
        // DB write failed after successful payment — route to error page so user can contact support.
        navigate("/checkout-error", {
          state: {
            reason:
              "Payment was successful but we could not save your order. Please contact support with your payment confirmation.",
          },
        });
      }
    };

    saveStripeOrder();
  }, [isStripeRedirect]);

  return (
    <div className="[direction:ltr] bg-[#f8fafc] min-h-[80vh] py-[60px] px-5 flex justify-center items-center">
      <motion.div
        className="bg-white p-10 rounded-[20px] border border-[#e2e8f0] text-center max-w-[500px] w-full shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-[4rem] text-[#10b981] mb-2.5 flex justify-center">
          <BiCheckCircle />
        </div>
        <h1 className="text-2xl font-bold text-[#0f172a] mb-2">Order Placed Successfully!</h1>
        <p className="text-[#64748b] text-[0.95rem] leading-relaxed">
          {isStripeRedirect
            ? "Your online payment was verified successfully. Thank you for shopping with Sonny Store!"
            : "Thank you for shopping with Sonny Store. Your order tracking ID is:"}
        </p>

        {/* Only COD orders have a known orderId at this point. */}
        {codOrderId && (
          <div className="bg-[#f1f5f9] text-[#0088ff] font-extrabold py-2 px-4 rounded-lg inline-block my-4 mb-7">
            #{codOrderId}
          </div>
        )}

        <div className="flex gap-3 justify-center mt-6">
          <Link
            to="/my-orders"
            className="py-3 px-5 rounded-[10px] no-underline font-bold flex items-center gap-2 bg-[#0088ff] text-white"
          >
            <BiPackage /> View My Orders
          </Link>
          <Link
            to="/"
            className="py-3 px-5 rounded-[10px] no-underline font-bold flex items-center gap-2 bg-[#e2e8f0] text-[#0f172a]"
          >
            <BiHome /> Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}