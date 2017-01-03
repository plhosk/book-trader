import React from 'react'
import { Match } from 'react-router'

import TopBar from './TopBar'
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
      <Match pattern="/" exactly component={Introduction} />
      <Match pattern="/login" exactly component={UserPassForm} />
      <Match pattern="/signup" exactly component={UserPassForm} />
    </div>
  </div>
)

export default AppContent
