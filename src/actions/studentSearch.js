import axios from "axios";
import { toast } from "react-semantic-toasts";

import * as urls from "../urls";

const getStudentSearchStart = () => {
  return {
    type: "GET_STUDENT_SEARCH_START",
  };
};

const getStudentSearchSuccess = ({ student_search }) => {
  return {
    type: "GET_STUDENT_SEARCH_SUCCESS",
    payload: {
      student_search: student_search,
    },
  };
};

const getStudentSearchFail = ({ error }) => {
  toast({
    type: "error",
    title: "Failed to fetch the student Search. Try again later.",
  });

  return {
    type: "GET_STUDENT_SEARCH_FAIL",
    error: error,
  };
};

export const getStudentSearch = (
  query,
  branch,
  current_year,
  residence,
  categoryOptions,
  studentPage,
  successStudentResultsCallback
) => {
  return (dispatch) => {
    dispatch(getStudentSearchStart());
    const url = urls.urlStudentQuery();

    axios({
      method: "get",
      url: url,
      params: {
        page: studentPage,
        query,
        branch,
        current_year,
        residence,
        categoryOptions,
      },
    })
      .then((res) => {
        dispatch(
          getStudentSearchSuccess({
            student_search: res.data,
          })
        );
        successStudentResultsCallback(res);
      })
      .catch((error) => {
        dispatch(
          getStudentSearchFail({
            error: error,
          })
        );
      });
  };
};
