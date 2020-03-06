import axios from 'axios'

const initialState = {
  user: {},
  err: false,
  errMsg: ''
}

const LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  CHECK_USER = 'CHECK_USER',
  LOGOUT = 'LOGOUT',
  UPDATE_PROFILE_IMG = 'UPDATE_PROFILE_IMG',
  CLEAR_REDUCER = 'CLEAR_REDUCER'

export function clearReducer() {
  let action = {
    type: CLEAR_REDUCER
  }
  return action
}

export function login(username, password) {
  let action = {
    type: LOGIN,
    payload: axios.post('/api/auth/login', { username, password })
  }
  return action
}

export function register(username, password) {
  let action = {
    type: REGISTER,
    payload: axios.post('/api/auth/register', { username, password })
  }
  return action
}

export function checkUser() {
  let action = {
    type: CHECK_USER,
    payload: axios.get('/api/auth/get_user')
  }
  return action
}

export function logout() {
  let action = {
    type: LOGOUT,
    payload: axios.post('/api/auth/logout')
  }
  return action
}

export function updateProfileImg(userId, newProfileImg) {
  let action = {
    type: UPDATE_PROFILE_IMG,
    payload: axios.post('/api/user/change_profile_pic', {
      userId,
      newProfileImg
    })
  }
  return action
}

export default function userReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOGIN + '_PENDING':
      return { ...state }
    case LOGIN + '_FULFILLED':
      return { ...state, user: payload.data }
    case LOGIN + '_REJECTED':
      return {
        ...state,
        err: true,
        errMsg: payload.response.data
      }
    case REGISTER + '_PENDING':
      return { ...state }
    case REGISTER + '_FULFILLED':
      return { ...state, user: payload.data }
    case REGISTER + '_REJECTED':
      return {
        ...state,
        err: true,
        errMsg: payload.response.data
      }
    case CHECK_USER + '_PENDING':
      return { ...state }
    case CHECK_USER + '_FULFILLED':
      return { ...state, user: payload.data }
    case CHECK_USER + '_REJECTED':
      return { ...state, user: {} }
    case LOGOUT + '_PENDING':
      return { ...state }
    case LOGOUT + '_FULFILLED':
      return { ...state, user: {} }
    case LOGOUT + '_REJECTED':
      return { ...state }
    case UPDATE_PROFILE_IMG + '_PENDING':
      return { ...state }
    case UPDATE_PROFILE_IMG + '_FULFILLED':
      return { ...state, user: payload.data }
    case UPDATE_PROFILE_IMG + '_REJECTED':
      return { ...state }
    case CLEAR_REDUCER:
      return { ...initialState }
    default:
      return state
  }
}
