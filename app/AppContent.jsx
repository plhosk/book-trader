import React from 'react'
import { Match } from 'react-router'
import { CodeSplit } from 'code-split-component'

import TopBar from './TopBar'
import ErrorDisplay from './error/ErrorDisplay'
// import Introduction from './Introduction'
// import UserPassForm from './auth/UserPassForm'

const styles = {
  appContent: {
    maxWidth: 800,
    margin: '0 auto',
    paddingBottom: 30,
  },
}

const AppContent = () => (
  <div>
    <TopBar />
    <div style={styles.appContent}>
      <ErrorDisplay />
      <Match
        pattern="/"
        exactly
        render={routerProps =>
          <CodeSplit
            chunkName="introduction"
            modules={{ Introduction: require('./Introduction') }} //eslint-disable-line
          >
            {
              ({ Introduction }) => Introduction && <Introduction {...routerProps} /> //eslint-disable-line
            }
          </CodeSplit>
        }
      />
      <Match
        pattern="/login"
        exactly
        render={routerProps =>
          <CodeSplit
            chunkName="userpassform"
            modules={{ UserPassForm: require('./auth/UserPassForm') }} //eslint-disable-line
          >
            {
              ({ UserPassForm }) => UserPassForm && <UserPassForm {...routerProps} /> //eslint-disable-line
            }
          </CodeSplit>
        }
      />

      <Match
        pattern="/signup"
        exactly
        render={routerProps =>
          <CodeSplit
            chunkName="userpassform"
            modules={{ UserPassForm: require('./auth/UserPassForm') }} //eslint-disable-line
          >
            {
              ({ UserPassForm }) => UserPassForm && <UserPassForm {...routerProps} /> //eslint-disable-line
            }
          </CodeSplit>
        }
      />

      { /*
      <Match pattern="/" exactly component={Introduction} />

      <Match pattern="/login" exactly component={UserPassForm} />

      <Match pattern="/signup" exactly component={UserPassForm} />
      */
      }

    </div>
  </div>
)

export default AppContent
