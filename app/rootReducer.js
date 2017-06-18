import { combineReducers } from 'redux'
import { take, select, all } from 'redux-saga/effects'

import errorReducer from './error/errorReducer'
import { authReducer, authSagas } from './auth/authDuck'
import { booksReducer, booksSagas } from './books/booksDuck'
import { offersReducer, offersSagas } from './offers/offersDuck'

const initialState = {
  error: '',
  auth: {},
  books: {
    byId: {},
    allIds: [],
  },
  offers: {
    byId: {},
    allIds: [],
  },
}

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  books: booksReducer,
  offers: offersReducer,
})

// Log every Redux action
function* logActions() {
  while (true) { //eslint-disable-line
    const action = yield take()
    const state = yield select()
    console.log('[logActions]', action.type, 'action:', action, 'state:', state) //eslint-disable-line
  }
}

function* rootSaga() {
  yield all([
    logActions(),
    authSagas(),
    booksSagas(),
    offersSagas(),
  ])
}

export { initialState, rootReducer, rootSaga }
