# Success‑Academy — Developer Guide

*A self‑contained reference that any developer (or AI agent) can pick up to understand, run, and extend the project.*

---

## 1. Project Overview

| Feature           | Description                                                                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Domain**        | **success.academy** – multi‑tenant course platform                                                                                                                                                                      |
| **Actors**        | **Instructors** (create & sell), **Students** (buy & learn), **Affiliate tree** (up‑line commissions)                                                                                                                   |
| **Revenue split** | *Direct sales via instructor link*: **95 % instructor / 5 % platform**  *Catalog sales*: **50 % instructor / 50 % platform**  From the platform share, up to **25 %** (5 × 5 %) is paid as unilevel affiliate overrides |
| **MVP Scope**     | Auth (signup/login) • Course wizard • Instructor & Student dashboards • Catalog • Purchase flow • 5‑level commission ledger • File uploads • Docker‑ised stack                                                          |

---

## 2. Tech Stack

| Layer                | Technology & Version                    | Notes                     |
| -------------------- | --------------------------------------- | ------------------------- |
| **Frontend / SSR**   | Next.js **15** (App Router, TypeScript) | React 19                  |
| **Styling**          | Tailwind CSS v4                         | Utility‑first             |
| **Persistence**      | PostgreSQL **15** (Docker)              | `schema.sql` + `seed.sql` |
| **Auth**             | Custom (bcrypt + HTTP‑only cookie)      | Could swap for NextAuth   |
| **State / Cache**    | *None yet*                              | Open to Redis             |
| **Containerisation** | Docker & docker‑compose                 | `node:20‑slim`            |
| **CI / CD**          | *Planned* GitHub Actions                | build → push image        |

---

## 3. High‑Level Architecture

```txt
Browser ─┬─▶ Next.js App Router
         │      ├─ /app/pages  (SSR + React)
         │      └─ /app/api    (internal REST)
         └─▶ Static assets  (/public, uploads)

Next.js API routes ───▶ PostgreSQL
                         │
                         ├─ instructors / courses / … tables
                         └─ views (earnings, down‑line)
```

### Folder Map 

