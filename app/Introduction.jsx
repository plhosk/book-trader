import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  outerDiv: {
    fontSize: '1.1em',
    lineHeight: '1.8em',
    padding: '0 10px',
  },
  logo: {
    height: 60,
    width: 60,
    position: 'relative',
    top: 16,
    padding: 4,
  },
  title: {
    color: '#755248',
    fontSize: '3em',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: '1em',
  },
  content: {
    maxWidth: 500,
    margin: '0 auto',
    color: '#755248',
    marginBottom: 25,
  },
}

// const Introduction = () => (
class Introduction extends React.Component {
  loginTestUser = () => {
    this.props.dispatch({
      type: 'AUTH_LOGIN_REQUEST',
      username: 'test',
      password: 'test',
    })
  }

  render() {
    const { user } = this.props
    return (
      <div style={styles.outerDiv}>
        <h2 style={styles.title}>
          <MapsLocalLibrary style={styles.logo} color={'#755248'} />
          Book Trader
        </h2>
        <div style={styles.content}>
          <ul>
            <li>
              View, add and trade books with other users.
            </li>
            {(!user) ?
              <li>
                Click to log in as a &nbsp;<RaisedButton
                  label="Test user"
                  onClick={this.loginTestUser}
                />
                &nbsp; or create your own account to try out the site&apos;s features.
              </li> : <li>You&apos;re logged in. Feel free to
              experiment with the site&apos;s features!</li>
            }
            <li>
              While logged in, click your username in the top right corner to
              edit your profile.
            </li>
            <li>
              Check out this app&rsquo;s source code on <a
                href="https://github.com/plhosk/book-trader"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>.
            </li>
          </ul>
        </div>
        { /*
        <div style={styles.instructions}>
          Enter a stock symbol (e.g., AAPL, AMZN, FB, GOOG, MSFT)<br />
          or click &quot;Add Random&quot; for a random stock
        </div>
        <div style={styles.quandl}>
          Data source: Quandl API
        </div>
        </div> */ }
      </div>
    )
  }
}

Introduction.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
}

Introduction.defaultProps = {
  user: undefined,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

// export default Introduction
export default connect(mapStateToProps)(Introduction)
