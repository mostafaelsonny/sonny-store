import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";

const FavContext = createContext();

export default function FavProvider({ children }) {
  const [favPhones, setFavPhones] = useState([]);
  const [loadingFav, setLoadingFav] = useState(true);
  const { user } = useAuth();

  // 1. جلب وتزامن المفضلة فور تغيير حالة المستخدم (Login / Logout)
  useEffect(() => {
    const syncFavs = async () => {
      setLoadingFav(true);

      if (user) {
        // أ) دمج المفضلة المؤقتة للزائر مع قاعدة البيانات عند تسجيل الدخول
        const localFavs = JSON.parse(localStorage.getItem("guest_favs") || "[]");
        if (localFavs.length > 0) {
          await mergeLocalFavsToDB(localFavs, user.id);
          localStorage.removeItem("guest_favs");
        }

        // ب) جلب المفضلة الفعلية المدمجة من Supabase
        await fetchFavsFromDB(user.id);
      } else {
        // ج) تحميل المفضلة المحلية فقط للزائر
        const localFavs = JSON.parse(localStorage.getItem("guest_favs") || "[]");
        setFavPhones(localFavs);
      }

      setLoadingFav(false);
    };

    syncFavs();
  }, [user]);

  // جلب المفضلة من Supabase وتحويل product_id إلى id
  const fetchFavsFromDB = async (userId) => {
    const { data, error } = await supabase
      .from("wishlist")
      .select("product_id, name, image, price")
      .eq("user_id", userId);

    if (!error && data) {
      const formatted = data.map((item) => ({
        id: item.product_id,
        name: item.name,
        image: item.image,
        price: item.price,
      }));
      setFavPhones(formatted);
    }
  };

  // دمج المفضلة المحلية مع Supabase
  const mergeLocalFavsToDB = async (localFavs, userId) => {
    for (const item of localFavs) {
      await supabase.from("wishlist").upsert(
        {
          user_id: userId,
          product_id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
        },
        { onConflict: "user_id,product_id" }
      );
    }
  };

  // 2. إتاحة دالة handleFavPhones للتبديل (إضافة أو إزالة)
  const handleFavPhones = async (phone) => {
    const productId = phone.id;
    const productName = phone.name;
    const priceValue = typeof phone.price === "object" ? phone.price?.amount : phone.price;
    const img = Array.isArray(phone.images) ? phone.images[0] : (phone.image || phone.images);

    const isExist = favPhones.some((item) => item.id === productId);

    if (isExist) {
      // ❌ حالة الإزالة من المفضلة
      setFavPhones((prev) => prev.filter((item) => item.id !== productId));

      if (user) {
        await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
      } else {
        const updated = favPhones.filter((item) => item.id !== productId);
        localStorage.setItem("guest_favs", JSON.stringify(updated));
      }
    } else {
      // ➕ حالة الإضافة للمفضلة
      const newItem = {
        id: productId,
        name: productName,
        image: img,
        price: priceValue,
      };

      setFavPhones((prev) => [...prev, newItem]);

      if (user) {
        await supabase.from("wishlist").upsert(
          {
            user_id: user.id,
            product_id: productId,
            name: productName,
            image: img,
            price: priceValue,
          },
          { onConflict: "user_id,product_id" }
        );
      } else {
        const updated = [...favPhones, newItem];
        localStorage.setItem("guest_favs", JSON.stringify(updated));
      }
    }
  };

  return (
    <FavContext.Provider
      value={{
        favPhones,
        handleFavPhones,
        loadingFav,
      }}
    >
      {children}
    </FavContext.Provider>
  );
}

export const useFav = () => {
  return useContext(FavContext);
};