import { updateObject } from "../utils/update-object";

const initialState = {
  student_search: null,
  isLoaded: false,
  error: false,
};

const getStudentSearchStart = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: false,
    error: false,
  });
};

const getStudentSearchSuccess = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: false,
    student_search: action.payload.student_search,
  });
};

const getStudentSearchFail = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STUDENT_SEARCH_START":
      return getStudentSearchStart({ state: state, action: action });
    case "GET_STUDENT_SEARCH_SUCCESS":
      return getStudentSearchSuccess({ state: state, action: action });
    case "GET_STUDENT_SEARCH_FAIL":
      return getStudentSearchFail({ state: state, action: action });
    default:
      return state;
  }
};

export default reducer;
