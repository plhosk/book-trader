import { combineReducers } from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'

import routerReducer from './router/routerReducer'
import authReducer from './auth/authReducer'
import errorReducer from './error/errorReducer'
import booksReducer from './books/booksReducer'

const history = createBrowserHistory()

const initialState = {
  router: {
    location: history.location,
    action: history.action,
  },
  auth: {},
  error: '',
  books: {
    byId: {},
    allIds: [],
  },
}

const reducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  error: errorReducer,
  books: booksReducer,
})

export default reducer
export { history, initialState }
