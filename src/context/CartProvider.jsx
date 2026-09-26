import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpenCart , setOpenCart] = useState(false)
  const [loadingCart, setLoadingCart] = useState(true);
  const { user } = useAuth();

  // 1. جلب وتزامن السلة فور تغيير حالة المستخدم (Login / Logout)
  useEffect(() => {
    const syncCart = async () => {
      setLoadingCart(true);

      if (user) {
        // أ) دمج السلة المؤقتة للزائر مع قاعدة البيانات عند تسجيل الدخول
        const localCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        if (localCart.length > 0) {
          await mergeLocalCartToDB(localCart, user.id);
          localStorage.removeItem("guest_cart");
        }

        // ب) جلب السلة الفعلية المدمجة من Supabase
        await fetchCartFromDB(user.id);
      } else {
        // ج) تحميل السلة المحلية فقط للزائر
        const localCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        setCartItems(localCart);
      }

      setLoadingCart(false);
    };

    syncCart();
  }, [user]);

  // جلب السلة من Supabase وتحويل product_id إلى id
  const fetchCartFromDB = async (userId) => {
    const { data, error } = await supabase
      .from("cart_items")
      .select("product_id, quantity , price , image , name")
      .eq("user_id", userId);

    if (!error && data) {
      const formatted = data.map((item) => ({
        id: item.product_id,
        quantity: item.quantity,
        price : item.price ,
        image : item.image ,
        name : item.name
      }));
      setCartItems(formatted);
    }
  };

  // دمج السلة المحلية مع Supabase
  const mergeLocalCartToDB = async (localCart, userId) => {
    for (const item of localCart) {
      await supabase.from("cart_items").upsert(
        {
          user_id: userId,
          product_id: item.id,
          quantity: item.quantity,
          price : item.price ,
          image : item.image , 
          name : item.name

        },
        { onConflict: "user_id, product_id" }
      );
    }
  };




  

  // 2. إضافة عنصر للسلة
  const addToCart = async (product) => {
    console.log(product);
    const productId = product.id;
    const productName = product.name
    // استخراج القيمة الرقمية أو نص السعر فقط
    const priceValue = typeof product.price === 'object' ? product.price.amount : product.price;
    const img = Array.isArray(product.images) ? product.images[0] : product.image;

    if (user) {
      const existing = cartItems.find((item) => item.id === productId);
      const newQty = existing ? existing.quantity + 1 : 1;

      // Optimistic UI Update
      setCartItems((prev) => {
        const found = prev.find((item) => item.id === productId);
        if (found) {
          return prev.map((item) =>
            item.id === productId ? { ...item, quantity: newQty } : item
          );
        }
        // 👇 هنا التعديل: تخزين الأبعاد المبسطة فقط (بدون إدخال price الأوبجكت)
        return [...prev, { id: productId, quantity: 1, price: priceValue, image: img  , name : productName}];
      });

      await supabase.from("cart_items").upsert(
        {
          user_id: user.id,
          product_id: productId,
          quantity: newQty,
          price: priceValue,
          image: img ,
          name : productName 
        },
        { onConflict: "user_id,product_id" }
      );
    } else {
      setCartItems((prev) => {
        let updated;
        const found = prev.find((item) => item.id === productId);
        if (found) {
          updated = prev.map((item  ) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // 👇 التعديل هنا أيضاً للزائر
          updated = [...prev, { id: productId, quantity: 1, price: priceValue, image: img , name : productName }];
        }
        localStorage.setItem("guest_cart", JSON.stringify(updated));
        return updated;
      });
    }
  };


  // 4. تقليل كمية منتج في السلة
  const decreaseQuantity = async (productId) => {
    const existing = cartItems.find((item) => item.id === productId);
    if (!existing) return;

    // لو الكمية 1، يبقى التقليل معناه حذف المنتج بالكامل
    if (existing.quantity === 1) {
      await removeFromCart(productId);
      return;
    }

    const newQty = existing.quantity - 1;

    if (user) {
      // Optimistic Update للمستخدم المسجل
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQty } : item
        )
      );

      await supabase.from("cart_items").upsert(
        {
          user_id: user.id,
          product_id: productId,
          quantity: newQty,
          price: existing.price,
          image: existing.image,
          name: existing.name
        },
        { onConflict: "user_id,product_id" }
      );
    } else {
      // التحديث للزائر في LocalStorage
      setCartItems((prev) => {
        const updated = prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQty } : item
        );
        localStorage.setItem("guest_cart", JSON.stringify(updated));
        return updated;
      });
    }
  };
  // 3. حذف عنصر من السلة
  const removeFromCart = async (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));

    if (user) {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
    } else {
      const updated = cartItems.filter((item) => item.id !== productId);
      localStorage.setItem("guest_cart", JSON.stringify(updated));
    }
  };

    function toggleCart() {
    if (isOpenCart) {
      setOpenCart(false);
    } else {
      setOpenCart(true);
    }
  }

  const clearCart = async () => {
    // 1. تفريغ الـ State في الـ UI فوراً (Optimistic UI Update)
    setCartItems([]);

    // 2. مسح السلة الخاصة بالزائر من الـ LocalStorage دائماً
    localStorage.removeItem("guest_cart");

    // 3. مسح السلة من Supabase لو المستخدم عامل Login
    if (user?.id) {
      try {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", user.id);

        if (error) {
          console.error("Error clearing cart from Supabase:", error.message);
        }
      } catch (err) {
        console.error("Unexpected error clearing cart:", err);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        loadingCart,
        toggleCart ,
        isOpenCart ,
        decreaseQuantity ,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);