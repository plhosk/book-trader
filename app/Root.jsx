import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Router from 'react-router-addons-controlled/ControlledBrowserRouter'

import { history } from './reducer'
import AppContent from './AppContent'


const Root = props => (
  <Router
    history={history}
    location={props.location}
    action={props.action}
    onChange={(location, action) => {
      // you must always dispatch a `SYNC` action,
      // because, guess what? you can't actual control the browser history!
      // anyway, use your current action not "SYNC"
      if (action === 'SYNC') {
        props.dispatch({ type: 'NAVIGATE', location, action: props.action })
      } else if (!window.block) {
        // if you want to block transitions go into the console and type in
        // `window.block = true` and transitions won't happen anymore
        props.dispatch({ type: 'NAVIGATE', location, action })
      } else {
        console.log('blocked!') // eslint-disable-line
      }
    }}
  >
    { /* <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}> */ }
    <MuiThemeProvider>
      <AppContent />
    </MuiThemeProvider>
  </Router>
)


Root.propTypes = {
  location: PropTypes.object.isRequired, //eslint-disable-line
  action: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  location: state.router.location,
  action: state.router.action,
})

export default connect(mapStateToProps)(Root)
