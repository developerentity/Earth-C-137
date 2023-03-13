import axios from "axios";
import store from "../app/store";

export const getDataByUrl = async (url: string, params?: object) => {
  try {
    const reqParams = params ? { params } : {};
    const response = await axios.get(url, reqParams);
    return response.data;
  } catch (error) {
    const { dispatch } = store;
    //   return dispatch(setRequestError(error));
    console.error(error);
  }
};
