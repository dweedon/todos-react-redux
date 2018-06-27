import { connect } from 'react-redux'
import React, { PureComponent } from 'react'

import { deleteTodo, setComplete } from '../store/todos/todos.actions'
import { selectTodos } from '../store/todos/todos.selectors'

class TodosList extends PureComponent {
  render() {
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label>Mark all as complete</label>
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <li className={todo.completed ? 'completed' : ''} key={todo.id}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={e =>
                    this.props.dispatchSetCompleted(todo.id, e.target.checked)
                  }
                />
                <label htmlFor="toggle">{todo.text}</label>
                <button
                  className="destroy"
                  onClick={() => this.props.deleteTodo(todo.id)}
                />
              </div>
              <input className="edit" value={todo.text} />
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  todos: selectTodos(state),
})

const mapDispatchToProps = dispatch => ({
  deleteTodo: id => dispatch(deleteTodo(id)),
  dispatchSetCompleted: (id, completed) => dispatch(setComplete(id, completed)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodosList)
