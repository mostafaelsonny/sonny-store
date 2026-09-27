import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "../components/ui/Spinner";
// Note: If you eventually strip TopHeader, BotHeader, and Footer from individual pages, 
// you should import and render them here globally inside MainLayout.

export default function MainLayout() {
  return (
    <div className="main-layout min-h-screen flex flex-col">
      <main className="flex-1 w-full relative">
        <Suspense fallback={<Spinner message="Loading content..." fullScreen={true} />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
