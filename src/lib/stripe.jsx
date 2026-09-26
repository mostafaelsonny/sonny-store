import { loadStripe } from "@stripe/stripe-js";

// جلب المفتاح المفهوم من ملف الـ .env
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);