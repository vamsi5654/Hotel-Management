import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Account.css";

// -------------------- SAMPLE DATA --------------------
// This is mock data for Room Service, Food, Runner Service, and Shop items
const sampleRoomService = [
  { id: 1, name: "Extra Towels", price: 5 },
  { id: 2, name: "Laundry Service", price: 10 },
];

const sampleFood = [
  { id: 1, name: "Burger", price: 8 },
  { id: 2, name: "Pizza", price: 12 },
  { id: 3, name: "Coffee", price: 4 },
];

const sampleRunnerService = [
  { id: 1, name: "Alcohol (Runner Service)", price: 20, extraCharge: 5 },
  { id: 2, name: "Cigarettes (Runner Service)", price: 15, extraCharge: 3 },
];

const sampleShop = [
  { id: 1, name: "Shampoo", price: 6 },
  { id: 2, name: "Sunscreen", price: 15 },
];

// -------------------- ACCOUNT COMPONENT --------------------
function Account() {
  const { bookingId } = useParams(); // Get bookingId from URL

  // -------------------- STATE --------------------
  const [activeTab, setActiveTab] = useState("Room Service"); // Default tab
  const [roomService, setRoomService] = useState([]);
  const [foodMenu, setFoodMenu] = useState([]);
  const [runnerService, setRunnerService] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [checkoutLoading, setCheckoutLoading] = useState(false); // During checkout
  const [runnerConfirmItem, setRunnerConfirmItem] = useState(null); // Runner service popup

  // -------------------- LOAD SAMPLE DATA --------------------
  useEffect(() => {
    setRoomService(sampleRoomService);
    setFoodMenu(sampleFood);
    setRunnerService(sampleRunnerService);
    setShopItems(sampleShop);
  }, []); // Run once on mount

  // -------------------- FETCH CART FROM BACKEND --------------------
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/cart/${bookingId}`);
        setCart(response.data || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setCart([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [bookingId]);

  // -------------------- SYNC CART TO BACKEND --------------------
  useEffect(() => {
    const saveCart = async () => {
      try {
        await axios.post(`/api/cart/${bookingId}`, cart);
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    };
    if (!loading) saveCart(); // Avoid saving while fetching
  }, [cart, bookingId, loading]);

  // -------------------- CART ACTIONS --------------------
  const addToCart = (item, type, isRunner = false) => {
    if (isRunner) {
      // Show popup for Runner Service confirmation
      setRunnerConfirmItem({ ...item, type });
    } else {
      setCart((prev) => {
        const matchIndex = prev.findIndex((c) => c.id === item.id && c.type === type);
        if (matchIndex > -1) {
          const next = [...prev];
          const existing = { ...next[matchIndex] };
          existing.quantity = (existing.quantity ?? 1) + 1;
          next[matchIndex] = existing;
          return next;
        }
        return [...prev, { ...item, type, finalPrice: item.price, quantity: 1 }];
      });
    }
  };

  const confirmRunnerService = () => {
    if (!runnerConfirmItem) return;
    const finalPrice = runnerConfirmItem.price + runnerConfirmItem.extraCharge;
    setCart((prev) => {
      const matchIndex = prev.findIndex((c) => c.id === runnerConfirmItem.id && c.type === runnerConfirmItem.type);
      if (matchIndex > -1) {
        const next = [...prev];
        const existing = { ...next[matchIndex] };
        existing.quantity = (existing.quantity ?? 1) + 1;
        next[matchIndex] = existing;
        return next;
      }
      return [...prev, { ...runnerConfirmItem, finalPrice, quantity: 1 }];
    });
    setRunnerConfirmItem(null);
  };

  const cancelRunnerService = () => {
    setRunnerConfirmItem(null);
  };

  // NOTE: explicit `removeFromCart` function removed.
  // Items are removed when their quantity reaches 0 via `changeQuantity`.
  // This keeps a single, consistent place for item removal logic.
  const changeQuantity = (index, delta) => {
    setCart((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const next = [...prev];
      const item = { ...next[index] };
      item.quantity = (item.quantity ?? 1) + delta;
      if (item.quantity <= 0) {
        next.splice(index, 1);
      } else {
        next[index] = item;
      }
      return next;
    });
  };

  const total = cart.reduce((acc, item) => {
    const unit = typeof item.finalPrice === "number" ? item.finalPrice : item.price || 0;
    const qty = item.quantity ?? 1;
    return acc + unit * qty;
  }, 0);

  const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

  // -------------------- CHECKOUT --------------------
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setCheckoutLoading(true);
    try {
      await axios.post(`/api/cart/${bookingId}/checkout`, { cart });

      alert("Checkout successful! Your order has been placed.");

      // Clear cart locally and on backend
      setCart([]);
      await axios.post(`/api/cart/${bookingId}`, []);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // -------------------- RENDER --------------------
  if (loading)
    return (
      <div className="account-page">
        <h1>Welcome to Urban Hotel</h1>
        <p className="loading">Loading cart...</p>
      </div>
    );

  return (
    <div className="account-page">
      <header className="account-header">
        <h1>Welcome to Urban Hotel</h1>
        <p className="sub">Booking: {bookingId || "—"}</p>
      </header>

      <div className="account-grid">
        <main className="content-area">
          <div className="tabs">
            {["Room Service", "Food & Beverages", "Shop"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <section className="tab-content">
            {activeTab === "Room Service" && (
              <div className="items-grid">
                {roomService.map((item) => (
                  <article className="item-card" key={item.id}>
                    <div>
                      <h4>{item.name}</h4>
                      <div className="meta">{fmt.format(item.price)}</div>
                    </div>
                    <button onClick={() => addToCart(item, "Room Service")}>Add</button>
                  </article>
                ))}
              </div>
            )}

            {activeTab === "Food & Beverages" && (
              <>
                <h3 className="section-title">Regular Food & Beverages</h3>
                <div className="items-grid">
                  {foodMenu.map((item) => (
                    <article className="item-card" key={item.id}>
                      <div>
                        <h4>{item.name}</h4>
                        <div className="meta">{fmt.format(item.price)}</div>
                      </div>
                      <button onClick={() => addToCart(item, "Food & Beverages")}>Add</button>
                    </article>
                  ))}
                </div>

                <h3 className="section-title">Runner Service (Extra Charges Apply)</h3>
                <div className="items-grid">
                  {runnerService.map((item) => (
                    <article className="item-card" key={item.id}>
                      <div>
                        <h4>{item.name}</h4>
                        <div className="meta">
                          {fmt.format(item.price)} + {fmt.format(item.extraCharge)} service fee
                        </div>
                      </div>
                      <button onClick={() => addToCart(item, "Runner Service", true)}>Add</button>
                    </article>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Shop" && (
              <div className="items-grid">
                {shopItems.map((item) => (
                  <article className="item-card" key={item.id}>
                    <div>
                      <h4>{item.name}</h4>
                      <div className="meta">{fmt.format(item.price)}</div>
                    </div>
                    <button onClick={() => addToCart(item, "Shop")}>Add</button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>

        <aside className="cart-sidebar">
  <div className="cart-header">
    <h2>Cart</h2>
    <span className="cart-count">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
  </div>

  {cart.length === 0 ? (
    <div className="cart-empty">
      <p>Your cart is empty.</p>
    </div>
  ) : (
    <ul className="cart-items">
      {cart.map((item, index) => (
        <li key={`${item.id}-${item.type}`} className="cart-item">
          <div className="item-info">
            <h4>{item.name}</h4>
            <span className="item-type">{item.type}</span>
            <span className="item-price">{fmt.format(item.finalPrice || item.price)}</span>
          </div>
          <div className="item-controls">
            <button onClick={() => changeQuantity(index, -1)} className="qty-btn">−</button>
            <span className="qty">{item.quantity ?? 1}</span>
            <button onClick={() => changeQuantity(index, 1)} className="qty-btn">+</button>
          </div>
        </li>
      ))}
    </ul>
  )}

  {cart.length > 0 && (
    <div className="cart-footer">
      <div className="subtotal">
        <span>Subtotal</span>
        <strong>{fmt.format(total)}</strong>
      </div>
      <button
        className="checkout-btn"
        onClick={handleCheckout}
        disabled={checkoutLoading}
      >
        {checkoutLoading ? "Placing order..." : "Place Order"}
      </button>
    </div>
  )}
</aside>

      </div>

      {/* RUNNER SERVICE CONFIRM POPUP */}
      {runnerConfirmItem && (
        <div className="runner-confirm-popup" role="dialog" aria-modal="true">
          <div className="popup-content">
            <h3>Confirm Runner Service</h3>
            <p>
              You are about to add <strong>{runnerConfirmItem.name}</strong> with an extra service fee of {fmt.format(runnerConfirmItem.extraCharge)}.
            </p>
            <div className="popup-buttons">
              <button onClick={confirmRunnerService}>Confirm</button>
              <button onClick={cancelRunnerService}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
