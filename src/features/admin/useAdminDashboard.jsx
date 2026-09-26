import { useState, useEffect, useMemo } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const phoneSchema = z.object({
  name: z.string().min(3, "Phone name is required"),
  brand: z.string().min(2, "Brand is required"),
  priceAmount: z.coerce.number().positive("Price must be greater than 0"),
  thumbnail: z.string().url("Must be a valid image URL"),
  category: z.string().optional(),
});

export function useAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Data States
  const [phones, setPhones] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Controls
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [phoneSearch, setPhoneSearch] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(phoneSchema),
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [
        { data: phonesData, error: phonesErr },
        { data: ordersData, error: ordersErr },
        { data: usersData, error: usersErr }
      ] = await Promise.all([
        supabase.from("phones").select("*"),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*")
      ]);

      if (phonesErr) throw phonesErr;
      if (ordersErr) throw ordersErr;
      if (usersErr) throw usersErr;

      setPhones(phonesData || []);
      setOrders(ordersData || []);
      setUsers(usersData || []);
    } catch (err) {
      console.error("Error loading admin data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // KPIs Calculation
  const kpis = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

    const pendingOrders = orders.filter((o) => o.status === "pending").length;

    return {
      revenue: totalRevenue,
      totalOrders: orders.length,
      pendingOrders,
      totalPhones: phones.length,
      totalUsers: users.length,
    };
  }, [orders, phones, users]);

  // Phone CRUD Logic
  const handleOpenPhoneModal = (phone = null) => {
    if (phone) {
      setEditingPhone(phone);
      setValue("name", phone.name);
      setValue("brand", phone.brand);
      setValue("priceAmount", typeof phone.price === "object" ? phone.price.amount : phone.price);
      setValue("thumbnail", phone.thumbnail || (phone.images && phone.images[0]) || "");
      setValue("category", phone.category || "Smartphone");
    } else {
      setEditingPhone(null);
      reset();
    }
    setIsPhoneModalOpen(true);
  };

  const onSubmitPhone = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        brand: formData.brand,
        category: formData.category || "Smartphone",
        price: { amount: formData.priceAmount, currency: "EGP" },
        thumbnail: formData.thumbnail,
        images: [formData.thumbnail],
      };

      if (editingPhone) {
        const { error } = await supabase.from("phones").update(payload).eq("id", editingPhone.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("phones").insert({
          id: `phone-${Date.now()}`,
          ...payload
        });
        if (error) throw error;
      }

      setIsPhoneModalOpen(false);
      reset();
      fetchDashboardData();
    } catch (err) {
      alert("Error saving phone: " + err.message);
    }
  };

  const handleDeletePhone = async (id) => {
    if (!window.confirm("Are you sure you want to delete this phone?")) return;
    try {
      const { error } = await supabase.from("phones").delete().eq("id", id);
      if (error) throw error;
      fetchDashboardData();
    } catch (err) {
      alert("Error deleting phone: " + err.message);
    }
  };

  // Order Status Updater Logic (حل مشكلة عدم التعديل)
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      // التحديث المباشر بجدول orders المطابق للشرط في الداتابيز
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      // تحديث المكون محلياً لسرعة الاستجابة
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  // User Management
  const handleToggleUserBlock = async (userId, currentRole) => {
    const nextRole = currentRole === "blocked" ? "user" : "blocked";
    try {
      const { error } = await supabase.from("profiles").update({ role: nextRole }).eq("id", userId);
      if (error) throw error;
      fetchDashboardData();
    } catch (err) {
      alert("Failed to update user status: " + err.message);
    }
  };

  const filteredPhones = phones.filter((p) =>
    p.name?.toLowerCase().includes(phoneSearch.toLowerCase()) ||
    p.brand?.toLowerCase().includes(phoneSearch.toLowerCase())
  );

  return {
    activeTab,
    setActiveTab,
    phones: filteredPhones,
    orders,
    users,
    loading,
    kpis,
    phoneSearch,
    setPhoneSearch,
    isPhoneModalOpen,
    setIsPhoneModalOpen,
    editingPhone,
    selectedOrderDetails,
    setSelectedOrderDetails,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleOpenPhoneModal,
    onSubmitPhone,
    handleDeletePhone,
    handleOrderStatusChange,
    handleToggleUserBlock,
  };
}