# UI Skeleton

* **components/** now holds reusable UI pieces:
  * `Layout` wraps every page (header + sidebar).
  * `Card`, `Stepper`, `CourseCard` demonstrate Tailwind patterns.
* Starter pages:
  * `/instructor/dashboard` – metric cards + chart placeholder.
  * `/student/catalog` – responsive grid fed by `/api/student/catalog`.
  * `/create-course/step-1-details` – first step of 4-step wizard.
* Extend by copying Tailwind patterns; add more client components as needed.

## New pages

* `/checkout` – mock checkout form that hits the purchase API.
* `/purchase/success` – confirmation page.
* Instructor dashboard cards now pull real totals (after you log in & mock a purchase).
