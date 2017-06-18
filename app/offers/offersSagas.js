import { call, put, takeEvery } from 'redux-saga/effects' // takeLatest,

const offerListFetch = () => (
  fetch('/api/offers', {
    credentials: 'same-origin',
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

function* offerListRequest() {
  const { response, error } = yield call(offerListFetch)
  if (response) {
    yield put({ type: 'OFFER_LIST_UPDATE_STORE', offerList: response })
  } else {
    yield put({ type: 'OFFER_LIST_REQUEST_ERROR', error })
  }
}

const addOfferFetch = offerRequest => (
  fetch('/api/offers', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      offerRequest,
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

function* addOfferRequest(action) {
  const { response, error } = yield call(addOfferFetch, action.offerRequest)
  if (response) {
    yield put({ type: 'ADD_OFFER_UPDATE_STORE', offer: response })
  } else {
    yield put({ type: 'ADD_OFFER_REQUEST_ERROR', error })
  }
}

const acceptOfferFetch = offerId => (
  fetch(`/api/offers/${offerId}`, {
    credentials: 'same-origin',
    method: 'PUT',
  })
  .then((response) => {
    if (response.status === 200) {
      return { response: 'success' }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

function* acceptOfferRequest(action) {
  const { response, error } = yield call(acceptOfferFetch, action.offerId)
  if (response) {
    yield put({ type: 'ACCEPT_OFFER_UPDATE_STORE', offerId: action.offerId })
  } else {
    yield put({ type: 'ACCEPT_OFFER_REQUEST_ERROR', error })
  }
}

const cancelRejectOfferFetch = offerId => (
  fetch(`/api/offers/${offerId}`, {
    credentials: 'same-origin',
    method: 'DELETE',
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

function* cancelRejectOfferRequest(action) {
  const { response, error } = yield call(cancelRejectOfferFetch, action.offerId)
  if (response.actionTaken === 'cancelled') {
    yield put({ type: 'CANCEL_OFFER_UPDATE_STORE', offerId: action.offerId })
  } else if (response.actionTaken === 'rejected') {
    yield put({ type: 'REJECT_OFFER_UPDATE_STORE', offerId: action.offerId })
  } else {
    yield put({ type: 'CANCEL_REJECT_OFFER_REQUEST_ERROR', error })
  }
}

export default function* offersSagas() {
  yield takeEvery('OFFER_LIST_REQUEST', offerListRequest)
  yield takeEvery('ADD_OFFER_REQUEST', addOfferRequest)
  yield takeEvery('ACCEPT_OFFER_REQUEST', acceptOfferRequest)
  yield takeEvery('CANCEL_REJECT_OFFER_REQUEST', cancelRejectOfferRequest)
}