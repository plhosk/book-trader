import { call, put, takeEvery } from 'redux-saga/effects' // takeLatest,

const bookListFetch = () => (
  fetch('/api/books', {
    method: 'GET',
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

function* bookListRequest() {
  const { response, error } = yield call(bookListFetch)
  if (response) {
    yield put({ type: 'BOOK_LIST_UPDATE_STORE', bookList: response })
  } else {
    yield put({ type: 'BOOK_LIST_REQUEST_ERROR', error })
  }
}

const addBookFetch = isbn => (
  fetch('/api/books', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isbn,
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

function* addBookRequest(action) {
  const { response, error } = yield call(addBookFetch, action.isbn)
  if (response) {
    yield put({ type: 'ADD_BOOK_UPDATE_STORE', book: response })
  } else {
    yield put({ type: 'ADD_BOOK_REQUEST_ERROR', error })
  }
}

const deleteBookFetch = bookId => (
  fetch(`/api/books/${bookId}`, {
    credentials: 'same-origin',
    method: 'DELETE',
  })
  .then((response) => {
    if (response.status === 200) {
      return { response: 'success' }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

function* deleteBookRequest(action) {
  const { response, error } = yield call(deleteBookFetch, action.bookId)
  if (response) {
    yield put({ type: 'DELETE_BOOK_UPDATE_STORE', bookId: action.bookId })
  } else {
    yield put({ type: 'DELETE_BOOK_REQUEST_ERROR', error })
  }
}

export default function* booksSagas() {
  yield takeEvery('BOOK_LIST_REQUEST', bookListRequest)
  yield takeEvery('ADD_BOOK_REQUEST', addBookRequest)
  yield takeEvery('DELETE_BOOK_REQUEST', deleteBookRequest)
}
