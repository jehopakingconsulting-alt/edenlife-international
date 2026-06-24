import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await request.json();
  const { amount, currency = "cad", frequency, fund, anonymous, message, receipt } = body;

  if (!amount || amount < 1) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const metadata: Record<string, string> = {
    fund: fund || "general",
    frequency: frequency || "once",
    anonymous: String(anonymous || false),
    receipt: String(receipt ?? true),
  };
  if (message) metadata.message = message;
  if (user) metadata.user_id = user.id;

  if (frequency === "monthly") {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Don mensuel EDENLIFE — ${fund || "Général"}`,
              description: "Don récurrent mensuel à EDENLIFE International",
            },
            unit_amount: Math.round(amount * 100),
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${request.headers.get("origin")}/fr/donate?success=true`,
      cancel_url: `${request.headers.get("origin")}/fr/donate?cancelled=true`,
      customer_email: user?.email || undefined,
    });

    return NextResponse.json({ url: session.url });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: `Don EDENLIFE — ${fund || "Général"}`,
            description: "Don à EDENLIFE International",
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    metadata,
    success_url: `${request.headers.get("origin")}/fr/donate?success=true`,
    cancel_url: `${request.headers.get("origin")}/fr/donate?cancelled=true`,
    customer_email: user?.email || undefined,
  });

  return NextResponse.json({ url: session.url });
}
