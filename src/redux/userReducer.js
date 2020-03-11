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

// import axios from 'axios'
// import actionList from './actionList' //ext. file
// const initialState = {
//   user: {},
//   posts: [],
//   post: {},
//   err: false,
//   errMsg: ''
// }

// export function clearReducer() {
//   let action = {
//     type: actionList.CLEAR_REDUCER
//   }
//   return action
// }

// export function login(username, password) {
//   let action = {
//     type: actionList.LOGIN,
//     payload: axios.post('/api/auth/login', { username, password })
//   }
//   return action
// }

// export function register(username, password) {
//   let action = {
//     type: actionList.REGISTER,
//     payload: axios.post('/api/auth/register', { username, password })
//   }
//   return action
// }

// export function checkUser() {
//   let action = {
//     type: actionList.CHECK_USER,
//     payload: axios.get('/api/auth/get_user')
//   }
//   return action
// }

// export function logout() {
//   let action = {
//     type: actionList.LOGOUT,
//     payload: axios.post('/api/auth/logout')
//   }
//   return action
// }

// export function updateProfileImg(user_id, newProfileImg) {
//   let action = {
//     type: actionList.UPDATE_PROFILE_IMG,
//     payload: axios.post('/api/user/change_profile_pic', {
//       user_id,
//       newProfileImg
//     })
//   }
//   return action
// }

// export function getAllUserPosts() {
//   let action = {
//     type: actionList.GET_ALL_USER_POSTS,
//     payload: axios.get('/api/posts')
//   }
//   return action
// }

// export function getCurrentPost(post_id) {
//   let action = {
//     type: actionList.GET_CURRENT_POST,
//     payload: axios.get(`/api/posts/${post_id}`)
//   }
//   return action
// }

// export function addPost(postObj) {
//   const { user_id } = postObj
//   let action = {
//     type: actionList.ADD_POST,
//     payload: axios.post(`/api/posts/${user_id}`, postObj)
//   }
//   return action
// }

// export function deletePost(user_id) {
//   let action = {
//     type: actionList.DELETE_POST,
//     payload: axios.delete(`/api/posts/${user_id}`)
//   }
//   return action
// }

// export function updatePost(post_id, post) {
//   let action = {
//     type: actionList.UPDATE_POST,
//     payload: axios.put(`/api/posts/${post_id}`, post)
//   }
//   return action
// }

// export default function userReducer(state = initialState, action) {
//   const { type, payload } = action
//   switch (type) {
//     case actionList.LOGIN + '_PENDING':
//       return { ...state }
//     case actionList.LOGIN + '_FULFILLED':
//       return { ...state, user: payload.data }
//     case actionList.LOGIN + '_REJECTED':
//       return {
//         ...state,
//         err: true,
//         errMsg: payload.response.data
//       }
//     case actionList.REGISTER + '_PENDING':
//       return { ...state }
//     case actionList.REGISTER + '_FULFILLED':
//       return { ...state, user: payload.data }
//     case actionList.REGISTER + '_REJECTED':
//       return {
//         ...state,
//         err: true,
//         errMsg: payload.response.data
//       }
//     case actionList.CHECK_USER + '_PENDING':
//       return { ...state }
//     case actionList.CHECK_USER + '_FULFILLED':
//       return { ...state, user: payload.data }
//     case actionList.CHECK_USER + '_REJECTED':
//       return { ...state, user: {} }
//     case actionList.LOGOUT + '_PENDING':
//       return { ...state }
//     case actionList.LOGOUT + '_FULFILLED':
//       return { ...state, user: {} }
//     case actionList.LOGOUT + '_REJECTED':
//       return { ...state }
//     case actionList.UPDATE_PROFILE_IMG + '_PENDING':
//       return { ...state }
//     case actionList.UPDATE_PROFILE_IMG + '_FULFILLED':
//       return { ...state, user: payload.data }
//     case actionList.UPDATE_PROFILE_IMG + '_REJECTED':
//       return { ...state }
//     case actionList.GET_ALL_USER_POSTS + '_PENDING':
//       return { ...state }
//     case actionList.GET_ALL_USER_POSTS + '_FULFILLED':
//       return { ...state, posts: payload.data }
//     case actionList.GET_ALL_USER_POSTS + '_REJECTED':
//       return { ...state }
//     case actionList.GET_CURRENT_POST + '_PENDING':
//       return { ...state, post: {} }
//     case actionList.GET_CURRENT_POST + '_FULFILLED':
//       return { ...state, post: payload.data }
//     case actionList.GET_CURRENT_POST + '_REJECTED':
//       return { ...state }
//     case actionList.ADD_POST + '_PENDING':
//       return { ...state }
//     case actionList.ADD_POST + '_FULFILLED':
//       return { ...state }
//     case actionList.ADD_POST + '_REJECTED':
//       return { ...state }
//     case actionList.DELETE_POST + '_PENDING':
//       return { ...state }
//     case actionList.DELETE_POST + '_FULFILLED':
//       return { ...state }
//     case actionList.DELETE_POST + '_REJECTED':
//       return { ...state }
//     case actionList.UPDATE_POST + '_PENDING':
//       return { ...state }
//     case actionList.UPDATE_POST + '_FULFILLED':
//       return { ...state }
//     case actionList.UPDATE_POST + '_REJECTED':
//       return { ...state }
//     case actionList.CLEAR_REDUCER:
//       return { ...initialState }
//     default:
//       return state
//   }
// }
