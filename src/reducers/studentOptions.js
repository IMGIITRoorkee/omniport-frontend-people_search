import { updateObject } from "../utils/update-object";

const initialState = {
  student_options: null,
  isLoaded: false,
  error: false,
};

const getstudentOptionsStart = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: false,
    error: false,
  });
};

const getstudentOptionsSuccess = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: false,
    student_options: action.payload.student_options,
  });
};

const getstudentOptionsFail = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STUDENT_OPTIONS_START":
      return getstudentOptionsStart({ state: state, action: action });
    case "GET_STUDENT_OPTIONS_SUCCESS":
      return getstudentOptionsSuccess({ state: state, action: action });
    case "GET_STUDENT_OPTIONS_FAIL":
      return getstudentOptionsFail({ state: state, action: action });
    default:
      return state;
  }
};

export default reducer;
