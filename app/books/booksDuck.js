import { call, put, takeEvery } from 'redux-saga/effects' // takeLatest,

const booksReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BOOK_LIST_UPDATE_STORE': {
      // bookList is an ordered array of book entries. Change to normalized state shape
      const byId = {}
      const allIds = []
      for (let i = 0; i < action.bookList.length; i += 1) {
        byId[action.bookList[i].bookId] = { ...action.bookList[i] }
        allIds.push(action.booklist[i].bookId)
      }
      return {
        byId,
        allIds,
      }
    }
    case 'ADD_BOOK_UPDATE_STORE': {
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
    case 'DELETE_BOOK_UPDATE_STORE': {
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

function* booksSagas() {
  yield takeEvery('BOOK_LIST_REQUEST', bookListRequest)
  yield takeEvery('ADD_BOOK_REQUEST', addBookRequest)
  yield takeEvery('DELETE_BOOK_REQUEST', deleteBookRequest)
}

export { booksReducer, booksSagas }
