import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner message="Loading..." fullScreen={true} />;

  // لو مفيش مستخدم، بنحوله لـ /login وبنبعت معاه المكان اللي كان رايحه
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}