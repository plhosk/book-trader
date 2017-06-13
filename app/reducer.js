import { combineReducers } from 'redux'

import authReducer from './auth/authReducer'
import errorReducer from './error/errorReducer'
import booksReducer from './books/booksReducer'

const initialState = {
  auth: {},
  error: '',
  books: {
    byId: {},
    allIds: [],
  },
}

const reducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  books: booksReducer,
})

export default reducer
export { initialState }
