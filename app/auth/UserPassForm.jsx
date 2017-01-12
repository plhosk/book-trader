import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import GitHub from './GitHub'

const styles = {
  outerDiv: {
    maxWidth: 500,
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    flexGrow: 1,
  },
  textField: {
    maxWidth: 200,
    // fontSize: '1.2em',
  },
  button: {
    maxWidth: 200,
    marginTop: 10,
  },
}

const UserPassForm = (props) => {
  if (props.user) {
    return (
      <h2>You are already logged in!</h2>
    )
  }

  // this form uses refs (instead of local state or redux store).
  // In a functional component, refs must be declared here
  let userInput = null
  let passInput = null

  const onSubmit = (e) => {
    e.preventDefault()
    const username = userInput.input.value
    const password = passInput.input.value
    switch (props.pathname) {
      case '/login':
        props.dispatch({ type: 'LOGIN_REQUEST', username, password })
        break
      case '/signup':
        props.dispatch({ type: 'SIGNUP_REQUEST', username, password })
        break
      default:
    }
  }

  let formTitle = ''
  let buttonLabel = ''
  switch (props.pathname) {
    case '/login':
      formTitle = 'Log in'
      buttonLabel = 'Log in'
      break
    case '/signup':
      formTitle = 'Sign up'
      buttonLabel = 'Sign up'
      break
    default:
  }

  return (
    <div style={styles.outerDiv}>
      <div style={styles.form}>
        <h1>{formTitle}</h1>
        <form onSubmit={onSubmit}>
          <TextField
            style={styles.textField}
            ref={(username) => { userInput = username }}
            id="username"
            type="text"
            placeholder="Username"
            required
            // autoFocus
          />
          <br />
          <TextField
            style={styles.textField}
            ref={(password) => { passInput = password }}
            id="password"
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <RaisedButton
            style={styles.button}
            type="submit"
            label={buttonLabel}
          />
        </form>
      </div>
      <GitHub />
    </div>
  )
}

UserPassForm.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  pathname: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired,
}

UserPassForm.defaultProps = {
  user: undefined,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(UserPassForm)
