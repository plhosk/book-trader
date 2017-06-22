import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  outerDiv: {
    // margin: 10,
    // border: '1px solid lightgrey',
    marginTop: 20,
    paddingBottom: 5,
  },
  title: {
    paddingLeft: 20,
    color: '#755248',
  },
  label: {
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  textField: {
    maxWidth: 200,
    marginLeft: 5,
    marginRight: 5,
    // fontSize: '1.2em',
  },
  button: {
    maxWidth: 200,
    // marginTop: 10,
  },
}

class IsbnForm extends React.Component {

  state = { value: '' }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleClear = () => {
    this.setState({ value: '' })
  }

  handleSubmit = (event) => {
    this.props.dispatch({ type: 'BOOK_ADD_REQUEST', isbn: this.state.value })
    // alert(`An ISBN was submitted: ${this.state.value}`) // eslint-disable-line no-alert
    event.preventDefault()
  }

  render() {
    if (!this.props.user) {
      return (
        <div>
          <h3 style={{ color: '#755248' }}>Log in to add your books</h3>
        </div>
      )
    }

    return (
      <div style={styles.outerDiv}>
        <h3 style={styles.title}>Add a book to offer it for trade!</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="isbn">
            <span style={styles.label}>Enter ISBN:</span>
            <TextField
              style={styles.textField}
              id="isbn"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <RaisedButton
            style={styles.button}
            type="submit"
            label="Add Book"
          />
          <FlatButton
            label="Clear"
            onClick={this.handleClear}
          />
        </form>
      </div>
    )
  }
}


IsbnForm.propTypes = {
  user: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
}

IsbnForm.defaultProps = {
  user: undefined,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(IsbnForm)
