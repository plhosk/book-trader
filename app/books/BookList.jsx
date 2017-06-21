import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

import SingleBook from './SingleBook'

const styles = {
  outerDiv: {
    margin: 10,
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  checkbox: {
    // maxWidth: 300,
    paddingLeft: 20,
  },
  divider: {
    margin: 10,
  },
  title: {
    paddingLeft: 20,
  },
  button: {
    display: 'block',
    // margin: '0 auto',
    margin: 10,
  },
}

class BookList extends React.Component {

  state = { ownedOnly: false, wantedBook: undefined, offeredBook: undefined }

  componentDidMount() {
    this.props.dispatch({ type: 'BOOK_LIST_REQUEST' })
  }

  handleCheckbox = (event, isInputChecked) => {
    this.setState({ ownedOnly: isInputChecked })
  }

  wantBook = (e) => {
    this.setState({ wantedBook: e.currentTarget.dataset.id })
  }

  offerBook = (e) => {
    // this.setState({ offeredBook: e.currentTarget.dataset.id })
    const offerRequest = {
      targetUserId: this.props.books.byId[this.state.wantedBook].ownerId,
      originatingBookIds: [e.currentTarget.dataset.id],
      targetBookIds: [this.state.wantedBook],
    }
    this.props.dispatch({ type: 'OFFER_ADD_REQUEST', offerRequest })
    this.setState({ wantedBook: undefined })
  }

  clearState = () => {
    this.setState({ wantedBook: undefined, offeredBook: undefined })
  }

  render() {
    const { user, books } = this.props
    const { ownedOnly, wantedBook } = this.state

    if (wantedBook && user) {
      return (
        <Paper zDepth={3}>
          <Divider style={styles.divider} />
          <h2>Send Trade Request</h2>
          <div style={styles.outerDiv}>
            <SingleBook key={wantedBook} bookId={wantedBook}>
              <h4>Requested Book</h4>
            </SingleBook>
            <div>Select the book you want to give</div>
            {books.allIds.map((bookId) => {
              if (books.byId[bookId].ownerId !== user.userId) {
                return null
              }
              return (
                <SingleBook key={bookId} bookId={bookId}>
                  <RaisedButton
                    style={styles.button}
                    primary
                    label="Offer This Book"
                    data-id={bookId}
                    onClick={this.offerBook}
                  />
                </SingleBook>
              )
            })}
          </div>
        </Paper>
      )
    }

    return (
      <div>
        <Divider style={styles.divider} />
        <h2 style={styles.title}>Browse Books</h2>
        { user &&
          <Checkbox
            label="Show only my books"
            style={styles.checkbox}
            checked={ownedOnly}
            onCheck={this.handleCheckbox}
          />
        }
        <div style={styles.outerDiv}>
          {books.allIds.map((bookId) => {
            if (user && ownedOnly && books.byId[bookId].ownerId !== user.userId) {
              return null
            }
            return (
              <SingleBook key={bookId} bookId={bookId}>
                {user && user.userId !== books.byId[bookId].ownerId && (
                  <RaisedButton
                    style={styles.button}
                    label="Make Offer"
                    data-id={bookId}
                    onClick={this.wantBook}
                  />
                )}
              </SingleBook>
            )
          })}
        </div>
      </div>
    )
  }
}

BookList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  books: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array,
  }).isRequired,
  user: PropTypes.shape({
    userId: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
}

BookList.defaultProps = {
  user: undefined,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userInfo: state.userInfo,
  books: state.books,
})

export default connect(mapStateToProps)(BookList)
