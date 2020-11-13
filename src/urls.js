import config from '../config.json'

export const appBaseUrl = () => {
  return config.baseUrl
}

export const urlProfile = () => {
  return `${appBaseUrl()}/profile/`
}

export const urlStudentQuery = () => {
  return `/api/people_search/student_search/`
}
export const urlFacultyQuery = () => {
  return `/api/people_search/faculty_search/`
}
export const urlInterestQuery = () => {
  return `/api/people_search/interest_search/`
}
export const urlFacultyProfile = (id) => {
  return `${urlFacultyQuery()}${id}`
}
export const urlStudentDetailProfile = () => {
  return `/api/people_search/student_detail_search/`
}
export const urlStudentProfile = (id) => {
  return `${urlStudentDetailProfile()}${id}`
}
