import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_OBJECT_UPDATE_STORE':
      return {
        user: action.user,
      }
    case 'USER_OBJECT_CLEAR':
      return {}
    default:
      return state
  }
}

const userObjectFetch = () => (
  fetch('/api/login', {
    credentials: 'same-origin',
    method: 'GET',
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json()
      .then(json => ({ response: json }))
    }
    if (response.status === 204) {
      return { response: 'empty' }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

function* userObjectRequest() {
  const { response, error } = yield call(userObjectFetch)
  if (response === 'empty') {
    yield put({ type: 'USER_OBJECT_EMPTY' })
  } else if (response) {
    yield put({ type: 'USER_OBJECT_UPDATE_STORE', user: response })
  } else {
    yield put({ type: 'USER_OBJECT_ERROR', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Error getting user object.' })
  }
}

const logoutFetch = () => (
  fetch('/api/logout', {
    credentials: 'same-origin',
    method: 'DELETE',
  })
  .then((response) => {
    if (response.status === 200) {
      return { success: true }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

function* logoutRequest() {
  const { success, error } = yield call(logoutFetch)
  if (success) {
    yield put({ type: 'USER_OBJECT_CLEAR' })
  } else {
    yield put({ type: 'LOGOUT_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Logout failed.' })
  }
}

const loginFetch = (username, password) => (
  fetch('/api/login', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json()
      .then(json => ({ response: json }))
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

function* loginRequest(action) {
  const { response, error } = yield call(loginFetch, action.username, action.password)
  if (response) {
    yield put({ type: 'USER_OBJECT_UPDATE_STORE', user: response })
  } else {
    yield put({ type: 'LOGIN_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Login failed. Username or password may be incorrect.' })
  }
}

const signupFetch = (username, password) => (
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return { success: true }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

function* signupRequest(action) {
  const { success, error } = yield call(signupFetch, action.username, action.password)
  if (success) {
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

function* authSagas() {
  yield takeEvery('USER_OBJECT_REQUEST', userObjectRequest)
  yield takeEvery('LOGOUT_REQUEST', logoutRequest)
  yield takeLatest('LOGIN_REQUEST', loginRequest)
  yield takeLatest('SIGNUP_REQUEST', signupRequest)
}

export { authReducer, authSagas }
