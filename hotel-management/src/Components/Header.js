import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/UrbanHotel.webp"; // Update your path here

function Header() {
  // Simulated booking state
  const [hasBooked, setHasBooked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav items
  const defaultNavItems = [
    { name: "Home", path: "/home" },
    { name: "Checking-In/Out", path: "/checking-in-out" },
    { name: "Amenities", path: "/amenities" },
    { name: "Room Service", path: "/room-service" },
    { name: "Food & Beverages", path: "/food-beverages" },
    { name: "Shop", path: "/shop" },
    { name: "Orders", path: "/orders" },
    { name: "Loyalty", path: "/loyalty-benefits" },
    { name: "Contact", path: "/contact" },
  ];

  const preBookingNavItems = [
    { name: "Home", path: "/home" },
    { name: "Contact", path: "/contact" },
  ];

  const navItems = hasBooked ? defaultNavItems : preBookingNavItems;

  return (
    <header className="premium-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Urban Hotel" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav">
          <ul className="nav-menu">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={item.path} className="nav-link">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="header-cta">
          {!hasBooked ? (
            <button
              className="book-btn"
              onClick={() => setHasBooked(true)}
            >
              Book Your Stay
            </button>
          ) : (
            <span className="welcome-text">Welcome Back!</span>
          )}
        </div>

        {/* Hamburger */}
        <div
          className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
