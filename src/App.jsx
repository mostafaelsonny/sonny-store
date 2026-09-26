// import pages //
import HomePage from "./pages/HomePage";
import FavPage from "./pages/FavPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import About from "./pages/About";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import PhoneDetailPage from "./pages/PhoneDetailPage";
import ShopPage from "./pages/ShopPage";
import AdminDashboard from "./pages/AdminDashboard";
import SearchResultsPage from "./pages/SearchResultsPage";

//import components //
import Spinner from "./components/ui/Spinner";
import CartDrawer from "./features/cart/CartDrawer";
import BotHeader from "./components/layout/BotHeader";


// import hooks //
import { useData } from "./context/DataContext";
import { useCart } from "./context/CartProvider";
//import react router dom //
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

export default function App() {
  const { isOpenCart } = useCart();

  const { isLoading } = useData();

  if (isLoading) return <Spinner message="جاري تحميل الهواتف..." fullScreen={true} />;

  return (
    <div>
      <Routes>
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        ></Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />}  />
        </Route>
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/FavPage" element={<FavPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/:phoneId" element={<PhoneDetailPage />} />
      </Routes>

      <CartDrawer />
    </div>
  );
}  

//loader in react router 7 //