```txt
success-academy-dev/
├─ app/                       # Next.js src
│  ├─ api/                    # server routes (TS)
│  │   ├─ auth/               # signup, login, logout
│  │   ├─ courses/            # CRUD + publish
│  │   ├─ instructor/         # earnings, my-courses
│  │   └─ student/            # catalog, purchase
│  ├─ create-course/          # 4‑step wizard (client)
│  ├─ instructor/preview/     # pre‑publish view
│  ├─ instructor/dashboard/   # sales widgets (TODO)
│  ├─ student/dashboard/      # progress & referrals (TODO)
│  └─ globals.css             # Tailwind entry
├─ database/
│  ├─ schema.sql              # full DDL
│  └─ seed.sql                # two instructors + 3 courses
├─ uploads/                   # mounted/static lesson media
├─ Dockerfile & docker-compose.yml
└─ README.md / DEVELOPER_GUIDE.md
```
```

## 🤖 AI WORKFLOW — Codex & Local CLI
*Rules that every AI helper must follow when editing or running this repo.*

| Tool / Context       | Allowed to…                                | Must **NOT**…                                                    |
|----------------------|--------------------------------------------|------------------------------------------------------------------|
| **GitHub Codex**     | • Edit files, open PRs                     | • Run shell/Docker commands<br>• Touch `Dockerfile*`, `database/*.sql` |
| **Local AI CLI**     | • Read / write files<br>• **Execute** `docker`, `npm`, `psql` | • Commit if `npm run lint && npm run typecheck` fails            |

### 1 · Canonical Commands
```bash
# Dev stack (hot-reload on port 3001)
docker compose -f docker-compose.dev.yml up -d web db

# Stop stack
docker compose down

# Prod-like image test
docker compose up --build web

# Install JS deps inside running container
docker compose exec web npm ci

```
---

## 4. Local Setup

```bash

docker-compose up --build -d  # builds web & db containers

# browse
open http://localhost:3000     # or your OS equivalent
```

### Useful Docker commands

| Purpose            | Command                                                                  |
| ------------------ | ------------------------------------------------------------------------ |
| Rebuild *web* only | `docker-compose build web`                                               |
| Tail logs          | `docker-compose logs -f web`                                             |
| psql shell         | `docker exec -it success-academy-db psql -U postgres -d success_academy` |

---

## 5. Database Model *(excerpt)*

```sql
-- Core
instructors(id, name, email, password_hash, created_at)
courses(id, instructor_id, title, description, category, price, visibility, published, created_at)
modules(id, course_id, title, position)
lessons(id, module_id, title, position)
media_files(id, lesson_id, filename, mime_type, url)

-- Affiliate
affiliates(id, student_id, sponsor_id, created_at)
commissions(id, purchase_id, instructor_id, level, amount, created_at)
```

> **5‑level unilevel:** on purchase, a stored procedure walks up the `affiliates` tree inserting rows into `commissions` (amount = `sale_total × 0.05` for each level ≤ 5, capped by platform share).

---

## 6. Key API Endpoints

| Route                      | Method                           | Description                            |
| -------------------------- | -------------------------------- | -------------------------------------- |
| `/api/auth/signup`         | **POST** `{name,email,password}` | bcrypt‑hash → **200 OK** `{success}`   |
| `/api/auth/login`          | **POST** `{email,password}`      | sets `instructor_id` cookie            |
| `/api/courses`             | **POST** *multipart/form‑data*   | create **draft** course                |
| `/api/courses/:id/publish` | **POST**                         | `published = true`                     |
| `/api/instructor/courses`  | **GET**                          | list my courses (+ sales & status)     |
| `/api/instructor/earnings` | **GET**                          | total + per‑course \$                  |
| `/api/student/catalog`     | **GET**                          | paginated published courses            |
| `/api/student/purchase`    | **POST** `{course_id}`           | records sale, triggers commission proc |

All endpoints return JSON either `{ success: true }` or `{ error: "…" }`.

---

## 7. UI Flows

### Instructor

* **Dashboard** – cards (Total Earnings, Courses Live, Pending Payout) + 30‑day chart
* **Create Course** – 4‑step wizard *(Details → Curriculum → Pricing → Review + Publish)*
* **My Courses** – editable table (price, visibility, publish toggle)

### Student

* **Catalog** – category filter + search
* **Checkout** – Stripe (TODO) or mock purchase
* **Dashboard** – list purchased courses, progress %, referral link

### Dashboard Navigation (planned)

```
Dashboard
│── Courses (list + Create button)
│    └── Course Overview
│        ├── Curriculum Builder (drag‑and‑drop)
│        ├── Pricing & Coupons
│        ├── Affiliate Dashboard
│        └── Students
│── Earnings
│── Affiliate Management
└── Account Settings
```

---

## 8. Commission Logic (pseudo‑code)

```text
platform_share = sale_total × 50%   # catalog purchase
commission_pool = min(platform_share, sale_total × 25%)

sponsor = buyer.sponsor
for level in 1..5:
    if sponsor is None: break
    commission = sale_total × 5%
    insert_commission(purchase_id, sponsor.id, level, commission)
    sponsor = sponsor.sponsor

# Direct instructor link → platform_share = 5%, so affiliate path skipped
```

*Stored procedure skeleton lives in **`database/proc_commission.sql`** (TODO).*

---

## 9. Roadmap

| Phase | Deliverable                                      |
| ----- | ------------------------------------------------ |
| **1** | MVP scaffold *(this repo)* – **DONE**            |
| **2** | Instructor dashboard UI + earnings endpoint      |
| **3** | Student catalog, purchase + Stripe integration   |
| **4** | Commission procedure, down‑line tree, payouts UI |
| **5** | Notifications, marketing pages, SEO, CI/CD + QA  |

---

## 10. Getting Help / Contributing

1. **Fork → feature branch → PR** (use *conventional commits*).
2. **Lint/type‑check** locally: `npm run lint` *(ESLint + TypeScript must pass).*
3. *Unit tests* TBD (Jest + RTL).

---

## 11. Workflow Cheat‑Sheet

### 1 · Codex Task → Pull Request

1. Codex checks out \`\`.
2. Applies edits.
3. Pushes branch & opens PR.

### 2 · Sync & Review in VS Code

```bash
git fetch origin
# checkout the Codex branch
git checkout codex/task-1234
# run build/tests locally, tweak, commit, push
```

### 3 · Merge the PR

*Merge on GitHub or via VS Code GitHub extension.*

### 4 · Update Local `main`

```bash
git checkout main
git pull origin main
```

### 5 · Sync Codex Environment

```bash
cd /workspace/success-academy-dev
git pull origin main

npm ci
npm --prefix app ci
npm --prefix app run build
```

**Why this matters** *Isolation* — each task lives on its own branch.
*Review* — you run the exact code locally before merge.
*Sync* — both IDE & Codex stay in lock‑step with `main`, avoiding stale files and merge conflicts.

---

*Last updated: ****June 23 2025**** (bootstrap guide, phase‑2 tasks pending)*
