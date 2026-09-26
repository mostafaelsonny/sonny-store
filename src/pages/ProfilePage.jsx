import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useNavigate , useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";

import { 
  BiUser, 
  BiPhone, 
  BiMapPin, 
  BiLockAlt, 
  BiPackage, 
  BiLogOut, 
  BiCheckCircle, 
  BiErrorCircle,
  BiSave,
  BiCheckShield,
  BiLogIn
} from "react-icons/bi";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import BotHeader from "../components/layout/BotHeader";
import Footer from "../components/layout/Footer";
import Spinner from "../components/ui/Spinner";

const profileSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  shippingAddress: z.string().min(10, "Please provide full address details"),
});

const passwordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

    const { loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);

  const [activeTab, setActiveTab] = useState("info");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    setValue,
    formState: { errors: infoErrors, isSubmitting: isSubmittingInfo },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    reset: resetPassForm,
    formState: { errors: passErrors, isSubmitting: isSubmittingPass },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
  // مراقبة خروج المستخدم لحظياً
  if (!user) {
    setLoadingProfile(false);
    return;
  }

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const { data } = await supabase
        .from("profiles")
        .select("full_name, phone_number, shipping_address")
        .eq("id", user.id)
        .single();

      if (data) {
        setValue("fullName", data.full_name || "");
        setValue("phone", data.phone_number || "");
        setValue("shippingAddress", data.shipping_address || "");
      }
    } catch (error) {
      console.error("Error loading profile:", error.message);
    } finally {
      setLoadingProfile(false);
    }
  };

  fetchProfile();
}, [user, setValue]);
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setCheckingRole(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error || !data || data.role !== "admin") {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setCheckingRole(false);
      }
    };

    if (!authLoading) {
      checkAdminRole();
    }
  }, [user, authLoading]);
  const onUpdateProfile = async (formData) => {
    setStatusMsg({ type: "", text: "" });
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          phone_number: formData.phone,
          shipping_address: formData.shippingAddress,
        })
        .eq("id", user.id);

      if (error) throw error;
      setStatusMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setStatusMsg({ type: "error", text: err.message || "Failed to update profile." });
    }
  };

  const onChangePassword = async (formData) => {
    setStatusMsg({ type: "", text: "" });
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) throw error;
      setStatusMsg({ type: "success", text: "Password changed successfully!" });
      resetPassForm();
    } catch (err) {
      setStatusMsg({ type: "error", text: err.message || "Failed to update password." });
    }
  };

