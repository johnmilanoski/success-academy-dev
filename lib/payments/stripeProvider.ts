import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-05-28.basil",
});

/** Charge the customer. `amount` in cents, default currency = USD */
export async function pay(amount: number, currency = "usd") {
  // Minimal PaymentIntent – flesh out later
  const pi = await stripe.paymentIntents.create({ amount, currency });
  return { id: pi.id, status: pi.status };
}
