import { StrictMode } from 'react'
import React from 'react'
import { ToastContainer } from "react-toastify";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>,
)
