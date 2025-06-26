# API Logic – dual-mode repo & payments

* **lib/repo.ts** picks **Postgres** if `DATABASE_URL` exists, otherwise uses
  totally in-memory arrays – perfect for Codex or Storybook tests.
* **lib/payments** chooses Stripe vs mock the same way (env key check).
* Each route focuses only on validation + calling repo/pay/payments, so
  swapping storage/payment backends later is one-line.

Env vars to set locally (in `.env.local`):

* DATABASE_URL
* STRIPE_SECRET_KEY
* NEXTAUTH_URL


## Purchase flow (added by 07_purchase_flow.sh)

* `POST /api/student/purchase`  
  * Pays via **Stripe** when `STRIPE_SECRET_KEY` is set, otherwise calls mock provider.  
  * Records `purchases` row and invokes `distribute_commission()` (Postgres) or in-memory calc.  

* `GET /api/instructor/earnings` now returns real totals based on purchases.

Database additions: `purchases` table and `distribute_commission()` stored procedure (see `database/proc_commission.sql`).
