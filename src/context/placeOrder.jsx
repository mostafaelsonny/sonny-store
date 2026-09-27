import { supabase } from "../lib/supabaseClient";

export const placeOrder = async ({ shippingData, cartItems, totalAmount, userId, clearCart, initialStatus = "pending" }) => {
  try {
    // أ) إنشاء السجل في جدول orders
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          full_name: shippingData.fullName,
          phone: shippingData.phone,
          address: shippingData.address,
          city: shippingData.city,
          total_amount: totalAmount,
          shipping_cost: Math.random(),
          status: initialStatus, // "pending" for COD, "processing" for Card
        },
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // ب) تجهيز وإدخال المنتجات في order_items
    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      price: item.price,
      quantity: item.quantity,
      image_url: item.image,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;



    // 3️⃣ 🚀 [الجزء الناقص]: تحديث ملف المستخدم في جدول profiles بالبيانات الجديدة
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        phone_number: shippingData.phone, // أو اسم العامود عندك في Supabase (مثلاً phone)
        shipping_address: `${shippingData.city}, ${shippingData.address}`, // أو فصلهم حسب اعمدة جدولك
        
      })
      .eq("id", userId);

    if (profileError) {
      console.warn("Could not update profile info, but order was created:", profileError.message);
    }
    
    // ج) تفريغ السلة من الـ Supabase Database ومن الـ State المحلية
    await supabase.from("cart_items").delete().eq("user_id", userId);
    clearCart();

    return { success: true, orderId: order.id };
  } catch (err) {
    console.error("Order Placement Error:", err.message);
    return { success: false, error: err.message };
  }
};