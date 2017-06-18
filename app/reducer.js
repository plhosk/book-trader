import { combineReducers } from 'redux'

import authReducer from './auth/authReducer'
import errorReducer from './error/errorReducer'
import booksReducer from './books/booksReducer'
import offersReducer from './offers/offersReducer'

const initialState = {
  auth: {},
  error: '',
  books: {
    byId: {},
    allIds: [],
  },
  offers: {
    byId: {},
    allIds: [],
  },
}

const reducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  books: booksReducer,
  offers: offersReducer,
})

export default reducer
export { initialState }
