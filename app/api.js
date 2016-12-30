const userObjectFetch = () => (
    fetch('/api/login', {
      credentials: 'same-origin',
      method: 'GET',
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
        .then(json => ({ response: json }))
      }
      if (response.status === 204) {
        return { response: 'empty' }
      }
      return { error: response }
    })
    .catch(error => ({ error }))
)


const loginFetch = (username, password) => (
  fetch('/api/login', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
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


const signupFetch = (username, password) => (
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return { success: true }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)


const logoutFetch = () => (
  fetch('/api/logout', {
    credentials: 'same-origin',
    method: 'DELETE',
  })
  .then((response) => {
    if (response.status === 200) {
      return { success: true }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

const api = {
  userObjectFetch,
  loginFetch,
  signupFetch,
  logoutFetch,
}

export default api
