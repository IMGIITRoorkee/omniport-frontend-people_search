import { updateObject } from "../utils/update-object";

const initialState = {
  faculty_search: null,
  isLoaded: false,
  error: false,
};

const getFacultySearchStart = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: false,
    error: false,
  });
};

const getFacultySearchSuccess = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: false,
    faculty_search: action.payload.faculty_search,
  });
};

const getFacultySearchFail = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FACULTY_SEARCH_START":
      return getFacultySearchStart({ state: state, action: action });
    case "GET_FACULTY_SEARCH_SUCCESS":
      return getFacultySearchSuccess({ state: state, action: action });
    case "GET_FACULTY_SEARCH_FAIL":
      return getFacultySearchFail({ state: state, action: action });
    default:
      return state;
  }
};

export default reducer;
