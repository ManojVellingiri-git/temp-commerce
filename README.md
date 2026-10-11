# FreshCart — Full-Stack Grocery E-Commerce Application

[![Deployed on Render](https://img.shields.io/badge/Render-Deployed%20Live-brightgreen?logo=render&logoColor=white)](https://temp-commerce.onrender.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-temp--commerce-blue?logo=github)](https://github.com/ManojVellingiri-git/temp-commerce)

- 🌐 **Live Frontend Website:** [https://temp-commerce.onrender.com](https://temp-commerce.onrender.com)
- ⚡ **Live Backend API Service:** [https://temp-commerce-api.onrender.com](https://temp-commerce-api.onrender.com)
- 📦 **GitHub Repository:** [https://github.com/ManojVellingiri-git/temp-commerce](https://github.com/ManojVellingiri-git/temp-commerce)

---

## 🚀 1-Click Deployment on Render

This repository includes a **Render Blueprint** (`render.yaml`) that configures both the frontend React Single Page Application and the Node.js Express API.

### Steps to Deploy on Render:
1. Open the **[Render Dashboard](https://dashboard.render.com/)**.
2. Click **New +** > **Blueprint**.
3. Select your repository: **`ManojVellingiri-git/temp-commerce`**.
4. Set your **`MONGODB_URI`** connection string (from MongoDB Atlas or cloud provider).
5. Click **Apply** — Render automatically builds and deploys both services:
   - **Frontend Static Site:** `temp-commerce` -> [https://temp-commerce.onrender.com](https://temp-commerce.onrender.com)
   - **Backend Web Service:** `temp-commerce-api` -> [https://temp-commerce-api.onrender.com](https://temp-commerce-api.onrender.com)

---

## 📱 Features & Highlights

FreshCart is a modern full-stack e-commerce application designed for grocery and supermarket shopping:

- **100% Mobile Responsive:** Tested and optimized across mobile, tablet, and desktop viewports (320px–1440px).
- **Authentication & Roles:** JWT authentication with customer accounts and role-protected Admin Dashboard.
- **Product Catalog & Search:** Filter by category, price, and rating with list/grid view switching.
- **Cart & Wishlist:** Persistent offcanvas cart drawer, responsive checkout, and wishlist management.
- **Razorpay Payments:** Integrated payment gateway with test-mode support.
- **Docker Staging Support:** Production-ready multi-container configuration with Nginx reverse proxy gateway.

---

## 🛠 Tech Stack

- **Frontend:** React 18, React Router v6, Bootstrap 5.3.3, Vanilla CSS
- **Backend:** Node.js, Express 5, MongoDB 7 / Mongoose, JWT, Razorpay
- **Infrastructure:** Docker Compose, Nginx Gateway, Render Blueprint