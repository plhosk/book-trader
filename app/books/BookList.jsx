import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Card, CardActions, CardMedia } from 'material-ui/Card'
// import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
// import IconButton from 'material-ui/IconButton'
// import StarBorder from 'material-ui/svg-icons/toggle/star-border'

const styles = {
  outerDiv: {
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'lightgrey',
    margin: 10,
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  // flexContainer: {
  //   width: 200,
  //   height: 'auto',
  //   overflowY: 'auto',
  // },
  // cardTitle: {
  //   maxHeight: 50,
  //   // width: 150,
  //   overflow: 'visible',
  //   // whiteSpace: 'nowrap',
  //   textOverflow: 'ellipsis',
  // },
  bookFrame: {
    // height: 180,
    // maxHeight: 200,
    maxWidth: 158,
    marginRight: 20,
    marginBottom: 20,
    padding: 4,
    // borderWidth: 0,
    // maxHeight: 400,
    // verticalAlign: 'bottom',
  },
  bookInfo: {
  },
  title: {
    fontWeight: 'bold',
    fontSize: '120%',
    padding: 3,
    textTransform: 'capitalize',
    // lineHeight: '1.5em',
  },
  author: {
    fontSize: '80%',
    marginBottom: 5,
  },
  thumbnail: {
    maxWidth: 150,
  },
  // cardMedia: {
  //   // verticalAlign: 'bottom',
  // },
}

class BookList extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'BOOK_LIST_REQUEST' })
  }

  render() {
    const { books } = this.props
    return (
      <div style={styles.outerDiv}>
        {books.allIds.map(bookId => (
          <Paper key={bookId} style={styles.bookFrame} zDepth={1}>
            <div style={styles.bookInfo}>
              <div style={styles.title}>{books.byId[bookId].title}</div>
              <div style={styles.author}>{`by ${books.byId[bookId].authors[0]}`}</div>
            </div>
            <img src={books.byId[bookId].thumbnail} style={styles.thumbnail} alt="" />
            <FlatButton label="Make Offer" />
          </Paper>
        ))}
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
  // user: PropTypes.objectOf(PropTypes.string),
}

// BookList.defaultProps = {
//   user: undefined,
// }

const mapStateToProps = state => ({
//   user: state.auth.user,
  books: state.books,
})

export default connect(mapStateToProps)(BookList)
