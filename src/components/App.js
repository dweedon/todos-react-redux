import React from 'react'
import { hot } from 'react-hot-loader'

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
            <li className="completed">
              <div className="view">
                <input className="toggle" type="checkbox" checked />
                <label htmlFor="toggle">asdf</label>
                <button className="destroy" />
              </div>
              <input className="edit" value="asdf" />
            </li>
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
            </li>
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

export default hot(module)(App)
