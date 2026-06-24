import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Missing config" }, { status: 400 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata || {};

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabaseAdmin.from("donations").insert({
      user_id: metadata.user_id || null,
      amount: (session.amount_total || 0) / 100,
      currency: session.currency?.toUpperCase() || "CAD",
      frequency: metadata.frequency || "once",
      fund: metadata.fund || "general",
      payment_method: "stripe",
      payment_id: (session.payment_intent as string) || (session.subscription as string),
      status: "completed",
      anonymous: metadata.anonymous === "true",
      message: metadata.message || null,
      receipt_requested: metadata.receipt !== "false",
    });
  }

  return NextResponse.json({ received: true });
}
