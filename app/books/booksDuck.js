import { call, put, takeEvery } from 'redux-saga/effects' // takeLatest,

// Redux reducer
const booksReducer = (state = { byId: {}, allIds: [] }, action) => {
  switch (action.type) {
    case 'BOOK_LIST_RECEIVED': {
      // bookList is an ordered array of book entries. Change to normalized state shape
      const byId = {}
      const allIds = []
      for (let i = 0; i < action.bookList.length; i += 1) {
        byId[action.bookList[i].bookId] = { ...action.bookList[i] }
        allIds.push(action.bookList[i].bookId)
      }
      return {
        byId,
        allIds,
      }
    }
    case 'BOOK_ADD_CONFIRMED': {
      return {
        ...state,
        byId: {
          [action.book.bookId]: action.book,
          ...state.byId,
        },
        allIds: [
          action.book.bookId,
          ...state.allIds,
        ],
      }
    }
    case 'BOOK_DELETE_CONFIRMED': {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.bookId]: {
            ...state.byId[action.bookId],
            deleted: true,
          },
        },
      }
    }
    default:
      return state
  }
}

/**
 * Fetch/Saga pairs
 */

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
    yield put({ type: 'BOOK_LIST_RECEIVED', bookList: response })
  } else {
    yield put({ type: 'BOOK_LIST_REQUEST_ERROR', error })
    yield put({ type: 'ERROR_MESSAGE_SHOW', error: 'Error requesting book list from server.' })
  }
}

const bookAddFetch = isbn => (
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

function* bookAddRequest(action) {
  const { response, error } = yield call(bookAddFetch, action.isbn)
  if (response) {
    yield put({ type: 'BOOK_ADD_CONFIRMED', book: response })
  } else {
    yield put({ type: 'BOOK_ADD_REQUEST_ERROR', error })
    yield put({ type: 'ERROR_MESSAGE_SHOW', error: 'Error adding book Try a different ISBN.' })
  }
}

const bookDeleteFetch = bookId => (
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

function* bookDeleteRequest(action) {
  const { response, error } = yield call(bookDeleteFetch, action.bookId)
  if (response) {
    yield put({ type: 'BOOK_DELETE_CONFIRMED', bookId: action.bookId })
  } else {
    yield put({ type: 'BOOK_DELETE_REQUEST_ERROR', error })
    yield put({ type: 'ERROR_MESSAGE_SHOW', error: 'Error deleting book.' })
  }
}

// Sagas initialization function
function* booksSagas() {
  yield takeEvery('BOOK_LIST_REQUEST', bookListRequest)
  yield takeEvery('BOOK_ADD_REQUEST', bookAddRequest)
  yield takeEvery('BOOK_DELETE_REQUEST', bookDeleteRequest)
}

export { booksReducer, booksSagas }
