export default function offersReducer(state = {}, action) {
  switch (action.type) {
    case 'OFFER_LIST_UPDATE_STORE': {
      // offerList is an ordered array of book entries. Change to normalized state shape
      const byId = {}
      const allIds = []
      for (let i = 0; i < action.offerList.length; i += 1) {
        byId[action.offerList[i].bookId] = { ...action.offerList[i] }
        allIds.push(action.offerList[i].offerId)
      }
      return {
        byId,
        allIds,
      }
    }
    case 'ADD_OFFER_UPDATE_STORE': {
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
    case 'CANCEL_OFFER_UPDATE_STORE': {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.offerId]: {
            ...state.byId[action.offerId],
            cancelled: true,
          },
        },
      }
    }
    case 'REJECT_OFFER_UPDATE_STORE': {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.offerId]: {
            ...state.byId[action.offerId],
            rejected: true,
          },
        },
      }
    }
    default:
      return state
  }
}
