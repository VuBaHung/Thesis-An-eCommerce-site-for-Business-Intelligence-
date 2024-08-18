import React from "react";

import Footer from "../../components/Layout/Footer.js";
import Header from "../../components/Layout/Header.js";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps.js";
import Payment from "../../components/Payment/Payment.js";
const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;
