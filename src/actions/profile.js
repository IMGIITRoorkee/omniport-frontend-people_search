import axios from "axios";
import { toast } from "react-semantic-toasts";

import * as urls from "../urls";

const getStudentProfileStart = () => {
  return {
    type: "GET_STUDENT_PROFILE_START",
  };
};

const getStudentProfileSuccess = ({ student_profile }) => {
  return {
    type: "GET_STUDENT_PROFILE_SUCCESS",
    payload: {
      student_profile: student_profile,
    },
  };
};

const getStudentProfileFail = ({ error }) => {
  toast({
    type: "error",
    title: "Failed to fetch the student Profile. Try again later.",
  });

  return {
    type: "GET_STUDENT_PROFILE_FAIL",
    error: error,
  };
};

export const getStudentProfile = (successCallback, errCallback) => {
  return (dispatch) => {
    dispatch(getStudentProfileStart());
    const url = urls.urlStudentProfile();

    axios
      .get(url)
      .then((res) => {
        dispatch(
          getStudentProfileSuccess({
            student_profile: res.data,
          })
        );
        successCallback(res);
      })
      .catch((error) => {
        dispatch(
          getStudentProfileFail({
            error: error,
          })
        );
        errCallback(err);
      });
  };
};
