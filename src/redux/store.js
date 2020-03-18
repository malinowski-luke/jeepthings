import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import postReducer from './postReducer'
import emailReducer from './emailReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  emailReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
)
