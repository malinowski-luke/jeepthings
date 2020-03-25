import axios from 'axios'
import actionList from './actionList'

const initialState = {
  toastMsg: ''
}

export function clearEmailReducer() {
  let action = {
    type: actionList.CLEAR_EMAIL_REDUCER
  }
  return action
}

export function sendMsgToUser(msgInfo) {
  let action = {
    type: actionList.SEND_MSG_TO_USER,
    payload: axios.post('/api/email/msg', msgInfo)
  }
  return action
}

export function newPostMassEmail(msgInfo) {
  let action = {
    type: actionList.NEW_POST_MASS_EMAIL,
    payload: axios.post('/api/email/newpost', msgInfo)
  }
  return action
}

export default function emailReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionList.NEW_POST_MASS_EMAIL + '_PENDING':
      return { ...state }
    case actionList.NEW_POST_MASS_EMAIL + '_FULFILLED':
      return { ...state }
    case actionList.NEW_POST_MASS_EMAIL + '_REJECTED':
      return { ...state }
    case actionList.SEND_MSG_TO_USER + '_PENDING':
      return { ...state }
    case actionList.SEND_MSG_TO_USER + '_FULFILLED':
      return { toastMsg: payload.data }
    case actionList.SEND_MSG_TO_USER + '_REJECTED':
      return { toastMsg: payload.response.data }
    case actionList.CLEAR_EMAIL_REDUCER:
      return { ...initialState }
    default:
      return state
  }
}
