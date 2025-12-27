// src/layouts/MainLayout.js
import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
// import Footer from "../components/Footer.jsx"; // Assuming you have a Footer component
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
