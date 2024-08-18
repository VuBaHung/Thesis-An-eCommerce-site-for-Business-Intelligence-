import axios from "axios";

export const loadToken = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadTokenRequest",
    });
    const { data } = await axios.get("/user/refresh_token");
    console.log({ data }, "token");
    dispatch({
      type: "LoadTokenSuccess",
      payload: data.accessToken,
    });
    dispatch({
      type: "LoadInfor",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadTokenFail",
      payload: error.response,
    });
  }
};
