import axios from "axios";
import { server } from "../.././server";
import { toast } from "react-toastify";
// create product
export const createProduct = (name) => async (dispatch) => {
  try {
    dispatch({
      type: "ProductCreateRequest",
    });
    const { data } = await axios.post(`${server}/product/create-product`, name);
    dispatch({
      type: "ProductCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "ProductCreateFail",
      payload: error.response,
    });
  }
};
// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/product/get-all-products/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error,
    });
  }
};

//Delelete Products of a shop
export const deleteProductShop = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductShopRequest",
    });
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    dispatch({
      type: "deleteProductShopSuccess",
      payload: data.msg,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductShopFailed",
      payload: error,
    });
  }
};
// get all products
export const getAllProducts = (limit) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products?limit=${limit}`
    );
    // console.log({ data });
    dispatch({
      type: "getAllProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
