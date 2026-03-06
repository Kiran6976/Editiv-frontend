import { useState } from "react";
import axios from "axios";
import "../styles/bookingModal.css";
import API from "../config/api";

export default function BookingModal({ open, onClose }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    datetime: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await axios.post(`${API}/booking`, form);

      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);

      setForm({
        name: "",
        email: "",
        phone: "",
        datetime: "",
        message: ""
      });

    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={e => e.stopPropagation()}>

        {!success ? (
          <>
            <h2>Book Your Free Call</h2>

            <form className="booking-form" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <input
                type="datetime-local"
                name="datetime"
                value={form.datetime}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Type your message..."
                value={form.message}
                onChange={handleChange}
              />

              {error && <p className="error-text">{error}</p>}

              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Booking →"}
              </button>

            </form>
          </>
        ) : (
          <div className="success-box">
            ✅ Booking Submitted!
            <p>We’ll contact you shortly.</p>
          </div>
        )}

        <span className="close-btn" onClick={onClose}>✕</span>

      </div>
    </div>
  );
}
