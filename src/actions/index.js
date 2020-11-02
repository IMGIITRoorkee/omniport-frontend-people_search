import axios from 'axios'
import {
  urlStudentQuery,
  urlFacultyQuery,
  urlInterestQuery,
  urlFacultyProfile,
  urlStudentProfile
} from '../urls'

export const studentOptions = (successCallback, errCallback) => {
  return dispatch => {
    axios
      .get(urlStudentQuery())
      .then(res => {
        dispatch({
          type: `STUDENT_OPTIONS`,
          payload: res.data
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}
export const facultyOptions = (successCallback, errCallback) => {
  return dispatch => {
    axios
      .get(urlFacultyQuery())
      .then(res => {
        dispatch({
          type: `FACULTY_OPTIONS`,
          payload: res.data
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}
export const interestSearch = (query, successCallback, errCallback) => {
  return dispatch => {
    axios
      .get(urlInterestQuery(), {
        params: { query }
      })
      .then(res => {
        dispatch({
          type: `INTEREST_SEARCH`,
          payload: res.data
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}

export const facultyProfile = (id, successCallback, errCallback) => {
  return dispatch => {
    axios
      .get(urlFacultyProfile(id))
      .then(res => {
        dispatch({
          type: `FACULTY_PROFILE`,
          payload: res
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}
export const studentProfile = (id, successCallback, errCallback) => {
  return dispatch => {
    axios
      .get(urlStudentProfile(id))
      .then(res => {
        dispatch({
          type: `STUDENT_PROFILE`,
          payload: res
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}