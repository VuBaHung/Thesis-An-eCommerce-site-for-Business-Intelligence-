import axios from "axios";
import { server } from "../.././server";
import { toast } from "react-toastify";
// create Event
export const createEvent = (name) => async (dispatch) => {
  console.log({ name });
  try {
    dispatch({
      type: "EventCreateRequest",
    });

    const { data } = await axios.post(`${server}/event/create-event`, name);
    console.log({ data });
    dispatch({
      type: "EventCreateSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "EventCreateFail",
      payload: error.response,
    });
  }
};
// get All Events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);

    // "http://localhost:8000/Event/get-all-Events/65898946d86f3ec980e8fc56"
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((err) => console.log(err));

    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailed",
      payload: error,
    });
  }
};
// get All Events of a
export const getAllEvents = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error,
    });
  }
};
//Delelete Events of a shop
export const deleteEventShop = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventShopRequest",
    });
    // console.log({ id, token });
    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((err) => console.log(err));

    dispatch({
      type: "deleteEventShopSuccess",
      payload: data.msg,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventShopFailed",
      payload: error,
    });
  }
};
