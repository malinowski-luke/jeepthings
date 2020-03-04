import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
  userReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
)
