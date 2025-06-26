import { pay as stripePay } from "./stripeProvider";
import { pay as mockPay } from "./mockProvider";

const canUseStripe = !!process.env.STRIPE_SECRET_KEY;
/** Unified `pay` function used by the API routes */
export const pay = canUseStripe ? stripePay : mockPay;
