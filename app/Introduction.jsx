import React from 'react'
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  outerDiv: {
    fontSize: '1.1em',
    lineHeight: '1.8em',
    padding: '0 10px',
  },
  logo: {
    height: 60,
    width: 60,
    position: 'relative',
    top: 16,
    padding: 4,
  },
  title: {
    color: '#755248',
    fontSize: '3em',
    textAlign: 'center',
    marginTop: 16,
  },
  content: {
    maxWidth: 500,
    margin: '0 auto',
    color: '#755248',
    marginBottom: 25,
  },
}

const Introduction = () => (
  <div style={styles.outerDiv}>
    <h2 style={styles.title}>
      <MapsLocalLibrary style={styles.logo} color={'#755248'} />
      Book Trader
    </h2>
    <div style={styles.content}>
      <ul>
        <li>
          View, add and trade books with other users.
        </li>
        <li>
          Check out this app&rsquo;s source code on <a
            href="https://github.com/plhosk/book-trader"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>.
        </li>
        <li>
          Click to log in as a &nbsp;<RaisedButton
            label="Test user"
          />
          &nbsp; or create your own account to try out the site&apos;s features.
        </li>
      </ul>
    </div>
    { /*
    <div style={styles.instructions}>
      Enter a stock symbol (e.g., AAPL, AMZN, FB, GOOG, MSFT)<br />
      or click &quot;Add Random&quot; for a random stock
    </div>
    <div style={styles.quandl}>
      Data source: Quandl API
    </div>
    </div> */ }
  </div>
)

export default Introduction
