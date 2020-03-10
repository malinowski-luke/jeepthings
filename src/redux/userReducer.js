import axios from 'axios'

const initialState = {
  user: {},
  posts: [],
  err: false,
  errMsg: ''
}

const LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  CHECK_USER = 'CHECK_USER',
  LOGOUT = 'LOGOUT',
  UPDATE_PROFILE_IMG = 'UPDATE_PROFILE_IMG',
  GET_ALL_USER_POSTS = 'GET_ALL_USER_POSTS',
  ADD_POST = 'ADD_POST',
  DELETE_POST = 'DELETE_POST',
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

export function updateProfileImg(user_id, newProfileImg) {
  let action = {
    type: UPDATE_PROFILE_IMG,
    payload: axios.post('/api/user/change_profile_pic', {
      user_id,
      newProfileImg
    })
  }
  return action
}

export function getAllUserPosts() {
  let action = {
    type: GET_ALL_USER_POSTS,
    payload: axios.get('/api/posts')
  }
  return action
}

export function addPost(postObj) {
  const { user_id } = postObj
  let action = {
    type: ADD_POST,
    payload: axios.post(`/api/posts/${user_id}`, postObj)
  }
  return action
}

export function deletePost(user_id) {
  let action = {
    type: DELETE_POST,
    payload: axios.delete(`/api/posts/${user_id}`)
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
    case GET_ALL_USER_POSTS + '_PENDING':
      return { ...state }
    case GET_ALL_USER_POSTS + '_FULFILLED':
      return { ...state, posts: payload.data }
    case GET_ALL_USER_POSTS + '_REJECTED':
      return { ...state }
    case ADD_POST + '_PENDING':
      return { ...state }
    case ADD_POST + '_FULFILLED':
      return { ...state }
    case ADD_POST + '_REJECTED':
      return { ...state }
    case DELETE_POST + '_PENDING':
      return { ...state }
    case DELETE_POST + '_FULFILLED':
      return { ...state }
    case DELETE_POST + '_REJECTED':
      return { ...state }
    case CLEAR_REDUCER:
      return { ...initialState }
    default:
      return state
  }
}
