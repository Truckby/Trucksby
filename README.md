
# Trucksby

Trucksby is a full-stack web application for managing and showcasing truck inventories. It provides a platform for sellers to list trucks, manage their inventory, and handle subscriptions, while buyers can browse, search, and contact sellers. The project is built with a modern React frontend (Vite, Redux, Ant Design, Tailwind CSS) and a robust Node.js/Express backend with MongoDB, Stripe, and AWS S3 integration.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [User Roles](#user-roles)
- [Core Modules](#core-modules)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [License](#license)

---

## Features

- **Authentication & Authorization:** Secure login, registration, JWT-based auth, protected routes, and role-based access (user, seller).
- **Truck Inventory Management:** Sellers can add, edit, delete, and manage their truck listings with images, details, and pricing.
- **Public Inventory & Detail Pages:** Buyers can browse all trucks, view detailed information, and contact sellers.
- **Seller Dashboard:** Sellers have a dedicated dashboard to manage their inventory, view analytics, and handle subscriptions.
- **Image Uploads:** Truck and user images are uploaded and stored securely using AWS S3.
- **Subscription & Payments:** Sellers can purchase subscription plans via Stripe to unlock premium features and manage their plan.
- **Responsive UI:** Modern, mobile-friendly design using Ant Design and Tailwind CSS.
- **Notifications & Modals:** User feedback via toasts, modals, and error handling.
- **Search & Filtering:** Buyers can search and filter trucks by various criteria.
- **Admin Features:** (If enabled) Admins can manage users, trucks, and monitor platform activity.

---

## Architecture

- **Frontend:** SPA built with React 19, Vite, Redux Toolkit, React Router v7, Ant Design, Tailwind CSS, Axios, Formik, and Yup.
- **Backend:** RESTful API using Node.js, Express, MongoDB (Mongoose), Stripe for payments, AWS SDK for S3, Nodemailer for emails, Multer for file uploads, and JWT for authentication.
- **Separation of Concerns:** Clear separation between client and server, with modularized code for controllers, services, models, routes, and middleware.

---

## User Roles

- **Buyer/User:** Can browse trucks, view details, and contact sellers.
- **Seller:** Can manage their own truck inventory, profile, and subscription plan.
- **Admin:** (Optional) Can manage all users, trucks, and platform settings .

---

## Core Modules

### Frontend

- **Authentication:** Login, signup, protected routes, and user state management.
- **Inventory:** List, search, and filter trucks; view truck details.
- **Seller Dashboard:** Add/edit/delete trucks, manage images, view subscription status.
- **Subscription Plans:** View and purchase plans, Stripe checkout integration.
- **Profile Management:** Update user/seller profile, upload profile images.
- **UI Components:** Custom modals, loaders, notifications, and responsive layouts.

### Backend

- **User Management:** Registration, login, JWT auth, role-based access.
- **Truck Management:** CRUD operations for trucks, image uploads to S3.
- **Subscription & Payments:** Stripe integration for plan management and webhooks.
- **Email Notifications:** Send emails for registration, password reset, and contact forms.
- **Validation & Error Handling:** Centralized validation and error middleware.
- **Admin Tools:** (If enabled) Manage users, trucks, and monitor activity.

---

## Tech Stack

**Frontend:**
- React 19 (Vite)
- Redux Toolkit
- React Router v7
- Ant Design, Tailwind CSS
- Axios, Formik, Yup

**Backend:**
- Node.js, Express
- MongoDB (Mongoose)
- Stripe, AWS SDK, Nodemailer
- Multer (file uploads)
- JWT authentication

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- AWS S3 bucket (for image uploads)
- Stripe account (for payments)

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/ShoaibFarooka/Trucksby.git
cd Trucksby
```

#### 2. Install dependencies

**Frontend:**
```sh
cd client
npm install
```

**Backend:**
```sh
cd ../server
npm install
```

#### 3. Environment Variables

- Copy `.env.example` to `.env` in the `server` directory and fill in your MongoDB URI, JWT secret, Stripe keys, AWS credentials, etc.

#### 4. Run the app

**Backend:**
```sh
npm run dev
```

**Frontend:**
```sh
cd ../client
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:5000` (or your configured port) for the backend API.

---

## Folder Structure

```
client/   # React frontend (Vite)
  src/
    components/      # Reusable UI components
    pages/           # Page-level components (common, seller)
    redux/           # Redux slices and store
    services/        # API and utility services
    assets/          # Images, videos
server/   # Node.js backend (Express, MongoDB)
  controllers/       # Route controllers
  models/            # Mongoose models
  routes/            # API routes
  services/          # Business logic and integrations
  middleware/        # Express middleware
  configs/           # Config files (DB, S3, Stripe, etc.)
  static/            # Static files (images, etc.)
  validationSchemas/ # Yup validation schemas
```

---

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production (frontend)
- `npm run lint` – Lint code (frontend)
- `npm start` – Start backend server (production)

---

## License

MIT


#### 3. Environment Variables

- Copy `.env.example` to `.env` in the `server` directory and fill in your MongoDB URI, JWT secret, Stripe keys, AWS credentials, etc.

#### 4. Run the app

**Backend:**
```sh
npm run dev
```

**Frontend:**
```sh
cd ../client
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:5000` (or your configured port) for the backend API.

## Folder Structure

```
client/   # React frontend (Vite)
server/   # Node.js backend (Express, MongoDB)
```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production (frontend)
- `npm run lint` – Lint code (frontend)
- `npm start` – Start backend server (production)

## License

MIT
