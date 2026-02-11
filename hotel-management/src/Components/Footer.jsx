import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="premium-footer">
      <div className="footer-container">

        {/* OUR PRESENCE */}
        <div className="footer-col presence-col">
          <h4>OUR PRESENCE +</h4>
          <div className="presence-links">
            <ul>
              <li><Link to="/awards">Awards</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
            <ul>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/day-use">Day Use</Link></li>
              <li><Link to="/cookies-policy">Cookies Policy</Link></li>
              <li><Link to="/non-affiliation">Non Affiliation</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
            <ul>
              <li><Link to="/media">Media</Link></li>
              <li><Link to="/site-map">Site Map</Link></li>
              <li><Link to="/travel-guidelines">Travel Guidelines</Link></li>
              <li><Link to="/investor-relations">Investor relations</Link></li>
            </ul>
            <ul>
              <li><Link to="/loyalty-program">Loyalty Program</Link></li>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-col newsletter-col">
          <h4>JOIN OUR NEWSLETTER</h4>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
          >
            <input
              type="email"
              placeholder="Enter Your Email"
              required
              aria-label="Email address"
            />
            <button type="submit">Submit</button>
            <div className="privacy-checkbox">
              <input type="checkbox" id="privacy" required />
              <label htmlFor="privacy">
                I agree to the <Link to="/privacy">privacy policy.</Link>
              </label>
            </div>
          </form>
        </div>

        {/* GET IN TOUCH */}
        <div className="footer-col contact-col">
          <h4>GET IN TOUCH</h4>
          <div className="social-icons">
            <button
              className="social-btn fb"
              aria-label="Facebook"
              onClick={() => window.open("https://facebook.com", "_blank", "noopener,noreferrer")}
            >
              <FaFacebookF />
            </button>
            <button
              className="social-btn ig"
              aria-label="Instagram"
              onClick={() => window.open("https://instagram.com", "_blank", "noopener,noreferrer")}
            >
              <FaInstagram />
            </button>
            <button
              className="social-btn tw"
              aria-label="Twitter"
              onClick={() => window.open("https://twitter.com", "_blank", "noopener,noreferrer")}
            >
              <FaTwitter />
            </button>
            <button
              className="social-btn yt"
              aria-label="YouTube"
              onClick={() => window.open("https://youtube.com", "_blank", "noopener,noreferrer")}
            >
              <FaYoutube />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom">
        ©2025 BY LEMON TREE HOTELS LTD. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default Footer;
