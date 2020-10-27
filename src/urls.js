import config from '../config.json'

export const appBaseUrl = () => {
  return config.baseUrl
}

export const urlProfile = () => {
  return `${appBaseUrl()}/profile`
}

export const urlResidenceOptions = () => {
  return `/api/settings/residential_information/`
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