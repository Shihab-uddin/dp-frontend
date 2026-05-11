# Obliq Frontend Dashboard

The frontend interface for the Obliq Dynamic Permissions Platform. Built to dynamically render modules, navigation sidebars, and tools based entirely on the authenticated user's granular permission atoms, rather than standard roles.

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Custom Theme & Glassmorphism)
- **State Management**: Zustand
- **HTTP Client**: Axios (with automatic token-refresh interceptors)
- **Icons**: Lucide React

---

## 🛠️ Installation Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- The **Backend API** must be running locally on port 5000 (`http://localhost:5000`) for the frontend to authenticate and fetch permissions correctly.

### Setup Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
   *You should automatically be redirected to the `/login` page.*

---

Use the following credentials to log in:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@obliq.com` | `Password123!` | Has access to *all* permission atoms in the system. |
| **Manager** | `manager@obliq.com` | `Password123!` | Has a subset of atoms. Cannot grant atoms they lack. |
| **Agent** | `agent@obliq.com` | `Password123!` | Highly restricted. Limited module access. |

---

