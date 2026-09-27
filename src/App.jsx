// import components //
import Spinner from "./components/ui/Spinner";
import CartDrawer from "./features/cart/CartDrawer";
import AppRoutes from "./routes/index";

// import hooks //
import { useData } from "./context/DataContext";

export default function App() {
  const { isLoading } = useData();

  if (isLoading) return <Spinner message="Loading application..." fullScreen={true} />;

  return (
    <>
      <AppRoutes />
      <CartDrawer />
    </>
  );
}
