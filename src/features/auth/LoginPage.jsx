import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BiEnvelope, BiLockAlt, BiLogIn } from "react-icons/bi";

// Zod Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to the page user tried to access (e.g., /checkout), or home
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

const onSubmit = async (data) => {
  setIsSubmitting(true);
  setAuthError("");

  try {
    // 1. تسجيل الدخول في Supabase Auth
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authErr) throw authErr;

    // 2. فحص حالة الـ Role من جدول profiles
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profileErr) throw profileErr;

    // 3. منع المستخدم المحظور وطرده فوراً
    if (profile?.role === "blocked") {
      await supabase.auth.signOut();
      setAuthError("Your account has been suspended. Please contact support.");
      return;
    }

    // 4. التوجيه في حالة كان الحساب سليم
    navigate(from, { replace: true });

  } catch (err) {
    setAuthError(err.message || "An unexpected error occurred. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-[20px] ltr">
      <div className="bg-[#111827] border border-[#1f2937] rounded-[12px] w-full max-w-[420px] p-[32px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-[24px]">
          <h2 className="text-[1.75rem] text-white font-bold mb-[6px]">Welcome Back</h2>
          <p className="text-[#94a3b8] text-[0.9rem]">Sign in to continue your order</p>
        </div>

        {authError && <div className="bg-[rgba(239,68,68,0.1)] border border-[#ef4444] text-[#f87171] p-[10px] rounded-[8px] text-[0.85rem] mb-[16px] text-center">{authError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[0.85rem] text-[#cbd5e1]">Email Address</label>
            <div className="relative flex items-center">
              <BiEnvelope className="absolute left-[12px] text-[#64748b] text-[1.2rem]" />
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className={`w-full bg-[#0f172a] border rounded-[8px] py-[12px] pr-[12px] pl-[40px] text-white text-[0.95rem] outline-none transition-colors duration-200 focus:border-[#38bdf8] ${errors.email ? "!border-[#ef4444]" : "border-[#334155]"}`}
              />
            </div>
            {errors.email && <span className="text-[#f87171] text-[0.8rem]">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[0.85rem] text-[#cbd5e1]">Password</label>
            <div className="relative flex items-center">
              <BiLockAlt className="absolute left-[12px] text-[#64748b] text-[1.2rem]" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full bg-[#0f172a] border rounded-[8px] py-[12px] pr-[12px] pl-[40px] text-white text-[0.95rem] outline-none transition-colors duration-200 focus:border-[#38bdf8] ${errors.password ? "!border-[#ef4444]" : "border-[#334155]"}`}
              />
            </div>
            {errors.password && <span className="text-[#f87171] text-[0.8rem]">{errors.password.message}</span>}
          </div>

          <button type="submit" className="mt-[10px] bg-[#0284c7] text-white border-none p-[12px] rounded-[8px] font-semibold text-[1rem] cursor-pointer flex items-center justify-center gap-[8px] transition-colors duration-200 hover:bg-[#0369a1]" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : <><BiLogIn /> Sign In</>}
          </button>
        </form>

        <div className="mt-[24px] text-center text-[0.875rem] text-[#94a3b8]">
          <p>
            Don't have an account? <Link to="/signup" state={{ from: location.state?.from }} className="text-[#38bdf8] no-underline font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}