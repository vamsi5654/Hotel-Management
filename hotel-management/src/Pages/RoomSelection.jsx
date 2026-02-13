import "./RoomSelection.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RoomSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get data from Header state
  const { checkin, checkout, rooms } = location.state || { rooms: [] };

  // Calculate total guests
  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);
  const totalGuests = totalAdults + totalChildren;

  const [roomType, setRoomType] = useState("Deluxe Room");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idProof, setIdProof] = useState(null);

  const handleConfirmRoom = () => {
    if (!fullName || !email || !phone || !idProof) {
      alert("Please fill in all required details and upload ID proof.");
      return;
    }

    // Mock booking ID
    const bookingId = "BK" + Math.floor(Math.random() * 100000);

    // Navigate to account page with state
    navigate(`/account/${bookingId}`, {
      state: { roomType, checkin, checkout, rooms, fullName },
    });
  };

  return (
    <div className="room-page">
      <div className="overlay"></div>

      <div className="room-wrapper">
        <div className="booking-summary glass">
          <h2>Your Stay</h2>
          <p>
            <strong>Check-In:</strong> {checkin || "N/A"}
          </p>
          <p>
            <strong>Check-Out:</strong> {checkout || "N/A"}
          </p>
          <p>
            <strong>Guests:</strong> {totalGuests} (
            {totalAdults} Adults, {totalChildren} Children)
          </p>
          <p>
            <strong>Rooms:</strong> {rooms.length}
          </p>
        </div>

        <div className="room-card glass">
          <h1>Select Your Room</h1>

          <label>Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="Standard Room">Standard Room – ₹4,999</option>
            <option value="Deluxe Room">Deluxe Room – ₹7,999</option>
            <option value="Suite">Luxury Suite – ₹14,999</option>
          </select>

          <div className="guest-section">
            <h3>Guest Details</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setIdProof(e.target.files[0])}
              aria-label="Upload ID Proof"
            />
          </div>

          <button className="confirm-btn" onClick={handleConfirmRoom}>
            Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomSelection;
