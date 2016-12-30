export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'USER_OBJECT_SUCCESS':
      return {
        user: action.user,
      }
    case 'LOGOUT_SUCCESS':
      return {}
    default:
      return state
  }
}
