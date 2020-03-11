import axios from 'axios'
import actionList from './actionList' //ext. file
const initialState = {
  posts: [],
  post: {}
}

export function getAllUserPosts() {
  let action = {
    type: actionList.GET_ALL_USER_POSTS,
    payload: axios.get('/api/posts')
  }
  return action
}

export function getCurrentPost(post_id) {
  let action = {
    type: actionList.GET_CURRENT_POST,
    payload: axios.get(`/api/posts/${post_id}`)
  }
  return action
}

export function addPost(postObj) {
  const { user_id } = postObj
  let action = {
    type: actionList.ADD_POST,
    payload: axios.post(`/api/posts/${user_id}`, postObj)
  }
  return action
}

export function deletePost(user_id) {
  let action = {
    type: actionList.DELETE_POST,
    payload: axios.delete(`/api/posts/${user_id}`)
  }
  return action
}

export function updatePost(post_id, post) {
  let action = {
    type: actionList.UPDATE_POST,
    payload: axios.put(`/api/posts/${post_id}`, post)
  }
  return action
}

export function clearPostReducer() {
  let action = {
    type: actionList.CLEAR_POST_REDUCER
  }
  return action
}
export default function postReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionList.GET_ALL_USER_POSTS + '_PENDING':
      return { ...state }
    case actionList.GET_ALL_USER_POSTS + '_FULFILLED':
      return { ...state, posts: payload.data }
    case actionList.GET_ALL_USER_POSTS + '_REJECTED':
      return { ...state }
    case actionList.GET_CURRENT_POST + '_PENDING':
      return { ...state, post: {} }
    case actionList.GET_CURRENT_POST + '_FULFILLED':
      return { ...state, post: payload.data }
    case actionList.GET_CURRENT_POST + '_REJECTED':
      return { ...state }
    case actionList.ADD_POST + '_PENDING':
      return { ...state }
    case actionList.ADD_POST + '_FULFILLED':
      return { ...state }
    case actionList.ADD_POST + '_REJECTED':
      return { ...state }
    case actionList.DELETE_POST + '_PENDING':
      return { ...state }
    case actionList.DELETE_POST + '_FULFILLED':
      return { ...state }
    case actionList.DELETE_POST + '_REJECTED':
      return { ...state }
    case actionList.UPDATE_POST + '_PENDING':
      return { ...state }
    case actionList.UPDATE_POST + '_FULFILLED':
      return { ...state }
    case actionList.UPDATE_POST + '_REJECTED':
      return { ...state }
    case actionList.CLEAR_POST_REDUCER:
      return { ...initialState }
    default:
      return state
  }
}
