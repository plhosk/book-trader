import { combineReducers } from 'redux'
import { take, select, all } from 'redux-saga/effects'

import { errorReducer } from './error/errorDuck'
import { authReducer, authSagas } from './auth/authDuck'
import { userInfoReducer, userInfoSagas } from './userInfo/userInfoDuck'
import { booksReducer, booksSagas } from './books/booksDuck'
import { offersReducer, offersSagas } from './offers/offersDuck'

// Define redux store
const initialState = {
  error: '',
  auth: {},
  userInfo: {
    byId: {},
    allIds: [],
  },
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
  userInfo: userInfoReducer,
  error: errorReducer,
  books: booksReducer,
  offers: offersReducer,
})

/**
 * Initialize sagas
 */

// Log every redux action
function* logActions() {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  while (true) { //eslint-disable-line
    const action = yield take()
    const state = yield select()
    console.log(action.type, 'action:', action, 'state:', state) //eslint-disable-line
  }
}

function* rootSaga() {
  yield all([
    // crossDependentSagas(),
    logActions(),
    authSagas(),
    userInfoSagas(),
    booksSagas(),
    offersSagas(),
  ])
}

export { initialState, rootReducer, rootSaga }
