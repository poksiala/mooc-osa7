import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notifications'
import errorReducer from './reducers/errors'
import blogReducer from './reducers/blogs'

const reducer = combineReducers({
  notification: notificationReducer,
  error: errorReducer,
  blogs: blogReducer,
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store