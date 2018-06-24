import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import thunk from 'redux-thunk'

import App from './components/App'
import reducer from './store/reducer'

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(reducer),
  applyMiddleware(routerMiddleware(history), thunk),
)

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

export default hot(module)(Main)
