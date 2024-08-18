import React from "react";
import Header from "../../components/Layout/Header.js";

import Footer from "../../components/Layout/Footer.js";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps.js";
import Checkout from "../../components/Checkout/Checkout.js";
const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
