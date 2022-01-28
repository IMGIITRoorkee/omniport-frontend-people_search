import axios from "axios";
import { toast } from "react-semantic-toasts";

import { getCookie } from "formula_one";

import * as urls from "../urls";

const setVisibilityStart = () => {
  return {
    type: "SET_VISIBILITY_START",
  };
};

const setVisibilitySuccess = ({ data }) => {
  toast({
    type: "success",
    title: "Success",
    description: "Visibility changes updated",
    animation: "fade up",
    icon: "check",
    time: 3000,
  });

  return {
    type: "SET_VISIBILITY_SUCCESS",
    payload: {
      data: data,
    },
  };
};

const setVisibiltyFail = ({ error }) => {
  toast({
    type: "error",
    title: "Error",
    description: "Failed to update",
    animation: "fade up",
    icon: "frown up",
    time: 3000,
  });

  return {
    type: "SET_VISIBILITY_FAIL",
    error: error,
  };
};

export const setVisibilityPut = (
  id,
  formData,
  successCallback,
  errCallback
) => {
  let headers = {
    "X-CSRFToken": getCookie("csrftoken"),
  };
  return (dispatch) => {
    dispatch(setVisibilityStart());
    const url = urls.urlStudentProfile();

    axios
      .post(url, formData, { headers: headers })
      .then((res) => {
        dispatch(
          setVisibilitySuccess({
            payload: res,
          })
        );
        successCallback(res);
      })
      .catch((err) => {
        errCallback(err);
        dispatch(
          setVisibiltyFail({
            error: error,
          })
        );
      });
  };
};
