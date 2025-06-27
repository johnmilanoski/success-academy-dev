/** Fake payment helper for local/dev builds */
export async function pay(amount: number, currency = "usd") {
  void currency;
  const id = "pi_" + Math.random().toString(36).slice(2, 10);
  console.log(`💸  mock payment – amount $${amount / 100}, id=${id}`);
  return { id, status: "succeeded" };
}
