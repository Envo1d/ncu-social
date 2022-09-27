import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/auth/forms/LoginForm";
import RegisterForm from "./components/auth/forms/RegisterForm";
import HomePage from "./components/home/HomePage";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<>PAGE NOT FOUND</>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
