import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago'
import Paper from 'material-ui/Paper'
import Popover from 'material-ui/Popover'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'

const styles = {
  bookFrame: {
    maxWidth: 160,
    marginRight: 10,
    marginBottom: 10,
    padding: 4,
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
    textAlign: 'right',
    minHeight: 36,
    lineHeight: '0.1em',
  },
}

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
          <TimeAgo date={Date.parse(books.byId[bookId].creationDate)} />
          &nbsp;by&nbsp;
          <button style={styles.ownerButton} onClick={this.handleOwnerClick}>
            {userInfo.allIds.length === 0 ? 'user' :
              userInfo.byId[books.byId[bookId].ownerId].name}
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
