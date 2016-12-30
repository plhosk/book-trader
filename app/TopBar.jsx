import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
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
    // Refresh user state when loading page (including after login redirect)
    this.props.dispatch({ type: 'USER_OBJECT_REQUEST' })
  }

  render() {
    const { user, dispatch } = this.props

    return (
      <AppBar
        style={styles.appBar}
        iconElementLeft={
          <IconButton
            onClick={() => dispatch({
              type: 'NAVIGATE',
              location: { pathname: '/' },
              action: 'PUSH',
            })}
          >
            <MapsLocalLibrary />
          </IconButton>
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
                    {user.username}
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
                    onClick={() => dispatch({ type: 'LOGOUT_REQUEST' })}
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
  user: PropTypes.objectOf(React.PropTypes.string),
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(TopBar)
