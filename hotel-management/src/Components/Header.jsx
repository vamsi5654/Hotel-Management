import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/UrbanHotel.webp";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  // Get today's date in YYYY-MM-DD format
const today = new Date();
const formatDate = (date) => date.toISOString().split("T")[0];

const minCheckin = formatDate(today);
const minCheckout = checkin ? checkin : formatDate(today);

  const [loading, setLoading] = useState(false);

  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isBookingPage = location.pathname === "/checking-in-out";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Amenities", path: "/amenities" },
    { name: "Loyalty", path: "/loyalty-benefits" },
    { name: "Contact", path: "/contact" },
  ];

  // Header hide on scroll
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

  // Update adults/children count
  const updateGuest = (roomIndex, type, operation) => {
    const updatedRooms = [...rooms];
    if (operation === "inc") {
      if (updatedRooms[roomIndex][type] < 4) updatedRooms[roomIndex][type] += 1;
    } else {
      if (type === "adults" && updatedRooms[roomIndex][type] > 1) updatedRooms[roomIndex][type] -= 1;
      if (type === "children" && updatedRooms[roomIndex][type] > 0) updatedRooms[roomIndex][type] -= 1;
    }
    setRooms(updatedRooms);
  };

  // Add a new room
  const addRoom = () => setRooms([...rooms, { adults: 1, children: 0 }]);

  // Delete a room
  const deleteRoom = (index) => {
    if (rooms.length === 1) return; // Always keep at least one room
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  // Total guests
  const totalGuests = rooms.reduce((sum, r) => sum + r.adults + r.children, 0);

  // Submit booking
  const handleNextClick = (e) => {
    e.preventDefault();
    if (!checkin || !checkout || totalGuests < 1) {
      alert("Please fill all fields correctly.");
      return;
    }
    setLoading(true);
    navigate("/room-selection", { state: { checkin, checkout, rooms } });
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
                <Link to={item.path} className="nav-link">{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-cta">
          <button className="modern-btn" onClick={() => setBookingOpen(!bookingOpen)}>
            Book Your Stay
          </button>

          {bookingOpen && (
            <div className="booking-dropdown">
              <form className="booking-form" onSubmit={handleNextClick}>
                {/* Dates */}
                {/* Check-In */}
<div className="form-group">
  <label>Check-In</label>
  <input
    type="date"
    value={checkin}
    onChange={(e) => setCheckin(e.target.value)}
    min={minCheckin}      // ✅ Prevent past check-in
    required
  />
</div>

{/* Check-Out */}
<div className="form-group">
  <label>Check-Out</label>
  <input
    type="date"
    value={checkout}
    onChange={(e) => setCheckout(e.target.value)}
    min={minCheckout}     // ✅ Cannot be before check-in
    required
  />
</div>


                {/* Guests & Rooms */}
                {checkin && checkout && (
                  <div className="form-group">
                    <label>Guests & Rooms</label>
                    <div className="guest-selector" onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}>
                      {totalGuests} Guests, {rooms.length} Room{rooms.length > 1 ? "s" : ""}
                    </div>

                    {guestDropdownOpen && (
                      <div className="guest-dropdown">
                        {rooms.map((room, index) => (
                          <div key={index} className="room-block">
                            <h4>
                              Room {index + 1} 
                              {rooms.length > 1 && (
                                <button type="button" onClick={() => deleteRoom(index)} style={{ float: "right", color: "red", border: "none", background: "none", cursor: "pointer" }}>
                                  ✕
                                </button>
                              )}
                            </h4>

                            <div className="guest-row">
                              <span>Adults</span>
                              <div className="counter">
                                <button type="button" onClick={() => updateGuest(index, "adults", "dec")}>-</button>
                                <span>{room.adults}</span>
                                <button type="button" onClick={() => updateGuest(index, "adults", "inc")}>+</button>
                              </div>
                            </div>

                            <div className="guest-row">
                              <span>Children</span>
                              <div className="counter">
                                <button type="button" onClick={() => updateGuest(index, "children", "dec")}>-</button>
                                <span>{room.children}</span>
                                <button type="button" onClick={() => updateGuest(index, "children", "inc")}>+</button>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="guest-actions">
                          <button type="button" onClick={addRoom}>Add Room</button>
                          <button type="button" onClick={() => setGuestDropdownOpen(false)}>Apply</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button type="submit" disabled={loading}>{loading ? "Next..." : "Select Room"}</button>
              </form>
            </div>
          )}
        </div>

        <div className={`hamburger ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
