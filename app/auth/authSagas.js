/* eslint-disable no-constant-condition */

import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

import api from '../api'


function* userObjectRequest() {
  const { response, error } = yield call(api.userObjectFetch)
  if (response === 'empty') {
    yield put({ type: 'USER_OBJECT_EMPTY' })
  } else if (response) {
    yield put({ type: 'USER_OBJECT_SUCCESS' })
    yield put({ type: 'LOAD_USER_OBJECT', user: response })
  } else {
    yield put({ type: 'USER_OBJECT_ERROR', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Error getting user object.' })
  }
}

function* logoutRequest() {
  const { success, error } = yield call(api.logoutFetch)
  if (success) {
    yield put({ type: 'LOGOUT_SUCCESS' })
  } else {
    yield put({ type: 'LOGOUT_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Logout failed.' })
  }
}

function* loginRequest(action) {
  const { response, error } = yield call(api.loginFetch, action.username, action.password)
  if (response) {
    yield put({ type: 'LOGIN_SUCCESS' })
    yield put({ type: 'LOAD_USER_OBJECT', user: response })
  } else {
    yield put({ type: 'LOGIN_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Login failed. Username or password may be incorrect.' })
  }
}

function* signupRequest(action) {
  const { success, error } = yield call(api.signupFetch, action.username, action.password)
  if (success) {
    yield put({ type: 'SIGNUP_SUCCESS' })
    yield put({
      type: 'LOGIN_REQUEST',
      username: action.username,
      password: action.password,
    })
  } else {
    yield put({ type: 'SIGNUP_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Signup failed. Username may be taken.' })
  }
}


export default function* authSagas() {
  yield takeEvery('USER_OBJECT_REQUEST', userObjectRequest)
  yield takeEvery('LOGOUT_REQUEST', logoutRequest)
  yield takeLatest('LOGIN_REQUEST', loginRequest)
  yield takeLatest('SIGNUP_REQUEST', signupRequest)
}
