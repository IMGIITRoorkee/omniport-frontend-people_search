import { updateObject } from "../utils/update-object";

const initialState = {
  data: null,
  isLoaded: false,
  error: false,
};

const setVisibilityStart = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: false,
    error: false,
  });
};

const setVisibilitySuccess = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: false,
    data: action.payload.data,
  });
};

const setVisibiltyFail = ({ state, action }) => {
  return updateObject(state, {
    isLoaded: true,
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VISIBILITY_START":
      return setVisibilityStart({ state: state, action: action });
    case "SET_VISIBILITY_SUCCESS":
      return setVisibilitySuccess({ state: state, action: action });
    case "SET_VISIBILITY_FAIL":
      return setVisibiltyFail({ state: state, action: action });
    default:
      return state;
  }
};

export default reducer;
