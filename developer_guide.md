Success‑Academy – Developer Guide
Purpose  – A self‑contained reference any developer (or AI agent) can pick up to understand, run, and extend the project. Sections cover vision, tech, architecture, local setup, database, API contracts, UI routes, revenue logic, and future roadmap.

1  Project Overview
Feature
Description
Domain
success.academy – multi‑tenant course platform.
Actors
Instructors (create + sell), Students (buy + learn), Affiliate tree (up‑line commissions).
Revenue split
 Direct sales via instructor link → 95 % instructor / 5 % platform.Catalog sales → 50 % instructor / 50 % platform. From the platform share, up to 25 % (5 × 5 %) is paid as unilevel affiliate overrides.
MVP Scope
Auth (signup/login), Course wizard, Instructor & Student dashboards, Catalog, Purchase flow, 5‑level commission ledger, file uploads, Dockerised stack.


2  Tech Stack
Layer
Technology & Version
Notes
Frontend / SSR
Next.js 15 (App Router, TypeScript)
React 19.
Styling
Tailwind CSS v4
Utility‑first.
Persistence
PostgreSQL 15 (Docker)
schema + seed SQL.
Auth
Custom (bcrypt + HTTP‑only cookie)
could swap for NextAuth.
State / Cache
None yet
open to Redis.
Containerisation
Docker & docker‑compose
node:20‑slim.
CI / CD
‑ (future GitHub Actions)
build → push image.


3  High‑Level Architecture
Browser ─┬─▶ Next.js App Router
         │      ├─ /app/pages  (SSR + React)
         │      └─ /app/api    (internal REST)
         └─▶ Static assets  (/public, uploads)

Next.js API routes ───▶ PostgreSQL
                         │
                         ├─ instructors / courses / … tables
                         └─ views (earnings, down‑line)

Folder Map (after running setup_full_stack.sh)
success-academy-chatgpt45/
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


4  Local Setup
# clone & bootstrap
chmod +x setup_full_stack.sh
./setup_full_stack.sh        # writes all files

docker-compose up --build -d # builds web & db containers

# browse
open http://localhost:3000   # or your OS equivalent

### Useful Docker commands
purpose
command
rebuild web only
docker-compose build web
tail logs
docker-compose logs -f web
psql shell
docker exec -it success-academy-db psql -U postgres -d success_academy


5  Database Model (excerpt)
instructors(id, name, email, password_hash, created_at)
courses(id, instructor_id, title, description, category, price, visibility, published, created_at)
modules(id, course_id, title, position)
lessons(id, module_id, title, position)
media_files(id, lesson_id, filename, mime_type, url)

-- Affiliate
affiliates(id, student_id, sponsor_id, created_at)
commissions(id, purchase_id, instructor_id, level, amount, created_at)

5‑level unilevel: on purchase, stored proc walks up affiliates tree inserting rows into commissions (amount = sale_total × 0.05 for each level ≤5, capped by platform share).

6  Key API Endpoints
Route
Method
Description
/api/auth/signup
POST {name,email,password}
bcrypt‑hash, return {success}
/api/auth/login
POST {email,password}
sets instructor_id cookie
/api/courses
POST multipart/form‑data
create draft course
/api/courses/:id/publish
POST
flag published=true
/api/instructor/courses
GET
list my courses with sales & status
/api/instructor/earnings
GET
total + per‑course $
/api/student/catalog
GET
paginated published courses
/api/student/purchase
POST {course_id}
records sale, triggers commission proc

All endpoints return JSON { success:true } or { error:"msg" }.

7  UI Flows
Instructor
Dashboard – cards (Total Earnings, Courses Live, Pending Payout). Chart of last 30 days.


Create Course 4‑step wizard (Details ▸ Curriculum ▸ Pricing ▸ Review + Publish).


My Courses – table editable (price, visibility, publish toggle).


Student
Catalog – filter by category + search.


Checkout – basic Stripe (TODO) or mock purchase.


Dashboard – list purchased courses, progress %, referral link.


Dashboard
│── Courses (List of instructor’s courses + Create Course button)
│    └── Course Overview (Analytics, revenue)
│        ├── Curriculum Builder (Drag-and-drop module/lesson editor)
│        ├── Pricing & Coupons
│        ├── Affiliate Dashboard (Referral links, tracking)
│        └── Students (List & interaction)
│── Earnings (detailed breakdown)
│── Affiliate Management (network stats, multi-level referrals)
└── Account Settings (profile, security, payouts)


8  Commission Logic
platform_share = sale_total × 50%  (catalog purchase)
to_affiliates   = min(platform_share, sale_total × 25%)
for level 1..5:
    pct = 5%
    if sponsor exists:
        commission = sale_total × pct
        insert commissions(..., level, commission)
        sponsor = sponsor's sponsor
    else break
remainder → platform revenue

Direct instructor link → platform share = 5 %, so affiliate commission path skipped.
Stored‑procedure skeleton lives in /database/proc_commission.sql (TODO).

9  Roadmap
Phase
Deliverable
1
MVP scaffold (this repo) – DONE
2
Instructor dashboard UI + earnings endpoint
3
Student catalog, purchase + Stripe integration
4
Commission procedure, down‑line tree, payouts UI
5
Notifications, marketing pages, SEO, CI/CD + QA


10  Getting Help / Contributing
Fork → feature branch → PR (conventional commits).


ESLint / TypeScript must pass: npm run lint.


Unit tests TBD (Jest + RTL).



Last updated – June 23 2025 (bootstrap guide, phase‑2 tasks pending).

