import config from "../config.json";

export const appBaseUrl = () => {
  return config.baseUrl;
};

export const urlProfile = () => {
  return `${appBaseUrl()}/profile/`;
};

export const urlOptions = () => {
  return `/api/people_search/advanced_search/`;
};

export const getWhoAmIApi = () => {
  return "/kernel/who_am_i/";
};
export const urlStudentQuery = () => {
  return `/api/people_search/student_search/`;
};
export const urlFacultyQuery = () => {
  return `/api/people_search/faculty_search/`;
};
export const urlFacultyProfile = (id) => {
  return `${urlFacultyQuery()}${id}`;
};
export const urlStudentProfile = () => {
  return `/api/people_search/student_detail/`;
};
