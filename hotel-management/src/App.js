import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import RoomSelection from "./Pages/RoomSelection";
import Account from "./Pages/Account"; // <-- import Account page
import Loyalty from "./Pages/Loyalty";

function App() {
  const location = useLocation();

  // Hide header on booking page, room selection page, or account page
  const hideHeader =
    location.pathname === "/checking-in-out" ||
    location.pathname === "/room-selection" ||
    location.pathname.startsWith("/account/");

  return (
    <>
      {!hideHeader && <Header />}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          style={{ position: "relative" }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />

            {/* Redirect /home → / */}
            <Route path="/home" element={<Navigate to="/" replace />} />

                        {/* Room selection page */}
            <Route path="/room-selection" element={<RoomSelection />} />

            {/* Loyalty page */}
            <Route path="/loyalty-benefits" element={<Loyalty />} />

            {/* Dynamic account page */}
            <Route path="/account/:bookingId" element={<Account />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default App;
