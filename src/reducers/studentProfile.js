import { updateObject } from "../utils/update-object";

const initialState = {
  student_profile: null,
  isLoaded: false,
  error: false,
};

const getStudentProfileStart = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: false,
    error: false,
  });
};

const getStudentProfileSuccess = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: false,
    student_profile: action.payload.student_profile,
  });
};

const getStudentProfileFail = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STUDENT_PROFILE_START":
      return getStudentProfileStart({ state: state, action: action });
    case "GET_STUDENT_PROFILE_SUCCESS":
      return getStudentProfileSuccess({ state: state, action: action });
    case "GET_STUDENT_PROFILE_FAIL":
      return getStudentProfileFail({ state: state, action: action });
    default:
      return state;
  }
};

export default reducer;
