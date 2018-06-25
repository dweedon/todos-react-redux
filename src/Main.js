import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import React, { Component } from 'react'

import App from './components/App'
import configureStore from './configureStore'

const history = createBrowserHistory()
const initialState = {}
const store = configureStore(initialState, history)

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Main
