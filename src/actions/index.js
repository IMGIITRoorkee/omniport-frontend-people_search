import axios from 'axios'
import {
  urlResidenceOptions,
  urlStudentQuery,
  urlFacultyQuery,
  urlInterestQuery
} from '../urls'

export const setOptions = (successCallback, errCallback) => {
  return dispatch => {
    axios
      .options(urlResidenceOptions())
      .then(res => {
        dispatch({
          type: `SET_OPTIONS`,
          payload: {
            optionsLoaded: true,
            options: res.data.actions.PUT,
            dataLoaded: false,
            data: {}
          }
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}

export const studentSearch = (query, successCallback, errCallback) => {
  return dispatch => {
    axios
      .get(urlStudentQuery(), {
        params: { query }
      })
      .then(res => {
        dispatch({
          type: `STUDENT_SEARCH`,
          payload: res.data
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}
export const facultySearch = (query, successCallback, errCallback) => {
  return dispatch => {
    axios
      .get(urlFacultyQuery(), {
        params: { query }
      })
      .then(res => {
        dispatch({
          type: `FACULTY_SEARCH`,
          payload: res.data
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}
