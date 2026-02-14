import React, { useState, useEffect, useRef } from "react";
import "./Loyalty.css";

// ...existing code...
const Loyalty = () => {
  // State: loyalty data (tier, stays, points)
  const [loyaltyData, setLoyaltyData] = useState({
    tier: "Gold",
    totalStays: 18,
    nextTierAt: 30,
    points: 12400
  });

  // UI state: whether to show upgrade modal and sign-in modal
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // Effect: example timer to trigger re-render/update (placeholder)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoyaltyData(prev => ({ ...prev }));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Computed values: progress toward next tier (0-100)
  const progress = Math.max(
    0,
    Math.min(100, (loyaltyData.totalStays / loyaltyData.nextTierAt) * 100)
  );

  // Static data: benefit rows for the benefits table
  const benefitRows = [
    { name: "Free WiFi", silver: "✓", gold: "✓", platinum: "✓", plus: "✓" },
    { name: "Member Exclusive Rates", silver: "✓", gold: "✓", platinum: "✓", plus: "✓" },
    { name: "Bonus Points", silver: "10%", gold: "20%", platinum: "30%", plus: "40%" },
    { name: "Priority Check-in", silver: "—", gold: "✓", platinum: "✓", plus: "✓" },
    { name: "Room Upgrade", silver: "—", gold: "✓", platinum: "✓", plus: "✓" },
    { name: "Late Checkout", silver: "—", gold: "✓", platinum: "✓", plus: "✓" },
    { name: "Free Breakfast", silver: "—", gold: "—", platinum: "✓", plus: "✓" },
    { name: "Suite Upgrade", silver: "—", gold: "—", platinum: "✓", plus: "✓" },
    { name: "Lounge Access", silver: "—", gold: "—", platinum: "—", plus: "✓" }
  ];

  // Handlers: join and sign-in button actions
  const handleJoin = () => {
    // open sign-in modal to encourage sign-in / create account flow
    setShowSignIn(true);
  };

  const handleSignIn = () => {
    setShowSignIn(true);
  };

  // Render: main component layout (single parent container)
  return (
    <div className="loyalty-container">
      {/* Header: points display */}
      <div className="loyalty-header">
        <h2>{loyaltyData.points.toLocaleString()}</h2>
        <p>Available Points</p>
      </div>

      {/* Progress bar: visual progress toward next tier */}
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }}></div>
      </div>

      {/* Benefits section: table of tier benefits */}
      <div className="benefits-section">
        <h3>Your Benefits</h3>
        <div className="benefits-table">
          <table>
            <thead>
              <tr>
                <th>Benefit</th>
                <th>Silver</th>
                <th>Gold</th>
                <th>Platinum</th>
                <th>Platinum Plus</th>
              </tr>
            </thead>
            <tbody>
              {benefitRows.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td className="center">{r.silver}</td>
                  <td className="center">{r.gold}</td>
                  <td className="center">{r.platinum}</td>
                  <td className="center">{r.plus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call-to-action: join or sign in */}
      <div className="join-cta">
        <h3>Not a member yet? Join today.</h3>
        <p>
          Exclusive rates, tier benefits, free room nights, and much more... Sign
          up today for free.
        </p>
        <div className="cta-buttons">
          <button className="cta-btn join-btn" onClick={handleJoin}>
            Join
          </button>
          <button className="cta-btn signin-btn" onClick={handleSignIn}>
            Sign in
          </button>
        </div>
      </div>

      {/* Redeem action */}
      <button className="redeem-btn">Redeem Points</button>

      {/* Upgrade modal: shown when showUpgrade is true */}
      {showUpgrade && (
        <div className="upgrade-modal">
          <div className="upgrade-content">
            <h2>Congratulations!</h2>
            <p>You've been upgraded to {loyaltyData.tier} Tier</p>
            <button onClick={() => setShowUpgrade(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Sign-in modal component included inline for this page */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToRegister={() => {
          // close modal and optionally scroll to a register section (if exists)
          setShowSignIn(false);
          const reg = document.getElementById("registerForm");
          if (reg) reg.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      />
    </div>
  );
};

// Inline SignInModal component (keeps JSX in same file; styles appended to Loyalty.css)
function SignInModal({ isOpen, onClose, onSwitchToRegister }) {
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      previouslyFocused.current = document.activeElement;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
      // focus first input when opened
      setTimeout(() => firstInputRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  function onOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="sr-modal-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      onClick={onOverlayClick}
    >
      <div className="sr-modal" role="document">
        <div className="sr-modal-header">
          <h3>Sign in to Infinity Rewards</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="sr-modal-body">
          <form
            className="sr-signin-form"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: perform auth request; demo closes modal after fake success
              setTimeout(() => {
                onClose();
                // optionally show upgrade or success feedback
              }, 700);
            }}
          >
            <label className="sr-field">
              <span className="sr-label">Email</span>
              <input
                ref={firstInputRef}
                type="email"
                name="email"
                required
                autoComplete="email"
              />
            </label>

            <label className="sr-field">
              <span className="sr-label">Password</span>
              <input type="password" name="password" required autoComplete="current-password" />
            </label>

            <div className="sr-actions">
              <button type="submit" className="sr-btn sr-btn-primary">Sign In</button>
              <button
                type="button"
                className="sr-btn sr-btn-ghost"
                onClick={() => {
                  onClose();
                  onSwitchToRegister?.();
                }}
              >
                Create account
              </button>
            </div>
          </form>
        </div>

        <div className="sr-modal-footer">
          <small>Already a member? Use the form above to sign in.</small>
        </div>
      </div>
    </div>
  );
}

export default Loyalty;