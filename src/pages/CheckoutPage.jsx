import { useState } from "react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiShoppingBag, BiShieldQuarter, BiCreditCard, BiPackage, BiMoney } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import BotHeader from "../components/layout/BotHeader";
import Footer from "../components/layout/Footer";

import { placeOrder } from "../context/placeOrder";
import { supabase } from "../lib/supabaseClient";

// Zod Schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(2, "Please enter your city/governorate"),
  address: z.string().min(10, "Please provide full address (street, building, apt)"),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cod", "card"]),
});

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod", // الخيار الافتراضي يظل الدفع عند الاستلام
    },
  });

  const selectedPaymentMethod = watch("paymentMethod");

  // Calculate Totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 100 : 0;
  const totalPrice = subtotal + shippingFee;

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // 1️⃣ لو الاختيار Cash on Delivery -> تنفيذه بنفس الدالة القديمة بالضبط 100%
      if (data.paymentMethod === "cod") {
        const result = await placeOrder({
          shippingData: data,
          cartItems: cartItems,
          totalAmount: totalPrice,
          userId: user?.id,
          clearCart: clearCart,
        });

        if (result.success) {
          navigate("/order-success", { state: { orderId: result.orderId } });
        } else {
          alert("فشل في تسجيل الطلب: " + result.error);
        }
        return;
      }

      // 2️⃣ لو الاختيار Pay with Card (Stripe)
      // أ) حفظ الطلب أولاً في الداتابيز بنفس الدالة وبحالة pending
      const result = await placeOrder({
        shippingData: data,
        cartItems: cartItems,
        totalAmount: totalPrice,
        userId: user?.id,
        clearCart: () => {}, // لا نمسح السلة الآن، سيتم مسحها فقط بعد نجاح الدفع عبر Webhook أو صفحة النجاح
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      // ب) استدعاء Supabase Edge Function أو سيرفر Stripe للحصول على رابط Checkout Session
      const { data: sessionData, error: sessionErr } = await supabase.functions.invoke(
        "create-stripe-session",
        {
          body: {
            orderId: result.orderId,
            items: cartItems,
            shippingFee: shippingFee,
            customerEmail: user?.email,
          },
        }
      );

      if (sessionErr || !sessionData?.url) {
        throw new Error(sessionErr?.message || "Failed to initialize Stripe payment.");
      }

      // ج) التحويل إلى رابط صفحة دفع Stripe الآمنة
      window.location.href = sessionData.url;

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("حدث خطأ أثناء معالجة الدفع: " + (error.message || "برجاء المحاولة لاحقاً"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-[80px] px-5 text-[#94a3b8] [direction:ltr] flex flex-col items-center">
        <BiShoppingBag className="text-[4rem] text-[#334155] mb-4" />
        <h2>Your Cart is Empty!</h2>
        <p>Add some products before proceeding to checkout.</p>
        <button onClick={() => navigate("/")} className="bg-[#0284c7] text-white border-none py-[10px] px-5 rounded-[6px] cursor-pointer mt-[15px]">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <>
      <BotHeader />
      <div className="max-w-[1200px] my-6 sm:my-10 mx-auto px-4 sm:px-5 text-[#f1f5f9] [direction:ltr] text-left">
        <div className="mb-[30px]">
          <h1 className="text-xl sm:text-[2.2rem] text-black font-bold">Checkout</h1>
          <p className="text-[#94a3b8] text-[0.95rem]">Complete your order details below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[30px]">
          <div className="bg-[#032a51] border border-[#1f2937] rounded-[12px] p-6">
            <h2 className="text-[1.25rem] mb-5 flex items-center gap-[10px] text-[#38bdf8]">
              <BiPackage /> Shipping & Delivery Information
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-[6px]">
                <label className="text-[0.875rem] !text-[#dedcdc]">Full Name</label>
                <input
                  type="text"
                  placeholder={user?.user_metadata?.full_name || "Enter your full name"}
                  {...register("fullName")}
                  className={`!w-[95%] bg-[#0f172a] border border-[#334155] rounded-[8px] p-3 text-white text-[0.95rem] outline-none transition-[border-color] duration-200 focus:border-[#38bdf8] ${errors.fullName ? "!border-[#ef4444]" : ""}`}
                />
                {errors.fullName && <span className="text-[#f87171] text-[0.8rem]">{errors.fullName.message}</span>}
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[0.875rem] !text-[#dedcdc]">Phone Number</label>
                <input
                  type="text"
                  placeholder="01012345678"
                  {...register("phone")}
                  className={`!w-[95%] bg-[#0f172a] border border-[#334155] rounded-[8px] p-3 text-white text-[0.95rem] outline-none transition-[border-color] duration-200 focus:border-[#38bdf8] ${errors.phone ? "!border-[#ef4444]" : ""}`}
                />
                {errors.phone && <span className="text-[#f87171] text-[0.8rem]">{errors.phone.message}</span>}
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[0.875rem] !text-[#dedcdc]">City / Governorate</label>
                <input
                  type="text"
                  placeholder="Giza / Cairo..."
                  {...register("city")}
                  className={`w-full bg-[#0f172a] border border-[#334155] rounded-[8px] p-3 text-white text-[0.95rem] outline-none transition-[border-color] duration-200 focus:border-[#38bdf8] ${errors.city ? "!border-[#ef4444]" : ""}`}
                />
                {errors.city && <span className="text-[#f87171] text-[0.8rem]">{errors.city.message}</span>}
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[0.875rem] !text-[#dedcdc]">Detailed Address</label>
                <textarea
                  rows="3"
                  placeholder="Street name, building number, apartment, landmark"
                  {...register("address")}
                  className={`w-full bg-[#0f172a] border border-[#334155] rounded-[8px] p-3 text-white text-[0.95rem] outline-none transition-[border-color] duration-200 focus:border-[#38bdf8] ${errors.address ? "!border-[#ef4444]" : ""}`}
                ></textarea>
                {errors.address && <span className="text-[#f87171] text-[0.8rem]">{errors.address.message}</span>}
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[0.875rem] !text-[#dedcdc]">Order Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="Special instructions for delivery"
                  {...register("notes")}
                  className="w-full bg-[#0f172a] border border-[#334155] rounded-[8px] p-3 text-white text-[0.95rem] outline-none transition-[border-color] duration-200 focus:border-[#38bdf8]"
                />
              </div>

              {/* 💳 اختيار طريقة الدفع المطور */}
              <div className="mt-[10px] bg-[#0f172a] p-4 rounded-[8px] border border-[#1e293b]">
                <h3 className="text-[0.95rem] mb-[10px] flex items-center gap-2">
                  <BiCreditCard /> Select Payment Method
                </h3>
                
                <div className={`flex items-center gap-[10px] text-[0.9rem] text-[#e2e8f0] ${selectedPaymentMethod === "cod" ? "active" : ""}`}>
                  <input type="radio" value="cod" id="cod" {...register("paymentMethod")} />
                  <label htmlFor="cod">
                    <BiMoney style={{ fontSize: "1.2rem", verticalAlign: "middle", marginRight: "6px" }} />
                    Cash on Delivery (COD)
                  </label>
                </div>

                <div className={`flex items-center gap-[10px] text-[0.9rem] text-[#e2e8f0] ${selectedPaymentMethod === "card" ? "active" : ""}`}>
                  <input type="radio" value="card" id="card" {...register("paymentMethod")} />
                  <label htmlFor="card">
                    <BiCreditCard style={{ fontSize: "1.2rem", verticalAlign: "middle", marginRight: "6px" }} />
                    Pay Online via Card (Stripe)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-[15px] bg-[#0284c7] hover:bg-[#0369a1] text-white border-none p-[14px] rounded-[8px] font-semibold text-[1rem] cursor-pointer transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Processing Order..."
                  : selectedPaymentMethod === "card"
                  ? `Proceed to Card Payment (${totalPrice.toLocaleString()} EGP)`
                  : `Place Order (${totalPrice.toLocaleString()} EGP)`}
              </button>
            </form>
          </div>

          <div className="bg-[#032a51] border border-[#1f2937] rounded-[12px] p-6">
            <h2 className="text-[1.25rem] mb-5 flex items-center gap-[10px] text-[#38bdf8]">
              <BiShoppingBag /> Order Summary ({cartItems.length})
            </h2>

            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-[#0f172a] p-[10px] rounded-[8px]">
                  <img src={item.image} alt={item.name} className="h-[50px] object-cover rounded-[6px]" />
                  <div>
                    <h4 className="text-[0.9rem] m-0">{item.name}</h4>
                    <p className="text-[0.8rem] text-[#94a3b8]">
                      Qty: {item.quantity} × {item.price?.toLocaleString()} EGP
                    </p>
                  </div>
                  <div className="ml-auto font-semibold text-[0.9rem] text-[#38bdf8]">
                    {(item.price * item.quantity).toLocaleString()} EGP
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[1px] bg-[#1e293b] my-4"></div>

            <div className="flex flex-col gap-[10px]">
              <div className="flex justify-between text-[0.9rem] text-[#94a3b8]">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between text-[0.9rem] text-[#94a3b8]">
                <span>Shipping Fee</span>
                <span>{shippingFee.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between text-[1.1rem] font-bold text-white mt-2">
                <span>Total</span>
                <span>{totalPrice.toLocaleString()} EGP</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[0.8rem] text-[#10b981]">
              <BiShieldQuarter />
              <span>100% Secure Checkout - Your data is protected</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}