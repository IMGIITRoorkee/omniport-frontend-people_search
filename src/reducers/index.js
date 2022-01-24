import { combineReducers } from "redux";
import studentProfile from "./studentProfile";
import setVisibility from "./setVisibility";
import studentSearch from "./studentSearch";
import facultySearch from "./facultySearch";
import facultyOptions from "./facultyOptions";
import studentOptions from "./studentOptions";

const rootReducers = combineReducers({
  studentProfile,
  setVisibility,
  studentSearch,
  facultySearch,
  facultyOptions,
  studentOptions,
});

export default rootReducers;
