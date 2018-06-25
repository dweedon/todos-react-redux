import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router-dom'
import React from 'react'

import TodoFooter from '../containers/TodoFooter'
import TodoHeader from '../containers/TodoHeader'
import TodoList from '../containers/TodoList'

class App extends React.Component {
  render() {
    return (
      <section className="todoapp">
        <TodoHeader />
        <TodoList />
        <TodoFooter />
      </section>
    )
  }
}

export default hot(module)(withRouter(App))
