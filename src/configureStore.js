import { applyMiddleware, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import compose from 'lodash/fp/flowRight'
import thunk from 'redux-thunk'

import reducer from './store/rootReducer'

export default function configureStore(
  initalState = {},
  history = createBrowserHistory(),
) {
  const middlewares = [thunk, routerMiddleware(history)]
  const enhancers = [applyMiddleware(...middlewares)]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose
  /* eslint-enable */

  const routerReducer = connectRouter(history)

  const store = createStore(
    routerReducer(reducer),
    initalState,
    composeEnhancers(...enhancers),
  )

  if (module.hot) {
    /* eslint-disable global-require */
    module.hot.accept('./store/rootReducer', () => {
      const nextRootReducer = require('./store/rootReducer').default
      store.replaceReducer(routerReducer(nextRootReducer))
    })
  }

  return store
}
