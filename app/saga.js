import { take, select, all } from 'redux-saga/effects'

import authSagas from './auth/authSagas'
// import booksSagas from './books/booksSagas'

// Log every Redux action
function* logActions() {
  while (true) { //eslint-disable-line
    const action = yield take()
    const state = yield select()
    console.log('[logActions]', action.type, 'action:', action, 'state:', state) //eslint-disable-line
  }
}

export default function* rootSaga() {
  yield all([
    logActions(),
    authSagas(),
    // booksSagas(),
  ])
}