const handleLogout = async () => {
  setLoadingProfile(true);
  await logout();
  setLoadingProfile(false);
};

  // 1️⃣ Loading State
  if (loadingProfile) return <Spinner message="Loading profile data..." fullScreen={true} />;
  // 2️⃣ Unauthenticated State
  if (!user) {
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
            <h2 className="text-[1.3rem] font-extrabold mb-2">Access Denied</h2>
            <p className="text-[#64748b] text-[0.9rem] leading-[1.5] mb-6">Please log in to manage your profile, security settings, and saved addresses.</p>
            <button className="w-full p-3 bg-[#0088ff] hover:bg-[#0066cc] text-white rounded-[12px] font-bold flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer" onClick={() =>navigate("/login", { state: { from: location } })}>
              <BiLogIn /> Sign In Now
            </button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <BotHeader />
      <div className="[direction:ltr] bg-[#f8fafc] min-h-[85vh] pt-10 px-5 pb-20 text-[#0f172a]">
        <div className="max-w-[1000px] mx-auto">
          <motion.div 
            className="bg-[linear-gradient(135deg,#0b1736_0%,#0f172a_100%)] p-8 rounded-[20px] text-white flex items-center gap-6 mb-8 shadow-[0_10px_30px_rgba(11,23,54,0.12)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-[72px] h-[72px] rounded-full bg-[#0088ff] text-white flex items-center justify-center text-[2rem] font-extrabold border-[3px] border-white/20 shrink-0">
              <span>
                {user?.email ? user.email[0].toUpperCase() : "U"}
              </span>
            </div>
            <div>
              <h2 className="text-[1.6rem] font-extrabold mb-1">My Account Settings</h2>
              <p className="text-[#94a3b8] text-[0.95rem] mb-2">{user?.email}</p>
              <span className="inline-flex items-center gap-1.5 bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 px-3 py-1 rounded-[20px] text-[0.78rem] font-bold"><BiCheckShield /> Verified Account</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-7 items-start">
            <div className="bg-white p-5 rounded-[16px] border border-[#e2e8f0] flex flex-col gap-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <button 
                className={`w-full flex items-center gap-3 py-3.5 px-4 rounded-[10px] text-[0.95rem] font-bold text-left transition-all duration-250 cursor-pointer ${activeTab === "info" ? "bg-[#0088ff] text-white" : "bg-transparent text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0088ff]"}`}
                onClick={() => { setActiveTab("info"); setStatusMsg({ type: "", text: "" }); }}
              >
                <BiUser className="text-[1.25rem] shrink-0" /> Personal Details
              </button>
              
              <button 
                className={`w-full flex items-center gap-3 py-3.5 px-4 rounded-[10px] text-[0.95rem] font-bold text-left transition-all duration-250 cursor-pointer ${activeTab === "security" ? "bg-[#0088ff] text-white" : "bg-transparent text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0088ff]"}`}
                onClick={() => { setActiveTab("security"); setStatusMsg({ type: "", text: "" }); }}
              >
                <BiLockAlt className="text-[1.25rem] shrink-0" /> Security & Password
              </button>

              <button 
                className="w-full flex items-center gap-3 py-3.5 px-4 rounded-[10px] text-[0.95rem] font-bold text-left transition-all duration-250 cursor-pointer text-[#0f172a] bg-[#f8fafc] border border-[#e2e8f0] hover:bg-[#e2e8f0]"
                onClick={() => navigate("/my-orders")}
              >
                <BiPackage className="text-[1.25rem] shrink-0" /> My Orders History
              </button>

              {isAdmin && (
                <button style={{backgroundColor : "#d9ecff"}}
                className="w-full flex items-center gap-3 py-3.5 px-4 rounded-[10px] text-[0.95rem] font-bold text-left transition-all duration-250 cursor-pointer text-[#0f172a] bg-[#f8fafc] border border-[#e2e8f0] hover:bg-[#e2e8f0]"
                onClick={() => navigate("/admin")}
              >
                <MdOutlineDashboard className="text-[1.25rem] shrink-0" /> Dashboard
              </button>
              )}

              <div className="h-[1px] bg-[#e2e8f0] my-1.5"></div>

              <button className="w-full flex items-center gap-3 py-3.5 px-4 rounded-[10px] text-[0.95rem] font-bold text-left transition-all duration-250 cursor-pointer bg-transparent text-[#ef4444] hover:bg-[#fef2f2] hover:text-[#dc2626]" onClick={handleLogout}>
                <BiLogOut className="text-[1.25rem] shrink-0" /> Logout
              </button>
            </div>

            <div className="bg-white p-9 rounded-[16px] border border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              {statusMsg.text && (
                <div className={`p-[14px_18px] rounded-[10px] text-[0.9rem] font-bold flex items-center gap-2.5 mb-6 ${statusMsg.type === "success" ? "bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]" : "bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]"}`}>
                  {statusMsg.type === "success" ? <BiCheckCircle /> : <BiErrorCircle />}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              {activeTab === "info" && (
                <motion.div 
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div>
                    <h3 className="text-[1.35rem] font-extrabold text-[#0f172a] mb-1.5">Personal & Shipping Information</h3>
                    <p className="text-[#64748b] text-[0.9rem] mb-7">Update your phone number and default address for faster checkout.</p>
                  </div>

                  <form onSubmit={handleSubmitInfo(onUpdateProfile)} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.88rem] font-bold text-[#334155] flex items-center gap-1.5"><BiUser /> Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Mostafa Amin"
                        {...registerInfo("fullName")}
                        className={`w-full px-4 py-3 rounded-[10px] border text-[#0f172a] text-[0.95rem] outline-none transition-all duration-250 focus:bg-white focus:border-[#0088ff] focus:ring-4 focus:ring-[rgba(0,136,255,0.12)] ${infoErrors.fullName ? "border-[#ef4444] bg-[#fef2f2]" : "border-[#cbd5e1] bg-[#f8fafc]"}`}
                      />
                      {infoErrors.fullName && <span className="text-[#ef4444] text-[0.8rem] font-semibold">{infoErrors.fullName.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[0.88rem] font-bold text-[#334155] flex items-center gap-1.5"><BiPhone /> Phone Number</label>
                      <input 
                        type="text" 
                        placeholder="01012345678"
                        {...registerInfo("phone")}
                        className={`w-full px-4 py-3 rounded-[10px] border text-[#0f172a] text-[0.95rem] outline-none transition-all duration-250 focus:bg-white focus:border-[#0088ff] focus:ring-4 focus:ring-[rgba(0,136,255,0.12)] ${infoErrors.phone ? "border-[#ef4444] bg-[#fef2f2]" : "border-[#cbd5e1] bg-[#f8fafc]"}`}
                      />
                      {infoErrors.phone && <span className="text-[#ef4444] text-[0.8rem] font-semibold">{infoErrors.phone.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[0.88rem] font-bold text-[#334155] flex items-center gap-1.5"><BiMapPin /> Shipping Address</label>
                      <textarea 
                        rows="3"
                        placeholder="Street, Building, Apartment, City"
                        {...registerInfo("shippingAddress")}
                        className={`w-full px-4 py-3 rounded-[10px] border text-[#0f172a] text-[0.95rem] outline-none transition-all duration-250 focus:bg-white focus:border-[#0088ff] focus:ring-4 focus:ring-[rgba(0,136,255,0.12)] ${infoErrors.shippingAddress ? "border-[#ef4444] bg-[#fef2f2]" : "border-[#cbd5e1] bg-[#f8fafc]"}`}
                      ></textarea>
                      {infoErrors.shippingAddress && <span className="text-[#ef4444] text-[0.8rem] font-semibold">{infoErrors.shippingAddress.message}</span>}
                    </div>

                    <button type="submit" className="mt-2.5 bg-[#0088ff] hover:bg-[#0066cc] text-white py-3.5 px-6 rounded-[10px] text-[0.98rem] font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-250 shadow-[0_4px_15px_rgba(0,136,255,0.2)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none" disabled={isSubmittingInfo}>
                      <BiSave /> {isSubmittingInfo ? "Saving Changes..." : "Save Profile Details"}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div 
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div>
                    <h3 className="text-[1.35rem] font-extrabold text-[#0f172a] mb-1.5">Change Password</h3>
                    <p className="text-[#64748b] text-[0.9rem] mb-7">Ensure your account is using a strong password for security.</p>
                  </div>

                  <form onSubmit={handleSubmitPass(onChangePassword)} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.88rem] font-bold text-[#334155] flex items-center gap-1.5"><BiLockAlt /> New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        {...registerPass("newPassword")}
                        className={`w-full px-4 py-3 rounded-[10px] border text-[#0f172a] text-[0.95rem] outline-none transition-all duration-250 focus:bg-white focus:border-[#0088ff] focus:ring-4 focus:ring-[rgba(0,136,255,0.12)] ${passErrors.newPassword ? "border-[#ef4444] bg-[#fef2f2]" : "border-[#cbd5e1] bg-[#f8fafc]"}`}
                      />
                      {passErrors.newPassword && <span className="text-[#ef4444] text-[0.8rem] font-semibold">{passErrors.newPassword.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[0.88rem] font-bold text-[#334155] flex items-center gap-1.5"><BiLockAlt /> Confirm New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        {...registerPass("confirmPassword")}
                        className={`w-full px-4 py-3 rounded-[10px] border text-[#0f172a] text-[0.95rem] outline-none transition-all duration-250 focus:bg-white focus:border-[#0088ff] focus:ring-4 focus:ring-[rgba(0,136,255,0.12)] ${passErrors.confirmPassword ? "border-[#ef4444] bg-[#fef2f2]" : "border-[#cbd5e1] bg-[#f8fafc]"}`}
                      />
                      {passErrors.confirmPassword && <span className="text-[#ef4444] text-[0.8rem] font-semibold">{passErrors.confirmPassword.message}</span>}
                    </div>

                    <button type="submit" className="mt-2.5 bg-[#0088ff] hover:bg-[#0066cc] text-white py-3.5 px-6 rounded-[10px] text-[0.98rem] font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-250 shadow-[0_4px_15px_rgba(0,136,255,0.2)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none" disabled={isSubmittingPass}>
                      <BiSave /> {isSubmittingPass ? "Updating Password..." : "Update Password"}
                    </button>
                  </form>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}