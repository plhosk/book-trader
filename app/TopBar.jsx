import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library'
import ActionAccountBox from 'material-ui/svg-icons/action/account-box'
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import SocialPerson from 'material-ui/svg-icons/social/person'

const styles = {
  appBar: {
  },
  home: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  title: {
    cursor: 'pointer',
  },
  rightSpan: {
    display: 'flex',
    flexFlow: 'row wrap',

  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
    paddingTop: 6,
    marginBottom: 8,
    textAlign: 'right',
  },
  buttonText: {
    // fontSize: '1.1em',
  },
}

class TopBar extends React.Component {
  componentWillMount() {
    // Refresh user state when loading component (including after login redirect)
    this.props.dispatch({ type: 'AUTH_USER_OBJECT_REQUEST' })
  }

  render() {
    const { user, dispatch } = this.props

    return (
      <AppBar
        style={styles.appBar}
        iconElementLeft={
          <Link to={'/'}>
            <FlatButton
              style={styles.button}
              labelPosition={'after'}
              icon={<MapsLocalLibrary />}
              label={<span style={styles.buttonText}>
                Home
              </span>}
            />
          </Link>
        }
        iconElementRight={
          <span style={styles.rightSpan}>
            {user &&
              <div>
                { /* <Link to={'/mycontent'}> */ }
                <FlatButton
                  style={styles.button}
                  labelPosition={'after'}
                  icon={<SocialPerson />}
                  label={<span style={styles.buttonText}>
                    {user.name}
                  </span>}
                />
                { /* </Link> */ }
                <Link to={'#'}>
                  <FlatButton
                    style={styles.button}
                    labelPosition={'after'}
                    icon={<PowerSettingsNew />}
                    label={<span style={styles.buttonText}>
                      Log Out
                    </span>}
                    onClick={() => dispatch({ type: 'AUTH_LOGOUT_REQUEST' })}
                  />
                </Link>
              </div>
            }
            {!user && <Link to="/login">
              <FlatButton
                style={styles.button}
                labelPosition={'after'}
                icon={<ActionAccountBox />}
                label={<span style={styles.buttonText}>
                  Log In
                </span>}
              />
            </Link>}
            {!user && <Link to="/signup">
              <FlatButton
                style={styles.button}
                labelPosition={'after'}
                icon={<ActionPermIdentity />}
                label={<span style={styles.buttonText}>
                  Sign Up
                </span>}
              />
            </Link>}
          </span>
        }
      />
    )
  }
}

TopBar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
}

TopBar.defaultProps = {
  user: undefined,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(TopBar)
