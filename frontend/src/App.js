import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  Homepage,
  BestSellingPage,
  EventPage,
  FaqPage,
  ProductPages,
  ProductDetailPage,
  ProfilePage,
  CheckoutPage,
  ShopCreatePage,
  ShopLoginPage,
  ShopHomePage,
  ShopDashBoardPage,
  ShopCreateProductPage,
  ShopAllProductPage,
  ShopEventPage,
  ShopCreateEventPage,
  ShopAllCouponPage,
  PaymentPage,
  ShopAllOrdersPage,
  ShopOrderDetailPage,
  TrackOrderPage,
  ShopRefundPage,
  EditShopPage,
  ShopWithdrawMoneyPage,
  ShopMessagesPage,
  InboxPage,
  AdminDashBoardPage,
  AdminTrackOrderPage,
} from "./Router";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ShopActivationPage from "./pages/ShopPages/ShopActivationpage";
import { useSelector } from "react-redux";
import NotFoundPage from "./pages/CustomerPages/NotFoundPage";
import { getAllEvents } from "./redux/actions/event";
import { loadToken } from "./redux/actions/token";
import { loadUserOrders } from "./redux/actions/order";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccessPage from "./pages/CustomerPages/OrderSuccessPage";
import OrderDetailPage from "./pages/CustomerPages/OrderDetailPage";
import AdminAllOrdersPage from "./pages/AdminPages/AdminAllOrdersPage";
import AllSellersPage from "./pages/AdminPages/AllSellersPage";
import AdminAllUserPage from "./pages/AdminPages/AdminAllUserPage";
import AdminAllProductsPage from "./pages/AdminPages/AdminAllProductsPage";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async () => {
    await axios
      .get(`${server}/payment/stripeapikey`)
      .then((res) => setStripeApiKey(res.data.stripeApiKey))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Store.dispatch(loadSeller());
    Store.dispatch(loadToken());
    // Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);
  const { isSeller, seller } = useSelector((state) => state.seller);
  const { token, userInfor, isAuthenticated } = useSelector(
    (state) => state.token
  );

  useEffect(() => {
    if (token && isAuthenticated === true) {
      Store.dispatch(loadUser(token));
      Store.dispatch(loadUserOrders(token));
    }
  }, [token]);
  const role = userInfor && userInfor.newUser.role;
  return (
    <BrowserRouter>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/payment"
              element={token ? <PaymentPage /> : <LoginPage />}
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route
          path="/admin/dashboard"
          element={
            role && role === "Admin" ? <AdminDashBoardPage /> : <Homepage />
          }
        ></Route>
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        ></Route>
        <Route
          path="/seller/activation/:activation_token"
          element={<ShopActivationPage />}
        ></Route>
        <Route path="/products" element={<ProductPages />}></Route>
        <Route path="/best-selling" element={<BestSellingPage />}></Route>
        <Route path="/events" element={<EventPage />}></Route>
        <Route path="/faq" element={<FaqPage />}></Route>
        <Route path="/products/:id" element={<ProductDetailPage />}></Route>
        <Route
          path="/checkout"
          element={token ? <CheckoutPage /> : <LoginPage />}
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="/user/order-detail/:id" element={<OrderDetailPage />} />

        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <LoginPage />}
        ></Route>
        <Route
          path="/user/track/order/:id"
          element={token ? <TrackOrderPage /> : <LoginPage />}
        ></Route>
        <Route
          path="/inbox"
          element={token ? <InboxPage /> : <LoginPage />}
        ></Route>
        {/* Shop Route */}
        <Route path="/shop-create" element={<ShopCreatePage />}></Route>
        <Route path="/shop-login" element={<ShopLoginPage />}></Route>
        <Route
          path="/shop/:id"
          element={isSeller ? <ShopHomePage /> : <ShopLoginPage />}
        ></Route>
        <Route
          path="/order/:id"
          element={isSeller ? <ShopOrderDetailPage /> : <ShopLoginPage />}
        ></Route>
        <Route
          path="/admin/order/:id"
          element={
            role && role === "Admin" ? <AdminTrackOrderPage /> : <LoginPage />
          }
        ></Route>
        <Route
          path="/admin/preview/:id"
          element={
            role && role === "Admin" ? <AdminTrackOrderPage /> : <LoginPage />
          }
        ></Route>
        <Route
          path="/admin/dashboard-products"
          element={
            role && role === "Admin" ? <AdminAllProductsPage /> : <LoginPage />
          }
        ></Route>
        <Route
          path="/admin/dashboard-users"
          element={
            role && role === "Admin" ? <AdminAllUserPage /> : <LoginPage />
          }
        ></Route>
        <Route
          path="/admin/dashboard-orders"
          element={
            role && role === "Admin" ? <AdminAllOrdersPage /> : <LoginPage />
          }
        ></Route>
        <Route
          path="/admin/dashboard-sellers"
          element={
            role && role === "Admin" ? <AllSellersPage /> : <LoginPage />
          }
        ></Route>
        <Route path="/shop/preview/:id" element={<ShopHomePage />}></Route>
        <Route
          path="/dashboard"
          element={isSeller ? <ShopDashBoardPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/setting"
          element={isSeller ? <EditShopPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard-orders"
          element={isSeller ? <ShopAllOrdersPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard-create-product"
          element={isSeller ? <ShopCreateProductPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard-products"
          element={isSeller ? <ShopAllProductPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard-events"
          element={isSeller ? <ShopEventPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard-create-event"
          element={isSeller ? <ShopCreateEventPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard-withdraw-money"
          element={isSeller ? <ShopWithdrawMoneyPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard/cuppouns"
          element={isSeller ? <ShopAllCouponPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard-refund"
          element={isSeller ? <ShopRefundPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard-messages"
          element={isSeller ? <ShopMessagesPage /> : <NotFoundPage />}
        ></Route>
        <Route
          path="/dashboard-messages/:id"
          element={isSeller ? <ShopMessagesPage /> : <NotFoundPage />}
        ></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
