import React, { useState } from "react";
import "./Loyalty.css";

/* =====================================================
   LOYALTY PAGE WITH SIGN IN / JOIN / DASHBOARD
   ===================================================== */

function Loyalty() {
  const [view, setView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* ===========================
     SIGN IN HANDLER
  ============================ */
  const handleSignIn = (e) => {
    e.preventDefault();

    // Normally validate from backend here
    setIsLoggedIn(true);
    setView("dashboard");
  };

  /* ===========================
     JOIN HANDLER
  ============================ */
  const handleJoin = (e) => {
    e.preventDefault();

    // Normally save to backend here
    setIsLoggedIn(true);
    setView("dashboard");
  };

  /* ===========================
     LOGOUT HANDLER
  ============================ */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setView("home");
  };

  return (
    <div className="loyalty-page">

      {/* ===============================
          HOME VIEW
      ================================ */}
      {view === "home" && (
        <div className="loyalty-hero">
          <h1>Infinity Rewards</h1>
          <p className="subtitle">
            Experience luxury beyond stays.
          </p>

          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => setView("signin")}
            >
              Sign In
            </button>

            <button 
              className="btn btn-outline"
              onClick={() => setView("join")}
            >
              Join For Free
            </button>
          </div>
        </div>
      )}

      {/* ===============================
          SIGN IN FORM
      ================================ */}
      {view === "signin" && (
        <div className="auth-container">
          <h2>Member Sign In</h2>

          <form onSubmit={handleSignIn} className="auth-form">
            <label>
              Email
              <input type="email" required />
            </label>

            <label>
              Password
              <input type="password" required />
            </label>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>

            <p className="switch-text">
              Not a member?{" "}
              <span onClick={() => setView("join")}>
                Join Now
              </span>
            </p>
          </form>
        </div>
      )}

      {/* ===============================
          JOIN FORM
      ================================ */}
      {view === "join" && (
        <div className="auth-container">
          <h2>Join Infinity Rewards</h2>

          <form onSubmit={handleJoin} className="auth-form">

            <label>
              Full Name
              <input type="text" required />
            </label>

            <label>
              Phone Number
              <input type="tel" required />
            </label>

            <label>
              Email
              <input type="email" required />
            </label>

            <label>
              Date of Birth
              <input type="date" required />
            </label>

            <label className="checkbox-label">
              <input type="checkbox" required />
              I agree to the Privacy Policy and Infinity Rewards Terms.
            </label>

            <button type="submit" className="btn btn-primary">
              Join Now
            </button>

            <p className="switch-text">
              Already a member?{" "}
              <span onClick={() => setView("signin")}>
                Sign In
              </span>
            </p>
          </form>
        </div>
      )}

      {/* ===============================
          DASHBOARD (LOYALTY PAGE AFTER LOGIN)
      ================================ */}
      {view === "dashboard" && isLoggedIn && (
        <div className="dashboard">
          <h2>Welcome to Infinity Rewards</h2>
          <p>Your loyalty benefits are now active.</p>

          <div className="benefits-box">
            <p>✔ Free WiFi</p>
            <p>✔ Priority Check-in</p>
            <p>✔ Bonus Points</p>
            <p>✔ Room Upgrade Eligibility</p>
          </div>

          <button 
            className="btn btn-outline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

    </div>
  );
}

export default Loyalty;
