import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago'
import Paper from 'material-ui/Paper'
// import Divider from 'material-ui/Divider'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import ActionSwapHoriz from 'material-ui/svg-icons/action/swap-horiz'

import SingleBook from '../books/SingleBook'

const styles = {
  outerDiv: {
  },
  offerContainer: {
    marginBottom: 20,
  },
  offerFrame: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5px 10px',
    // border: '1px solid red',
  },
  swapHolder: {
  },
  swapIcon: {
    height: 60,
    width: 60,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    margin: '8px 0',
    padding: 8,
    backgroundColor: '#d1b280',
  },
  bookHeader: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    paddingLeft: 10,
  },
  offerStatusHeader: {
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  offerStatus: {
    fontWeight: 'bold',
    fontSize: '2em',
    margin: 10,
    textAlign: 'center',
  },
  buttonHolder: {
    flex: 1,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    minWidth: 160,
  },
  offerButton: {
    // minWidth: 130,
    // wordWrap: 'normal !important',
  },
}

class OfferList extends React.Component {

  handleAccept = (e) => {
    this.props.dispatch({ type: 'OFFER_ACCEPT_REQUEST', offerId: e.currentTarget.dataset.id })
    e.preventDefault()
  }

  handleCancelReject = (e) => {
    this.props.dispatch({ type: 'OFFER_CANCEL_REJECT_REQUEST', offerId: e.currentTarget.dataset.id })
    e.preventDefault()
  }

  render() {
    const { user, userInfo, offers, books } = this.props

    if (books.allIds.length === 0) {
      return null
    }

    if (!user) {
      return (
        <h3 style={{ color: '#755248' }}>Log in to see your offers</h3>
      )
    }
    return (
      <Card>
        <CardHeader
          style={{ backgroundColor: '#ead39c', color: '#755248' }}
          title={`Your Offers (${offers.allIds.length})`}
          subtitle="Click to show"
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <div style={styles.outerDiv}>
            {offers.allIds.map(offerId => (
              <Paper key={offerId} style={styles.offerContainer} zDepth={2}>
                <div style={styles.heading}>
                  Offer made&nbsp;
                  <TimeAgo date={Date.parse(offers.byId[offerId].offerDate)} />
                  &nbsp;ago by&nbsp;
                  {
                    offers.byId[offerId].originatingUserId === user.userId ?
                    user.name + ' (You)' : // eslint-disable-line prefer-template
                    userInfo.byId[offers.byId[offerId].originatingUserId].name
                  }
                </div>
                <Paper style={styles.offerFrame} zDepth={0}>
                  <div>
                    <span style={styles.bookHeader}>You give:</span><br />
                    {(user.userId === offers.byId[offerId].originatingUserId ?
                      offers.byId[offerId].originatingBookIds :
                      offers.byId[offerId].targetBookIds).map(bookId => (
                        <SingleBook key={bookId} bookId={bookId} />
                    ))}
                  </div>
                  <div style={styles.swapHolder}>
                    <ActionSwapHoriz style={styles.swapIcon} color={'#755248'} />
                  </div>
                  <div>
                    <span style={styles.bookHeader}>You receive:</span><br />
                    {(user.userId === offers.byId[offerId].originatingUserId ?
                      offers.byId[offerId].targetBookIds :
                      offers.byId[offerId].originatingBookIds).map(bookId => (
                        <SingleBook key={bookId} bookId={bookId} />
                    ))}
                  </div>
                  <div style={styles.buttonHolder}>
                    <div style={styles.offerStatusHeader}>
                      Current offer status:
                    </div>
                    <div style={styles.offerStatus}>
                      {!offers.byId[offerId].accepted &&
                        !offers.byId[offerId].cancelled &&
                        !offers.byId[offerId].rejected &&
                        <div style={{ color: 'orange' }}>New Offer</div>
                      }
                      {offers.byId[offerId].accepted && <div style={{ color: 'green' }}>Accepted</div>}
                      {offers.byId[offerId].cancelled && <div style={{ color: 'red' }}>Cancelled</div>}
                      {offers.byId[offerId].rejected && <div style={{ color: 'red' }}>Rejected</div>}
                    </div>
                    {user.userId === offers.byId[offerId].targetUserId &&
                      <div>
                        {!offers.byId[offerId].accepted && !offers.byId[offerId].rejected &&
                          <RaisedButton style={styles.offerButton} label="Accept Offer" onClick={this.handleAccept} data-id={offerId} primary />
                        }
                        {!offers.byId[offerId].rejected && !offers.byId[offerId].accepted &&
                          <RaisedButton style={styles.offerButton} label="Reject Offer" onClick={this.handleCancelReject} data-id={offerId} secondary />
                        }
                      </div>
                    }
                    {user.userId === offers.byId[offerId].originatingUserId &&
                      <div>
                        {!offers.byId[offerId].cancelled &&
                          <RaisedButton style={styles.offerButton} label="Cancel Offer" onClick={this.handleCancelReject} data-id={offerId} secondary />
                        }
                      </div>
                    }
                  </div>
                </Paper>
              </Paper>
            ))}
          </div>
        </CardText>
      </Card>
    )
  }
}

OfferList.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  offers: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array,
  }).isRequired,
  books: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array,
  }).isRequired,
  userInfo: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array,
  }).isRequired,
  user: PropTypes.shape({
    userId: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
}

OfferList.defaultProps = {
  user: undefined,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  offers: state.offers,
  books: state.books,
  userInfo: state.userInfo,
})

export default connect(mapStateToProps)(OfferList)
