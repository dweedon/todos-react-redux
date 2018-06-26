import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import React from 'react'
import compose from 'lodash/fp/flowRight'

import { selectTodos } from '../store/todos/todos.selectors'

class App extends React.Component {
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" />
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label>Mark all as complete</label>
          <ul className="todo-list">
            {this.props.todos.map(todo => (
              <li className={todo.completed ? 'completed' : ''} key={todo.text}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                  />
                  <label htmlFor="toggle">{todo.text}</label>
                  <button className="destroy" />
                </div>
                <input className="edit" value={todo.text} />
              </li>
            ))}
            {/*
            <li className="editing">
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>asdf</label>
                <button className="destroy" />
              </div>
              <input className="edit" value="asdf" />
            </li>
            <li>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>asdf</label>
                <button className="destroy" />
              </div>
              <input className="edit" value="asdf" />
            </li> */}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>2 items left</strong>
          </span>
          <ul className="filters">
            <li>
              <a className="selected">All</a>
            </li>
            <li>
              <a>Active</a>
            </li>
            <li>
              <a>Completed</a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  todos: selectTodos(state),
})

export default compose(
  hot(module),
  connect(mapStateToProps),
)(App)
