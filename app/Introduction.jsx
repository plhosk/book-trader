import React from 'react'
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library'
// import { blue500 } from 'material-ui/styles/colors'

const styles = {
  outerDiv: {
    fontSize: '1.1em',
    lineHeight: '1.8em',
    padding: '0 10px',
    // border: '1px solid lightgrey',
  },
  logo: {
    height: 60,
    width: 60,
    position: 'relative',
    top: 16,
    padding: 4,
  },
  title: {
    // color: blue500,
    color: '#755248',
    fontSize: '3em',
    textAlign: 'center',
    marginTop: 16,
  },
  content: {
    maxWidth: 400,
    margin: '0 auto',
    color: '#755248',
    marginBottom: 25,
  },
  // instructions: {
  //   color: green500,
  //   marginTop: 10,
  //   textAlign: 'center',
  //   fontSize: '1.1em',
  // },
  // quandl: {
  //   textAlign: 'right',
  //   fontSize: '0.6em',
  //   padding: 0,
  //   margin: 0,
  //   marginBottom: 5,
  //   lineHeight: '0.6em',
  // },
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
