import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts & Guards
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Lazy-loaded Pages
const HomePage = lazy(() => import("../pages/HomePage"));
const ShopPage = lazy(() => import("../pages/ShopPage"));
const PhoneDetailPage = lazy(() => import("../pages/PhoneDetailPage"));
const SearchResultsPage = lazy(() => import("../pages/SearchResultsPage"));
const FavPage = lazy(() => import("../pages/FavPage"));
const About = lazy(() => import("../pages/About"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));

const LoginPage = lazy(() => import("../features/auth/LoginPage"));
const SignupPage = lazy(() => import("../features/auth/SignupPage"));

const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const MyOrdersPage = lazy(() => import("../pages/MyOrdersPage"));
const OrderSuccessPage = lazy(() => import("../pages/OrderSuccessPage"));
const CheckoutErrorPage = lazy(() => import("../pages/CheckoutErrorPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));

const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* ─── PUBLIC ROUTES ─── */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/FavPage" element={<FavPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/:phoneId" element={<PhoneDetailPage />} />
      </Route>

      {/* ─── AUTHENTICATION ROUTES ─── */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* ─── PROTECTED ROUTES (Requires Login) ─── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/checkout-error" element={<CheckoutErrorPage />} />
        </Route>
      </Route>

      {/* ─── ADMIN ROUTES (Requires Admin Role) ─── */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
