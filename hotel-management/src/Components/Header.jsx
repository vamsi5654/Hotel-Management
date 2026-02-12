import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/UrbanHotel.webp";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false); // dropdown toggle

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("1 Guest");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const handleNextClick = (e)=> {
    e.preventDefault(); // ✅ prevent page reload
    if (!checkin || !checkout || guests < 1) {
      alert("Please fill all fields correctly.");
      return;
    }

    setLoading(true);

    // Navigate with query params
    navigate(
      `/room-selection?checkin=${checkin}&checkout=${checkout}&guests=${guests}`
    );
  };





  const isBookingPage = location.pathname === "/checking-in-out";
  

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Amenities", path: "/amenities" },
    { name: "Loyalty", path: "/loyalty-benefits" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    if (!isBookingPage) return;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setShowHeader(currentScroll < lastScroll || currentScroll < 50);
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBookingPage, lastScroll]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    navigate("/select-room", { state: { checkin, checkout, guests } });
  };

  return (
    <header
      className={`modern-header ${isBookingPage ? "booking-header" : ""}`}
      style={{ top: showHeader ? "0" : "-100px" }}
    >
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Urban Hotel" />
          </Link>
        </div>

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

<div className="header-cta">
  <button
    className="modern-btn"
    onClick={() => setBookingOpen(!bookingOpen)}
  >
    Book Your Stay
  </button>

  {bookingOpen && (
    <div className="booking-dropdown">
      <form className="booking-form" onSubmit={handleNextClick}>
        <div className="form-group">
          <label>Check-In</label>
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Check-Out</label>
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Next..." : "Select Room"}
        </button>
      </form>
    </div>
  )}
</div>


        <div
          className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>
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
