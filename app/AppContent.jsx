import React from 'react'
import { Route } from 'react-router-dom'
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
    <Route path="/" component={TopBar} />
    <div style={styles.appContent}>
      <Route path="/" component={ErrorDisplay} />
      <Route path="/" exact component={Introduction} />
      <Route path="/login" exact component={UserPassForm} />
      <Route path="/signup" exact component={UserPassForm} />
    </div>
  </div>
)

export default AppContent
