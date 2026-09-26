import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";
import { BiPackage, BiCalendar, BiLockAlt, BiLogIn } from "react-icons/bi";
import { useNavigate , useLocation, Link } from "react-router-dom";
import BotHeader from "../components/layout/BotHeader";
import Spinner from "../components/ui/Spinner";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUnauthenticated, setIsUnauthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
  const fetchOrders = async (currentUser) => {
    if (!currentUser) {
      setIsUnauthenticated(true);
      setLoading(false);
      return;
    }

    setIsUnauthenticated(false);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (!error) setOrders(data || []);
    setLoading(false);
  };

  // 1. الفحص المبدئي
  supabase.auth.getUser().then(({ data: { user } }) => {
    fetchOrders(user);
  });

  // 2. الاستماع اللحظي للتغييرات (Sign In / Sign Out)
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT" || !session) {
      setOrders([]);
      setIsUnauthenticated(true);
      setLoading(false);
    } else if (event === "SIGNED_IN" && session?.user) {
      fetchOrders(session.user);
    }
  });

  return () => subscription.unsubscribe();
}, []);

  // 1️⃣ Loading State With Spinner
  if (loading) return <Spinner message="Loading your order history..." fullScreen={true} />;

  // 2️⃣ Unauthenticated State
  if (isUnauthenticated) {
    return (
      <>
        <BotHeader />
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-5 bg-[#f8fafc] text-[#0f172a]">
          <motion.div 
            className="bg-white p-10 rounded-[20px] border border-[#e2e8f0] text-center max-w-[440px] w-full shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-[60px] h-[60px] bg-[#0088ff]/10 text-[#0088ff] rounded-full flex items-center justify-center text-[1.8rem] mx-auto mb-4"><BiLockAlt /></div>
            <h2 className="text-[1.3rem] font-extrabold mb-2 text-[#0f172a]">Authentication Required</h2>
            <p className="text-[#64748b] text-[0.9rem] leading-[1.5] mb-6">You need to be logged in to view your order history and track shipments.</p>
            <button className="w-full p-3 bg-[#0088ff] text-white border-0 rounded-xl font-bold cursor-pointer flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-[#0066cc]" onClick={() => navigate("/login" ,{state : {from : location} })}>
              <BiLogIn /> Sign In to Your Account
            </button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <BotHeader />
      <div className="[direction:ltr] bg-[#f8fafc] min-h-[80vh] py-[60px] px-5 flex justify-center items-center">
        <div className="max-w-[800px] w-full mx-auto">
          <h1 className="text-2xl font-bold text-[#0f172a] flex items-center gap-2 mb-6"><BiPackage /> My Order History</h1>

          {orders.length === 0 ? (
            <div className="bg-white p-8 rounded-[14px] border border-[#e2e8f0] text-center text-[#64748b] font-medium mt-6 shadow-sm">No orders found yet. Start shopping now!</div>
          ) : (
            <div className="flex flex-col gap-5 mt-6">
              {orders.map((order) => (
                <motion.div 
                  key={order.id} 
                  className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3">
                    <div>
                      <span className="font-extrabold block text-[#0f172a]">Order #{order.id.slice(0, 8)}</span>
                      <span className="text-[0.82rem] text-[#64748b] flex items-center gap-1 mt-0.5"><BiCalendar /> {new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-[20px] text-[0.78rem] font-bold uppercase ${
                        order.status === "pending"
                          ? "bg-[#fef3c7] text-[#d97706]"
                          : order.status === "completed"
                          ? "bg-[#008cff] text-[rgb(13,3,107)]"
                          : order.status === "cancelled"
                          ? "bg-[#f2070b] text-black"
                          : order.status === "processing"
                          ? "bg-[#08f486] text-[rgb(10,145,3)]"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="py-4 flex flex-col gap-3">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image_url} alt={item.product_name} className="w-[50px]  object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="text-[0.95rem] font-bold m-0 text-[#0f172a]">{item.product_name}</h4>
                          <p className="text-[0.85rem] text-[#64748b] mt-0.5 m-0">{item.quantity} x EGP {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#f1f5f9] pt-3 flex justify-between text-[0.9rem] text-[#475569]">
                    <span>Total Paid: <strong>EGP {order.total_amount.toLocaleString()}</strong></span>
                    <span>Shisssp to: {order.city}, {order.address}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}