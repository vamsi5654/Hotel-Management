import "./RoomSelection.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RoomSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get booking data passed from previous page (Header)
  const { checkin, checkout, rooms } = location.state || { rooms: [] };

  // ✅ Calculate total guests dynamically
  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);
  const totalGuests = totalAdults + totalChildren;

  // ✅ Room type selection state
  const [roomType, setRoomType] = useState("Deluxe Room");

  // ✅ Guest personal details state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // ✅ Store multiple uploaded ID proofs
  const [idProof, setIdProof] = useState([]);

  // ✅ Handle ID file upload (APPENDS instead of replacing)
  const handleIdUpload = (e) => {
    const newFiles = Array.from(e.target.files);

    // Append new files to previous uploaded files
    setIdProof((prevFiles) => [...prevFiles, ...newFiles]);

    // Reset input value so same file can be uploaded again if needed
    e.target.value = null;
  };

  // ✅ Remove individual uploaded ID
  const handleRemoveFile = (indexToRemove) => {
    setIdProof((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // ✅ Confirm booking button handler
  const handleConfirmRoom = () => {
    // Validation check
    if (!fullName || !email || !phone) {
      alert("Please fill in all guest details.");
      return;
    }

    if (idProof.length < totalGuests) {
      alert(
        `Please upload ID proof for each of the ${totalGuests} guest(s).`
      );
      return;
    }

    
    // Navigate to Account page with booking details
    navigate(`/account/`, {
      state: { roomType, checkin, checkout, rooms, fullName },
    });
  };

  return (
    <div className="room-page">
      <div className="overlay"></div>

      <div className="room-wrapper">

        {/* ✅ BOOKING SUMMARY SECTION */}
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

        {/* ✅ ROOM SELECTION CARD */}
        <div className="room-card glass">
          <h1>Select Your Room</h1>

          {/* ✅ ROOM TYPE DROPDOWN */}
          <label>Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="Standard Room">Standard Room – ₹4,999</option>
            <option value="Deluxe Room">Deluxe Room – ₹7,999</option>
            <option value="Suite">Luxury Suite – ₹14,999</option>
          </select>

          {/* ✅ GUEST DETAILS SECTION */}
          <div className="guest-section">
            <h3>Guest Details</h3>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* ✅ ID Upload Section */}
            <label>Upload ID Proof (One by One Allowed)</label>
            <input
              type="file"
              multiple
              onChange={handleIdUpload}
              aria-label="Upload ID Proofs"
            />

            {/* ✅ Display Uploaded Files */}
            <div className="file-info">
              {idProof.length > 0 && (
                <ul>
                  {idProof.map((file, idx) => (
                    <li key={idx}>
                      {file.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        style={{ marginLeft: "10px", color: "red" }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ✅ CONFIRM BUTTON */}
          <button className="confirm-btn" onClick={handleConfirmRoom}>
            Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomSelection;
