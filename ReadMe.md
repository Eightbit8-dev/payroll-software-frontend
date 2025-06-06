# 🧾 Payroll ERP System

A scalable and modular enterprise-grade Payroll Management System designed for managing employees, attendance, leaves, holidays, salaries, and shift logs. Built with a modern stack, this platform supports dynamic user roles and a flexible plugin-style architecture for extensibility.

## ⚙️ Features

- 🧑‍💼 **Role-based Access**: Super Admin, HR, and Employee roles with scoped permissions.
- 🧾 **Payroll Automation**: Configurable salary, tax, and deduction logic.
- ⏱️ **Time Tracking**: Clock-in/out with shift handling and holiday exceptions.
- 📆 **Leave Management**: Applied, approved, and tracked by role.
- 🎉 **Holiday Calendar**: Admin-controlled list synced with working hours.
- 📊 **Analytics & Reports**: Downloadable summaries for payroll, leaves, and attendance.
- 🧩 **Modular Architecture**: Loosely coupled components with pluggable modules.

## 🧱 Tech Stack

| Layer            | Technology                                         |
| ---------------- | -------------------------------------------------- |
| Frontend         | React 19 + Tailwind CSS + TypeScript               |
| Backend          | Node.js / Express or Spring Boot (based on module) |
| State Management | Zustand / Redux Toolkit                            |
| Database         | PostgreSQL / MongoDB (configurable)                |
| Auth & RBAC      | JWT / OAuth + Role Guards                          |
| Deployment       | Vercel / Docker + EC2                              |

## 📐 System Design

> Modular folder structure, abstracted service layers, and isolated business logic

```
src/
├── components/       # Shared UI components
├── modules/          # Feature-based modules (Payroll, Leave, Holidays, etc.)
│   └── payroll/
│       ├── api/
│       ├── pages/
│       ├── hooks/
│       └── utils/
├── store/            # Zustand/Redux slices
├── styles/           # Tailwind + CSS variables
└── types/            # Global TypeScript interfaces
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/payroll-erp.git
cd payroll-erp
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Environment Variables

Create a `.env` file with the following:

```env
DATABASE_URL=postgres://username:password@localhost:5432/payroll_db
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run Locally

```bash
pnpm dev
```

### 5. Build

```bash
pnpm build && pnpm start
```

## 🛡 Roles & Access Control

| Role        | Access Level                         |
| ----------- | ------------------------------------ |
| Super Admin | Full access to all modules           |
| HR          | Manage employees, leaves, payroll    |
| Employee    | View payslip, apply leaves, log time |

## 🗃 Planned Modules

- ✅ Payroll Core
- ✅ Leave & Holiday System
- ✅ Time & Attendance
- 🔲 Loan/Advance Request Module
- 🔲 Performance Review Module
- 🔲 Role Customizer

## 🧠 Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 📄 License

MIT © 2025 8BIT

---
