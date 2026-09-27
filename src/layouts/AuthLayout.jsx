import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "../components/ui/Spinner";

export default function AuthLayout() {
  return (
    <div className="auth-layout min-h-screen bg-[#f8fafc] flex items-center justify-center relative">
      <div className="w-full h-full flex-1">
        <Suspense fallback={<Spinner message="Loading..." fullScreen={true} />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
