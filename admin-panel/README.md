# Gurkhacamp Admin Panel

A standalone admin dashboard scaffold for **temp-commerce.onrender.com** (Gurkhacamp Shopping Complex — groceries & everyday essentials). Plain HTML/CSS/JS, no build step, so you can drop the whole folder into any project and open it directly.

> Note: `temp-commerce.onrender.com` renders its storefront client-side, so this was built from the site's visible branding (name, dark-green `#123D2A` theme, grocery/essentials positioning) plus standard e-commerce admin needs — not from scraping its live product/order data. Swap in your real data via `js/data.js` as described below.

## What's included

| File | Purpose |
|---|---|
| `login.html` | Admin login screen (demo auth — any email/password works) |
| `index.html` | Dashboard — revenue, orders, customers, low-stock alerts, weekly chart, recent activity |
| `products.html` | Product catalog — search, filter by category, add/edit/delete via modal |
| `categories.html` | Category manager |
| `orders.html` | Orders table — filter by status, inline status update, order detail modal |
| `customers.html` | Customer list — search, block/unblock |
| `coupons.html` | Coupon/offer manager — create, edit, delete, track usage |
| `settings.html` | Store profile, admin users, and a "connect to backend" guide |
| `css/style.css` | Shared theme (matches the site's dark-green `#123D2A` + gold accent) |
| `js/app.js` | Sidebar/topbar shell, icons, auth guard, toast, status badges |
| `js/data.js` | Mock data + `localStorage` persistence — **this is what you replace with real API calls** |

## Running it

Just open `login.html` in a browser (or serve the folder with any static server). All data edits persist to `localStorage` so the demo survives refreshes; use `Store.reset()` in the browser console to wipe it back to the seed data.

## Wiring it to your real backend

Everything reads/writes through the `DB` object defined in `js/data.js`. To go live:

1. Replace the `SEED` data and `Store.load()`/`persist()` calls with `fetch()` calls to your API, e.g.:
   - `GET/POST/PUT/DELETE /api/admin/products`
   - `GET /api/admin/orders`, `PATCH /api/admin/orders/:id` (status updates)
   - `GET /api/admin/customers`, `PATCH /api/admin/customers/:id` (block/unblock)
   - `GET/POST/PUT/DELETE /api/admin/coupons`
2. Replace the `sessionStorage` login in `login.html` / `requireAuth()` (`js/app.js`) with a real login request and token/cookie check.
3. Add server-side auth middleware on every `/api/admin/*` route so only admins can call them — this frontend has no real security on its own.

## Customizing

- Branding/colors live as CSS variables at the top of `css/style.css` (`--green-900`, `--gold`, etc.) — already set to the site's `#123D2A`.
- Sidebar links/icons are defined once in the `NAV` array in `js/app.js`; add a page there and it shows up everywhere.
- Add new pages by copying an existing one and calling `renderShell("yourpage.html", "Title")` at the top.
