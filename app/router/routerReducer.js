export default function routerReducer(state = {}, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return {
        ...state,
        location: action.location,
        action: action.action,
      }
    case 'LOGIN_SUCCESS':
    case 'LOGOUT_SUCCESS':
      return {
        location: { pathname: '/' },
        action: 'PUSH',
      }
    case 'SIGNUP_SUCCESS':
      return {
        location: { pathname: '/login' },
        action: 'PUSH',
      }
    default:
      return state
  }
}
