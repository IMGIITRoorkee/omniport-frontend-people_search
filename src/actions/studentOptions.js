import axios from "axios";
import { toast } from "react-semantic-toasts";

import * as urls from "../urls";

const getstudentOptionsStart = () => {
  return {
    type: "GET_STUDENT_OPTIONS_START",
  };
};

const getstudentOptionsSuccess = ({ student_options }) => {
  return {
    type: "GET_STUDENT_OPTIONS_SUCCESS",
    payload: {
      student_options: student_options,
    },
  };
};

const getstudentOptionsFail = ({ error }) => {
  toast({
    type: "error",
    title: "Failed to fetch the student Search. Try again later.",
  });

  return {
    type: "GET_STUDENT_OPTIONS_FAIL",
    error: error,
  };
};

export const getstudentOptions = (
  successstudentOptionsCallback,
  errCallback
) => {
  return (dispatch) => {
    dispatch(getstudentOptionsStart());
    const url = urls.urlOptions();

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        dispatch(
          getstudentOptionsSuccess({
            student_options: res.data,
          })
        );
        successstudentOptionsCallback(res);
      })
      .catch((error) => {
        dispatch(
          getstudentOptionsFail({
            error: error,
          })
        );
        errCallback(error);
      });
  };
};
