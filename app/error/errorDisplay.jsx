import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'


const styles = {
  paper: {
    margin: '20px auto',
    padding: 10,
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f55',
    color: 'white',
  },
  title: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    padding: 10,
  },
}


const ErrorDisplay = ({ error, dispatch }) => (
  <div>
    {error !== '' &&
      <Paper style={styles.paper} zDepth={2}>
        <span style={styles.title}>Error</span>
        <span>{error}</span>
        <IconButton onClick={() => { dispatch({ type: 'HIDE_ERROR_MESSAGE' }) }}>
          <NavigationClose color={'#fff'} />
        </IconButton>
      </Paper>
    }
  </div>
)
ErrorDisplay.propTypes = {
  error: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
}

ErrorDisplay.defaultProps = {
  error: '',
}

const mapStateToProps = state => ({
  error: state.error,
})

export default connect(mapStateToProps)(ErrorDisplay)
