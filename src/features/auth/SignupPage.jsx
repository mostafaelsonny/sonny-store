import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BiUser, BiEnvelope, BiLockAlt, BiUserPlus } from "react-icons/bi";

// Zod Validation Schema for Registration
const signupSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError("");

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      // 2. Insert extra user details into 'profiles' table
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            full_name: data.fullName,
            email: data.email,
            role: "user",
          },
        ]);

        if (profileError && profileError.code !== "23505") {
          // Ignore duplicate key error if database trigger handles profile creation
          console.error("Error inserting profile:", profileError.message);
        }
      }

      // Redirect user to Checkout or Home
      navigate(from, { replace: true });
    } catch (err) {
      setAuthError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass = "w-full bg-[#0f172a] border rounded-[8px] py-[12px] pr-[12px] pl-[40px] text-white text-[0.95rem] outline-none transition-colors duration-200 focus:border-[#38bdf8]";

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-[20px] ltr">
      <div className="bg-[#111827] border border-[#1f2937] rounded-[12px] w-full max-w-[420px] p-[32px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-[24px]">
          <h2 className="text-[1.75rem] text-white font-bold mb-[6px]">Create Account</h2>
          <p className="text-[#94a3b8] text-[0.9rem]">Join us to start shopping seamlessly</p>
        </div>

        {authError && <div className="bg-[rgba(239,68,68,0.1)] border border-[#ef4444] text-[#f87171] p-[10px] rounded-[8px] text-[0.85rem] mb-[16px] text-center">{authError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[0.85rem] text-[#cbd5e1]">Full Name</label>
            <div className="relative flex items-center">
              <BiUser className="absolute left-[12px] text-[#64748b] text-[1.2rem]" />
              <input
                type="text"
                placeholder="Mostafa Amin"
                {...register("fullName")}
                className={`${inputBaseClass} ${errors.fullName ? "!border-[#ef4444]" : "border-[#334155]"}`}
              />
            </div>
            {errors.fullName && <span className="text-[#f87171] text-[0.8rem]">{errors.fullName.message}</span>}
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[0.85rem] text-[#cbd5e1]">Email Address</label>
            <div className="relative flex items-center">
              <BiEnvelope className="absolute left-[12px] text-[#64748b] text-[1.2rem]" />
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className={`${inputBaseClass} ${errors.email ? "!border-[#ef4444]" : "border-[#334155]"}`}
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
                className={`${inputBaseClass} ${errors.password ? "!border-[#ef4444]" : "border-[#334155]"}`}
              />
            </div>
            {errors.password && <span className="text-[#f87171] text-[0.8rem]">{errors.password.message}</span>}
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[0.85rem] text-[#cbd5e1]">Confirm Password</label>
            <div className="relative flex items-center">
              <BiLockAlt className="absolute left-[12px] text-[#64748b] text-[1.2rem]" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={`${inputBaseClass} ${errors.confirmPassword ? "!border-[#ef4444]" : "border-[#334155]"}`}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-[#f87171] text-[0.8rem]">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button type="submit" className="mt-[10px] bg-[#0284c7] text-white border-none p-[12px] rounded-[8px] font-semibold text-[1rem] cursor-pointer flex items-center justify-center gap-[8px] transition-colors duration-200 hover:bg-[#0369a1]" disabled={isSubmitting}>
            {isSubmitting ? (
              "Creating Account..."
            ) : (
              <>
                <BiUserPlus /> Sign Up
              </>
            )}
          </button>
        </form>

        <div className="mt-[24px] text-center text-[0.875rem] text-[#94a3b8]">
          <p>
            Already have an account?{" "}
            <Link to="/login" state={{ from: location.state?.from }} className="text-[#38bdf8] no-underline font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}