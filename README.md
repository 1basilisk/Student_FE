# Student Management System (Frontend)

A modern web application for managing students and admins, built with **React**, **Vite**, **Tailwind CSS**, and **Axios**.  
This frontend connects to a backend API (see `.env` for the API URL) and supports authentication, role-based dashboards, and CRUD operations for students.


## Link: [Hosted at Vercel](https://student-fe-three.vercel.app/)
---

## Features

- **Authentication**: Signup and login for students and admins.
- **Role-based Dashboards**:
  - **Admin**: View, add, edit, and delete students.
  - **Student**: View and edit personal info.
- **Password Management**: Change password functionality.
- **Protected Routes**: Only authenticated users can access dashboards.
- **Responsive UI**: Styled with Tailwind CSS and supports dark mode.

---

## Project Structure

```
frontend/
├── .env
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
└── src/
    ├── api.js
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── ProtectedRoute.jsx
    ├── assets/
    └── components/
        ├── adminDash.jsx
        ├── changePassword.jsx
        ├── header.jsx
        ├── login.jsx
        ├── signup.jsx
        └── studentDash.jsx
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Getting Started to run it locally

### 1. **Clone the repository**

```sh
git clone https://github.com/1basilisk/Student_FE
cd frontend
```

### 2. **Install dependencies**

```sh
npm install
```

### 3. **Configure Environment Variables**

Create a `.env` file in the root of the `frontend` directory:
(backend is hosted at https://student-be-0yca.onrender.com/api, you can also use your local backend server)

```
VITE_BACKEND_API_BASE_URL=https://student-be-0yca.onrender.com/api 
# Or use your local backend:
# VITE_BACKEND_API_BASE_URL=http://localhost:5000/api
```

### 4. **Run the development server**

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Build for Production

```sh
npm run build
```

The production-ready files will be in the `dist/` directory.

To preview the production build locally:

```sh
npm run preview
```

---

## Linting

```sh
npm run lint
```

---

## Tech Stack

- **React** (with hooks and functional components)
- **Vite** (for fast development and builds)
- **Tailwind CSS** (utility-first styling)
- **Axios** (HTTP client)
- **React Router DOM** (routing)
- **jwt-decode** (JWT parsing)
- **ESLint** (linting)

---

## File/Folder Overview

- **src/api.js**: Axios instance configured with the backend API URL.
- **src/App.jsx**: Main app component with routing.
- **src/ProtectedRoute.jsx**: Protects routes based on authentication and role.
- **src/components/**: All UI components (dashboards, forms, header, etc).
- **src/index.css**: Tailwind CSS directives.
- **tailwind.config.js**: Tailwind configuration.
- **postcss.config.js**: PostCSS plugins for Tailwind and autoprefixer.
- **vite.config.js**: Vite configuration.

---

## Usage

- **Signup** as a student or login as an admin/student.
- **Admins** can manage all students (CRUD).
- **Students** can view and edit their own information.
- **Change password** from the dashboard.
- **Logout** securely.

---

## Troubleshooting

- **Blank White Screen**:  
  - Check the browser console for errors.
  - Ensure `.env` is correctly set and the backend API is running/accessible.
  - Restart the dev server after changing `.env`.

- **Tailwind Not Working**:  
  - Ensure `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;` are present in `src/index.css`.
  - Make sure `tailwindcss` and `postcss` are installed.

- **API Errors**:  
  - Confirm the backend API URL in `.env` is correct.
  - Check CORS settings on the backend.
  - make sure to add /api at the end of baseurl for backend

---

## Customization

- **Change Theme**: Edit `tailwind.config.js` for custom colors or themes.
- **Add Features**: Add new components to `src/components/` and update routing in `src/App.jsx`.

---

