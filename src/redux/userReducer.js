import axios from 'axios'

const initialState = {
  user: {},
  loading: false,
  err: false,
  errMsg: ''
}

const LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  CHECK_USER = 'CHECK_USER',
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

export default function userReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOGIN + '_PENDING':
      return { ...state, loading: true }
    case LOGIN + '_FULFILLED':
      return { ...state, loading: false, user: payload.data }
    case LOGIN + '_REJECTED':
      return {
        ...state,
        loading: false,
        err: true,
        errMsg: payload.response.data
      }
    case REGISTER + '_PENDING':
      return { ...state, loading: true }
    case REGISTER + '_FULFILLED':
      return { ...state, loading: false, user: payload.data }
    case REGISTER + '_REJECTED':
      return {
        ...state,
        loading: false,
        err: true,
        errMsg: payload.response.data
      }
    case CHECK_USER + '_PENDING':
      return { ...state, loading: true }
    case CHECK_USER + '_FULFILLED':
      return { ...state, loading: false, user: payload.data }
    case CHECK_USER + '_REJECTED':
      return {
        ...state,
        loading: false,
        err: true,
        errMsg: payload.response.data
      }
    case CLEAR_REDUCER:
      return { ...(state = initialState) }
    default:
      return state
  }
}
