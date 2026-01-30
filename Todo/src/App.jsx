import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login.jsx";
import Signup from './pages/Signup.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import AddTodo from "./pages/AddTodo.jsx";
import EditTodo from "./pages/EditTodo.jsx";

function App() {
  const[dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
  }

    const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div
      style={{
        backgroundColor: dark ? "#0f172a" : "#ffffff",
        color: dark ? "#e5e7eb" : "#000000",
        minHeight: "100vh",
        transition: "0.3s"
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard toggleTheme={toggleTheme} dark={dark} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddTodo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditTodo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App