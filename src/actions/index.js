import axios from 'axios'
import { getCookie } from 'formula_one'
import { toast } from 'react-semantic-toasts'
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

export const setVisibility = (id, formData, successCallback, errCallback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .put(urlStudentProfile(`${id}/`), formData, { headers: headers })
      .then(res => {
        dispatch({
          type: `SET_VISIBILITY`,
          payload: res
        })
        successCallback(res)
        toast({
          type: 'success',
          title: 'Success',
          description: 'Visibility changes updated',
          animation: 'fade up',
          icon: 'check',
          time: 3000
        })
      })
      .catch(err => {
        errCallback(err)
        toast({
          type: 'error',
          title: 'Error',
          description: 'Failed to update',
          animation: 'fade up',
          icon: 'frown up',
          time: 3000
        })
      })
  }
}
