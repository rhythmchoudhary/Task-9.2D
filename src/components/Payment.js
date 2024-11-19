import React from 'react';
import '../styles/PricingPlans.css'


const Payment = () => (
  <div className="payment-container">
    <h2>Quick Payment Link</h2>
    <a href="https://buy.stripe.com/test_3cs7sw9gg3xr6MocMM" target="_blank" rel="noopener noreferrer">
      <button className="pay-now-button">Pay Now</button>
    </a>
  </div>
);

export default Payment;