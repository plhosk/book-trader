import { call, put, takeEvery } from 'redux-saga/effects' // takeLatest,

// Redux reducer
const offersReducer = (state = { byId: {}, allIds: [] }, action) => {
  switch (action.type) {
    case 'OFFER_LIST_RECEIVED': {
      // offerList is an ordered array of book entries. Change to normalized state shape
      const byId = {}
      const allIds = []
      for (let i = 0; i < action.offerList.length; i += 1) {
        byId[action.offerList[i].offerId] = { ...action.offerList[i] }
        allIds.push(action.offerList[i].offerId)
      }
      return {
        byId,
        allIds,
      }
    }
    case 'OFFER_ADD_CONFIRMED': {
      return {
        ...state,
        byId: {
          [action.offer.offerId]: action.offer,
          ...state.byId,
        },
        allIds: [
          action.offer.offerId,
          ...state.allIds,
        ],
      }
    }
    case 'OFFER_STATUS_UPDATE_CONFIRMED': {
      // action.newStatus = { (accepted || cancelled || rejected): (true || false)
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.offerId]: {
            ...state.byId[action.offerId],
            ...action.newStatus,
          },
        },
      }
    }
    default:
      return state
  }
}

/**
 * Fetch-Saga pairs
 */

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
    yield put({ type: 'OFFER_LIST_RECEIVED', offerList: response })
  } else {
    yield put({ type: 'OFFER_LIST_REQUEST_ERROR', error })
  }
}

const offerAddFetch = offerRequest => (
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

function* offerAddRequest(action) {
  const { response, error } = yield call(offerAddFetch, action.offerRequest)
  if (response) {
    yield put({ type: 'OFFER_ADD_CONFIRMED', offer: response })
  } else {
    yield put({ type: 'OFFER_ADD_REQUEST_ERROR', error })
  }
}

const offerAcceptFetch = offerId => (
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

function* offerAcceptRequest(action) {
  const { response, error } = yield call(offerAcceptFetch, action.offerId)
  if (response) {
    yield put({
      type: 'OFFER_STATUS_UPDATE_CONFIRMED',
      offerId: action.offerId,
      newStatus: { accepted: true },
    })
  } else {
    yield put({ type: 'OFFER_ACCEPT_REQUEST_ERROR', error })
  }
}

const offerCancelRejectFetch = offerId => (
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

function* offerCancelRejectRequest(action) {
  const { response, error } = yield call(offerCancelRejectFetch, action.offerId)
  if (response && response.actionTaken === 'cancelled') {
    yield put({
      type: 'OFFER_STATUS_UPDATE_CONFIRMED',
      offerId: action.offerId,
      newStatus: { cancelled: true },
    })
  } else if (response && response.actionTaken === 'rejected') {
    yield put({
      type: 'OFFER_STATUS_UPDATE_CONFIRMED',
      offerId: action.offerId,
      newStatus: { rejected: true },
    })
  } else {
    yield put({ type: 'OFFER_CANCEL_REJECT_REQUEST_ERROR', error })
  }
}

// Sagas initialization function
function* offersSagas() {
  yield takeEvery('OFFER_LIST_REQUEST', offerListRequest)
  yield takeEvery('OFFER_ADD_REQUEST', offerAddRequest)
  yield takeEvery('OFFER_ACCEPT_REQUEST', offerAcceptRequest)
  yield takeEvery('OFFER_CANCEL_REJECT_REQUEST', offerCancelRejectRequest)
}

export { offersReducer, offersSagas }
