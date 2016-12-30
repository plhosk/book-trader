export default function errorReducer(state = '', action) {
  switch (action.type) {
    case 'SHOW_ERROR_MESSAGE':
      return action.error
    case 'HIDE_ERROR_MESSAGE':
    case 'NAVIGATE':
    default:
      return state
  }
}
