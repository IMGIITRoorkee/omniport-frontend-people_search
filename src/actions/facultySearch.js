import axios from "axios";
import { toast } from "react-semantic-toasts";

import * as urls from "../urls";

const getfacultySearchStart = () => {
  return {
    type: "GET_FACULTY_SEARCH_START",
  };
};

const getfacultySearchSuccess = ({ faculty_search }) => {
  return {
    type: "GET_FACULTY_SEARCH_SUCCESS",
    payload: {
      faculty_search: faculty_search,
    },
  };
};

const getfacultySearchFail = ({ error }) => {
  toast({
    type: "error",
    title: "Failed to fetch the student Search. Try again later.",
  });

  return {
    type: "GET_FACULTY_SEARCH_FAIL",
    error: error,
  };
};

export const getfacultySearch = (
  query,
  designation,
  department,
  facultyPage,
  successFacultyResultsCallback
) => {
  return (dispatch) => {
    dispatch(getfacultySearchStart());
    const url = urls.urlFacultyQuery();

    axios({
      method: "get",
      url: url,
      params: {
        page: facultyPage,
        query,
        designation,
        department,
      },
    })
      .then((res) => {
        dispatch(
          getfacultySearchSuccess({
            faculty_search: res.data,
          })
        );
        successFacultyResultsCallback(res);
      })
      .catch((error) => {
        dispatch(
          getfacultySearchFail({
            error: error,
          })
        );
      });
  };
};
