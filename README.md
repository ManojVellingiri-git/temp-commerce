# FreshCart — Premium Grocery E-Commerce Website

FreshCart is a React + Vite grocery storefront with product discovery, category filters, search, cart, wishlist, quick-view, checkout demo, and responsive layouts.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Refinements in this delivery

- Preserved the existing FreshCart component architecture and shopping interactions.
- Consolidated the forest-green, fresh-green, lime, and warm-cream design tokens.
- Added a refined motion layer for section reveals, product cards, category tiles, buttons, and image hover states.
- Improved typography and spacing at tablet and mobile breakpoints.
- Added small-screen product-grid rules, touch-friendly control sizing, safe-area spacing, and better modal scrolling.
- Disabled hover-only visual effects on touch devices and respected reduced-motion preferences.
- Added viewport-fit, theme-color, and SEO description metadata.
- Removed repeated default component imports and restored the associated data import declarations.

## Notes

- Product and customer content is sample/demo content.
- Checkout is a frontend demonstration unless a real backend and payment provider are connected.
- External image and Google Font requests require an internet connection.


## Premium motion pass

The site now includes a site-wide GSAP motion director (`src/components/MotionDirector.jsx`).
It adds:
- A staged hero entrance for copy and imagery.
- Scroll-triggered reveals for headings, descriptions, imagery and product/editorial cards.
- Subtle desktop-only parallax for the lead hero image.
- Entrance feedback for dynamically opened dialogs and status surfaces.
- Reduced-motion handling and cleanup of animation observers/triggers.

The existing React commerce state, cart, wishlist, product filters and modal flows are preserved.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Scope and production note

This repository is a frontend storefront prototype. The current checkout and order experience is demonstrative unless connected to a real backend, inventory service, authentication provider, payment gateway, delivery partner and operational admin system. Before a commercial launch, complete integration, security, accessibility, browser/device, analytics and load testing with the real business requirements.
