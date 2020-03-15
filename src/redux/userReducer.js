import axios from 'axios'
import actionList from './actionList' //ext. file
const initialState = {
  user: {},
  err: false,
  errMsg: ''
}

export function login(username, password) {
  let action = {
    type: actionList.LOGIN,
    payload: axios.post('/api/auth/login', { username, password })
  }
  return action
}

export function register(username, password) {
  let action = {
    type: actionList.REGISTER,
    payload: axios.post('/api/auth/register', { username, password })
  }
  return action
}

export function checkUser() {
  let action = {
    type: actionList.CHECK_USER,
    payload: axios.get('/api/auth/get_user')
  }
  return action
}

export function logout() {
  let action = {
    type: actionList.LOGOUT,
    payload: axios.post('/api/auth/logout')
  }
  return action
}

export function updateProfileImg(user_id, newProfileImg) {
  let action = {
    type: actionList.UPDATE_PROFILE_IMG,
    payload: axios.post('/api/user/change_profile_pic', {
      user_id,
      newProfileImg
    })
  }
  return action
}

export function clearUserReducer() {
  let action = {
    type: actionList.CLEAR_USER_REDUCER
  }
  return action
}

export default function userReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionList.LOGIN + '_PENDING':
      return { ...state }
    case actionList.LOGIN + '_FULFILLED':
      return { ...state, user: payload.data }
    case actionList.LOGIN + '_REJECTED':
      return {
        ...state,
        err: true,
        errMsg: payload.response.data
      }
    case actionList.REGISTER + '_PENDING':
      return { ...state }
    case actionList.REGISTER + '_FULFILLED':
      return { ...state, user: payload.data }
    case actionList.REGISTER + '_REJECTED':
      return {
        ...state,
        err: true,
        errMsg: payload.response.data
      }
    case actionList.CHECK_USER + '_PENDING':
      return { ...state }
    case actionList.CHECK_USER + '_FULFILLED':
      return { ...state, user: payload.data }
    case actionList.CHECK_USER + '_REJECTED':
      return { ...state, user: {} }
    case actionList.LOGOUT + '_PENDING':
      return { ...state }
    case actionList.LOGOUT + '_FULFILLED':
      return { ...state, user: {} }
    case actionList.LOGOUT + '_REJECTED':
      return { ...state }
    case actionList.UPDATE_PROFILE_IMG + '_PENDING':
      return { ...state }
    case actionList.UPDATE_PROFILE_IMG + '_FULFILLED':
      return { ...state, user: payload.data }
    case actionList.UPDATE_PROFILE_IMG + '_REJECTED':
      return { ...state }
    case actionList.CLEAR_USER_REDUCER:
      return { ...initialState }
    default:
      return state
  }
}
