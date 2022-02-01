import axios from "axios";
import { toast } from "react-semantic-toasts";

import * as urls from "../urls";

const getfacultyOptionsStart = () => {
  return {
    type: "GET_FACULTY_OPTIONS_START",
  };
};

const getfacultyOptionsSuccess = ({ faculty_options }) => {
  return {
    type: "GET_FACULTY_OPTIONS_SUCCESS",
    payload: {
      faculty_options: faculty_options,
    },
  };
};

const getfacultyOptionsFail = ({ error }) => {
  toast({
    type: "error",
    title: "Failed to fetch the student Search. Try again later.",
  });

  return {
    type: "GET_FACULTY_OPTIONS_FAIL",
    error: error,
  };
};

export const getfacultyOptions = (
  successFacultyOptionsCallback,
  errCallback
) => {
  return (dispatch) => {
    dispatch(getfacultyOptionsStart());
    const url = urls.urlOptions();

    axios
      .get(url)
      .then((res) => {
        dispatch(
          getfacultyOptionsSuccess({
            faculty_options: res.data,
          })
        );
        successFacultyOptionsCallback(res);
      })
      .catch((error) => {
        dispatch(
          getfacultyOptionsFail({
            error: error,
          })
        );
        errCallback(error);
      });
  };
};
