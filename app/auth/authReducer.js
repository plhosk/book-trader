export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'LOAD_USER_OBJECT':
      return {
        user: action.user,
      }
    case 'LOGOUT_SUCCESS':
      return {}
    default:
      return state
  }
}
