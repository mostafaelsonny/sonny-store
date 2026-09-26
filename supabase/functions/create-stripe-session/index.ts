import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2022-11-15",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId, items, shippingFee, customerEmail } = await req.json();

    // تجهيز عناصر المنتجات بصيغة يفهمها Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "egp",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe تحسب السعر بالـ Cents / القروش
      },
      quantity: item.quantity,
    }));

    // إضافة مصاريف الشحن كعنصر منفصل لو وجدت
    if (shippingFee > 0) {
      line_items.push({
        price_data: {
          currency: "egp",
          product_data: {
            name: "Shipping Fee",
          },
          unit_amount: Math.round(shippingFee * 100),
        },
        quantity: 1,
      });
    }

    // إنشاء جلسة الدفع لدى Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: customerEmail,
      client_reference_id: orderId,
      success_url: `${req.headers.get("origin")}/order-success?order_id=${orderId}&payment=stripe`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});