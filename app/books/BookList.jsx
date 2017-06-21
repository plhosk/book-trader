import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

import SingleBook from './SingleBook'

const styles = {
  bookListRows: {
    margin: 10,
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // border: '1px solid lightgrey',
  },
  offerTitleFlex: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  offerPanel: {
    margin: 10,
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // border: '1px solid lightgrey',
  },
  requesting: {
    // border: '2px solid #755248',
    border: '2px solid #d1b280',
    borderRadius: 16,
    padding: 5,
    margin: '0 5px',
    marginBottom: 10,
    paddingTop: 0,
    minWidth: 190,
    maxWidth: 400,
  },
  checkbox: {
    paddingLeft: 20,
  },
  divider: {
    margin: 10,
  },
  title: {
    paddingLeft: 20,
    color: '#755248',
  },
  button: {
    display: 'block',
    margin: 10,
    maxWidth: 150,
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
          <div style={styles.offerTitleFlex}>
            <h2 style={styles.title}>Send Trade Request</h2>
            <RaisedButton
              style={styles.button}
              label="Cancel Trade"
              onClick={this.clearState}
            />
          </div>
          <div style={styles.offerPanel}>
            <div style={styles.requesting}>
              <h3 style={styles.title}>You are requesting:</h3>
              <SingleBook key={wantedBook} bookId={parseInt(wantedBook, 10)} />
            </div>
            <div style={styles.requesting}>
              <h3 style={styles.title}>Select one of your books to offer:</h3>
              <div style={styles.bookListRows}>
                {books.allIds.map((bookId) => {
                  if (books.byId[bookId].ownerId !== user.userId) {
                    return null
                  }
                  return (
                    <SingleBook key={bookId} bookId={bookId}>
                      <RaisedButton
                        style={styles.button}
                        label="Offer Book"
                        data-id={bookId}
                        onClick={this.offerBook}
                      />
                    </SingleBook>
                  )
                })}
              </div>
            </div>
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
        <div style={styles.bookListRows}>
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
