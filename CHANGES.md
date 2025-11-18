CHANGES — LifeHub

Date range: 2025-11-13 → 2025-11-18
Author: assistant (edits applied to complete backend and upgrade budgets UI)

Summary
-------
This file records the edits made to the project to complete the backend wiring and upgrade the Budgets frontend page into a small finance dashboard.

Backend edits (2025-11-13)
--------------------------
- `src/db.js`
  - Centralized MongoDB connect logic in `connectDB()`.
  - Use modern `mongoose.connect(MONGODB_URI)` and preserved the startup message: `✅ MongoDB connected: <uri>`.
  - Log `Using MONGODB_URI:` for clarity.

- `src/server.js`
  - Replaced inline connect logic with `connectDB()`.
  - Added static file serving from `public/` so frontend pages and assets load from the same server.
  - Added graceful shutdown (close HTTP server and await mongoose connection close).
  - Kept existing API routes (tasks, studyplans, budgets, insights) and `/api/health`.

- `package.json`
  - Added `dotenv` to dependencies so `require('dotenv')` works at runtime.

Frontend: Budgets page (2025-11-18)
---------------------------------
- Edited `public/budgets.html` to add a finance-style dashboard layout:
  - Two-column grid with an interactive pie chart (Chart.js via CDN).
  - Category management UI (add/remove categories stored in `localStorage`) with emoji/symbol support.
  - Category filter and category select for adding budget entries.
  - Enhanced budget list entries showing category symbol, title, amount and delete action.
  - Chart legend that displays per-category totals.

Fixes (2025-11-18)
------------------
- Moved the budget entry form so that the input area appears above the expenses list (new entries are visible immediately below the form).
- Made the Add button an explicit `type="submit"` to ensure the form submit handler runs consistently across browsers.

Notes and verification
----------------------
- Performed smoke tests for backend endpoints (health, tasks create/list, budgets create/list) during development.
- The budgets UI uses the existing `/api/budgets` endpoints for data. Categories are currently stored client-side (localStorage) to avoid changing the backend API; we can add server-side categories later.
- Chart.js is loaded from CDN; no additional npm package required for the frontend.

How to run and verify locally
-----------------------------
1. Install dependencies:
   - `npm install`
2. Make sure MongoDB is running locally (or set `MONGODB_URI` environment variable).
3. Start the server:
   - `npm start` or `npm run dev`
4. Open the budgets page:
   - `http://localhost:3000/budgets.html`

If you want a git commit with these changes, or prefer categories to be stored on the server instead, tell me and I'll proceed with that next.
