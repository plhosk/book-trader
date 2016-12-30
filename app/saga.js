import { take, select } from 'redux-saga/effects'

import authSagas from './auth/authSagas'
// import booksSagas from './books/booksSagas'

// Log every Redux action
function* logActions() {
  while (true) { //eslint-disable-line
    const action = yield take()
    const state = yield select()
    console.log('action:', action, 'state:', state) //eslint-disable-line
  }
}

export default function* rootSaga() {
  yield [
    logActions(),
    authSagas(),
    // booksSagas(),
  ]
}
