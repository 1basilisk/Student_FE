import Signup from "./components/signup"
import Login from "./components/login"
import StudentDashboard from "./components/studentDash"
import AdminDashboard from "./components/adminDash"
import ProtectedRoute from "./ProtectedRoute"
import ChangePassword from "./components/changePassword"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
     <div className="dark bg-gray-900 text-white min-h-screen">
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/change-password" element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        } />


        {/* Catch-all route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
