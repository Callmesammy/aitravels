# ✈️ aiTravels

**aiTravels** is a modern travel planning web app built with **Next.js**, **Supabase**, **Tailwind CSS**, and **TypeScript**. It helps users plan and manage their trips efficiently with the support of smart interfaces and powerful backend integration.

## 🚀 Features

- 🌍 AI-assisted travel planning interface
- 🔐 User authentication via Supabase
- 📦 Persistent storage using PostgreSQL
- 🎨 Clean, responsive UI with Tailwind CSS
- ⚡ Fast performance with Next.js and API routes
- 🧠 Built-in logic for itinerary or travel suggestions (future upgrade)

## 🧑‍💻 Tech Stack

| Tech        | Description                                |
|-------------|--------------------------------------------|
| Next.js     | React framework for SSR and routing        |
| Supabase    | Backend-as-a-Service (Auth, DB, API)       |
| Tailwind CSS| Utility-first CSS framework                |
| TypeScript  | Typed JavaScript for safer coding          |
| PostgreSQL  | Relational database via Supabase           |

## 📁 Folder Structure

```bash
.
├── components/       # Reusable UI components
├── pages/            # App routes
│   ├── api/          # API endpoints (e.g. auth, planner)
│   └── index.tsx     # Landing or main page
├── styles/           # Global styles and Tailwind setup
├── utils/            # Helper functions and hooks
└── supabase/         # Supabase client setup
