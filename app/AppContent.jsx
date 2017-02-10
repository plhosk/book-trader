import React from 'react'
import { Match } from 'react-router'
// import { createAsyncComponent } from 'react-async-component'

import TopBar from './TopBar'
import ErrorDisplay from './error/ErrorDisplay'
import Introduction from './Introduction'
import UserPassForm from './auth/UserPassForm'

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
      <Match pattern="/" exactly component={Introduction} />
      <Match pattern="/login" exactly component={UserPassForm} />
      <Match pattern="/signup" exactly component={UserPassForm} />
      { /*
      <Match
        pattern="/"
        exactly
        render={() => {
          const AsyncComponent = createAsyncComponent({
            resolve: () => System.import('./Introduction'),
          })
          return <AsyncComponent />
        }}
      />
      <Match
        pattern="/login"
        exactly
        render={(routerProps) => {
          const AsyncComponent = createAsyncComponent({
            resolve: () => System.import('./auth/UserPassForm'),
          })
          return <AsyncComponent {...routerProps} />
        }}
      />
      <Match
        pattern="/signup"
        exactly
        render={(routerProps) => {
          const AsyncComponent = createAsyncComponent({
            resolve: () => System.import('./auth/UserPassForm'),
          })
          return <AsyncComponent {...routerProps} />
        }}
      />
      */ }
    </div>
  </div>
)

export default AppContent
