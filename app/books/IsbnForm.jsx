import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  outerDiv: {
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

class IsbnForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    this.props.dispatch({ type: 'BOOK_ADD_REQUEST', isbn: this.state.value })
    // alert(`An ISBN was submitted: ${this.state.value}`) // eslint-disable-line no-alert
    event.preventDefault()
  }
  render() {
    if (!this.props.user) {
      return (
        <div style={styles.outerDiv}>
          <h3>Log in to add your books!</h3>
        </div>
      )
    }

    return (
      <div style={styles.outerDiv}>
        <h3>Add a book to offer it for trade!</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="isbn">
            ISBN:
            <TextField
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
