import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function Home() {
  return <h1 style={{ padding: "50px" }}>Welcome to Urbann Hotels</h1>;
}

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
