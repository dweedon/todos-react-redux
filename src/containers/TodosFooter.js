import React, { PureComponent } from 'react'

class TodosFooter extends PureComponent {
  render() {
    return (
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
    )
  }
}

export default TodosFooter
