import { CodeSplitProvider } from 'code-split-component'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Redbox from 'redbox-react' // Remove in production build

import store from './store'
import Root from './Root'

injectTapEventPlugin()

const RedboxWithConsole = ({ error }) => {
  console.error(error) // eslint-disable-line
  return <Redbox error={error} />
}
RedboxWithConsole.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired,
}

let errorReporter
if (process.env.NODE_ENV === 'production') {
  errorReporter = null
} else {
  errorReporter = RedboxWithConsole
}

const rootElement = document.getElementById('app')

ReactDOM.render(
  <CodeSplitProvider>
    <AppContainer errorReporter={errorReporter}>
      <Provider store={store}>
        <Root />
      </Provider>
    </AppContainer>
  </CodeSplitProvider>,
  rootElement,
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => {
    ReactDOM.render(
      <CodeSplitProvider>
        <AppContainer errorReporter={errorReporter}>
          <Provider store={store}>
            <Root />
          </Provider>
        </AppContainer>
      </CodeSplitProvider>,
      rootElement,
    )
  })
}
