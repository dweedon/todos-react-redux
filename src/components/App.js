import { hot } from 'react-hot-loader'
import React from 'react'

import TodosFooter from '../containers/TodosFooter'
import TodosHeader from '../containers/TodosHeader'
import TodosList from '../containers/TodosList'

export class AppBase extends React.Component {
  render() {
    return (
      <section className="todoapp">
        <TodosHeader title="My Todos" />
        <TodosList />
        <TodosFooter />
      </section>
    )
  }
}

export default hot(module)(AppBase)
