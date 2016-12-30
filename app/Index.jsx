import React from 'react'
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library'
import { blue500 } from 'material-ui/styles/colors'

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
    color: blue500,
    fontSize: '2em',
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

const Index = () => (
  <div style={styles.outerDiv}>
    <h2 style={styles.title}>
      <MapsLocalLibrary style={styles.logo} color={blue500} />
      Book Trader
    </h2>
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

export default Index
