import axios from "axios";
import { getWhoAmIApi } from "../urls";

export const whoami = (successCallback, errCallback) => {
  return (dispatch) => {
    axios
      .get(getWhoAmIApi())
      .then((res) => {
        successCallback(res);
      })
      .catch((err) => {
        errCallback(err);
      });
  };
};
