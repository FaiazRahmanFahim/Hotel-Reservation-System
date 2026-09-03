# 🏨 Hotel Reservation & Management System

A full-stack, enterprise Hotel Reservation and Administration Portal built with **NestJS** (Backend) and **Next.js 15 App Router** (Frontend), featuring PostgreSQL with TypeORM, Session Authentication, and TailwindCSS UI components.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI & Icons**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Charts**: [Recharts](https://recharts.org/), [Chart.js](https://www.chartjs.org/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Theme**: Dark / Light Mode with `next-themes`

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Database / ORM**: [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/)
- **Authentication**: Session-based auth with `express-session` & `bcrypt`
- **Mailing**: `@nestjs-modules/mailer` with Nodemailer (SMTP OTP reset)
- **File Uploads**: Multer for profile picture uploads

---

## 📁 Repository Structure

```plaintext
Hotel-Reservation-System/
├── backend/                  # NestJS Backend Application
│   ├── src/
│   │   ├── admin_profile/    # Admin Profile CRUD & picture uploads
│   │   ├── auth/             # Login, Logout, Session handling
│   │   ├── booking-history/  # Booking history & status management
│   │   ├── central_table/    # Central reservation records
│   │   ├── customer/         # Customer CRM & membership tiers
│   │   ├── hoteladmin-login/ # Password reset & OTP verification
│   │   ├── notification/     # Live alerts & booking approvals
│   │   ├── posthotel_info/   # Hotel property management
│   │   └── reservation-details/# Room reservation records & analytics
│   └── .env.example          # Backend environment template
│
├── frontend/                 # Next.js 15 Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/    # Admin dashboard & management subpages
│   │   │   │   ├── bookings/ # Booking history & invoice print view
│   │   │   │   ├── customers/# Customer directory & membership filters
│   │   │   │   ├── hotels/   # Hotel listing, add & edit pages
│   │   │   │   ├── notification/ # Notification center
│   │   │   │   ├── profile/  # Admin profile view & edit
│   │   │   │   └── reservations/# Reservation records & printable details
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   ├── otp/
│   │   │   └── reset-password/
│   │   ├── components/       # Reusable UI & Layout Components
│   │   └── lib/              # Utilities and API client config
│   └── .env.example          # Frontend environment template
│
├── .gitignore                # Root gitignore for dependencies, builds, & caches
└── README.md                 # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js**: v18 or higher (v20+ recommended)
- **PostgreSQL**: Running instance

---

### 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env` and configure your database and email credentials:
   ```bash
   cp .env.example .env
   ```

4. Run the NestJS server:
   ```bash
   # Development mode with hot-reload
   npm run start:dev

   # Production build
   npm run build
   npm run start:prod
   ```
   *Backend runs on `http://localhost:3000` by default.*

---

### 2. Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. Run the Next.js development server:
   ```bash
   npm run dev
   ```
   *Frontend runs on `http://localhost:3000` (or Next.js available port, typically `3001` if backend is on `3000`).*

5. Build for Production:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔐 Key Features

- **Dashboard Analytics**: Real-time revenue metrics, booking graphs, customer counts, and reservation distributions.
- **Hotel Inventory Management**: Add, update, view, and delete hotels with room categories and pricing.
- **Customer CRM**: Member classification (Gold, Silver, Bronze), booking history, and spending profiles.
- **Booking & Reservations**: Detailed records with search, status tracking, and printable customer receipt invoices.
- **Notification Center**: Real-time notifications for pending bookings with instant Accept/Reject actions.
- **Admin Profile & Security**: Profile editing, profile image uploads, OTP-based password reset.
- **Dark / Light Theme**: Full theme support across all dashboard screens.

---

## 🛡️ License

This project is licensed under the MIT License.
