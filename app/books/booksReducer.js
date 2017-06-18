export default function booksReducer(state = {}, action) {
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
