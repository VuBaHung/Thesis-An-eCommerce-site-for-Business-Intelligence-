import axios from "axios";
import { server } from "../../server";

export const loadUserOrders = (token) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserOrdersRequest",
    });

    const { data } = await axios.get(`${server}/payment/get-user-order`, {
      headers: { Authorization: token },
    });
    // console.log({ data }, "OrderLoad");
    dispatch({
      type: "LoadUserOrdersSuccess",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserOrdersFail",
      payload: error.response,
    });
  }
};
export const loadShopOrders = (token) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadAllShopOrdersRequest",
    });

    const { data } = await axios.get(`${server}/shop/get-shop-order`, {
      headers: { Authorization: token },
    });
    // console.log({ data }, "OrderLoad");
    dispatch({
      type: "LoadAllShopOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "LoadAllShopOrdersFail",
      payload: error.response,
    });
  }
};
export const loadAllOrderAdmin = (token) => async (dispatch) => {
  try {
    dispatch({
      type: "AdminLoadAllOrdersRequest",
    });

    const { data } = await axios.get(`${server}/admin/get-all-orders`, {
      headers: { Authorization: token },
    });
    // console.log({ data }, "AdminLoad");
    dispatch({
      type: "AdminLoadAllOrdersSuccess",
      payload: data.adminOrders,
    });
  } catch (error) {
    dispatch({
      type: "AdminLoadAllOrdersFail",
      payload: error.response,
    });
  }
};
