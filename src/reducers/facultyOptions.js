import { updateObject } from "../utils/update-object";

const initialState = {
  faculty_options: null,
  isLoaded: false,
  error: false,
};

const getFacultyOptionsStart = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: false,
    error: false,
  });
};

const getFacultyOptionsSuccess = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: false,
    faculty_options: action.payload.faculty_options,
  });
};

const getFacultyOptionsFail = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FACULTY_OPTIONS_START":
      return getFacultyOptionsStart({ state: state, action: action });
    case "GET_FACULTY_OPTIONS_SUCCESS":
      return getFacultyOptionsSuccess({ state: state, action: action });
    case "GET_FACULTY_OPTIONS_FAIL":
      return getFacultyOptionsFail({ state: state, action: action });
    default:
      return state;
  }
};

export default reducer;
