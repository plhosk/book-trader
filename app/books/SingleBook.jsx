import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Popover from 'material-ui/Popover'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'

const styles = {
  bookFrame: {
    maxWidth: 168,
    marginRight: 20,
    marginBottom: 20,
    padding: 8,
    margin: 10,
    backgroundColor: '#f8f5f2',
  },
  bookInfo: {
  },
  title: {
    fontWeight: 'bold',
    fontSize: '120%',
    padding: 5,
    textTransform: 'capitalize',
  },
  author: {
    fontSize: '80%',
    marginBottom: 5,
  },
  thumbnail: {
    maxWidth: 150,
    border: '1px solid #ddd',
  },
  ownerInfo: {
    fontSize: '80%',
    color: 'darkGrey',
    padding: 5,
  },
  ownerButton: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    borderBottom: '1px solid darkgrey',
    cursor: 'pointer',
  },
  popoverContents: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  li: {
    // justifyContent: 'flex-end',
    textAlign: 'right',
    minHeight: 36,
    lineHeight: '0.1em',
  },
}

const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000)
  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) {
    return `${interval} years`
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return `${interval} months`
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return `${interval} days`
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return `${interval} hours`
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return `${interval} minutes`
  }
  return `${Math.floor(seconds)} seconds`
}

// const SingleBook = props => (
class SingleBook extends React.Component {

  state = { open: false }

  handleOwnerClick = (e) => {
    e.preventDefault()
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }


  render() {
    const { bookId, books, userInfo } = this.props

    return (
      <Paper style={styles.bookFrame} zDepth={2}>
        <div style={styles.bookInfo}>
          <div style={styles.title}>
            {books.byId[bookId].title}
          </div>
          <div style={styles.author}>
            {`by ${books.byId[bookId].authors[0]}`}
          </div>
        </div>
        {}
        <img src={books.byId[bookId].thumbnail} style={styles.thumbnail} alt="" />
        <div style={styles.ownerInfo}>
          {timeSince(Date.parse(books.byId[bookId].creationDate))} ago
          by <button style={styles.ownerButton} onClick={this.handleOwnerClick}>
            {userInfo.byId[books.byId[bookId].ownerId].name}
          </button>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <div style={styles.popoverContents}>
              <div>
                <List style={{ padding: 0 }}>
                  <ListItem style={styles.li} primaryText={'Name:'} />
                  <Divider />
                  <ListItem style={styles.li} primaryText={'City:'} />
                  <Divider />
                  <ListItem style={styles.li} primaryText={'Country:'} />
                </List>
              </div>
              <div>
                <List style={{ padding: 0 }}>
                  <ListItem
                    style={styles.li}
                    primaryText={<b>{userInfo.byId[books.byId[bookId].ownerId].name}</b>}
                  />
                  <Divider />
                  <ListItem
                    style={styles.li}
                    primaryText={<b>{userInfo.byId[books.byId[bookId].ownerId].city}</b>}
                  />
                  <Divider />
                  <ListItem
                    style={styles.li}
                    primaryText={<b>{userInfo.byId[books.byId[bookId].ownerId].country}</b>}
                  />
                </List>
              </div>
            </div>
          </Popover>
        </div>
        {this.props.children}
      </Paper>
    )
  }
}

SingleBook.propTypes = {
  bookId: PropTypes.number.isRequired,
  // collapseThumbnail: PropTypes.bool,
  books: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array,
  }).isRequired,
  userInfo: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array,
  }).isRequired,
  children: PropTypes.node,
}

SingleBook.defaultProps = {
  // collapseThumbnail: false,
  children: null,
}

const mapStateToProps = state => ({
  books: state.books,
  userInfo: state.userInfo,
})

export default connect(mapStateToProps)(SingleBook)
