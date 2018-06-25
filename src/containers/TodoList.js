import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'

import { computeTodos } from '../store/todos/todos.selectors'
import {
  deleteTodo,
  endEditTodoText,
  markAllComplete,
  markAllIncomplete,
  setTodoComplete,
  startEditTodoText,
} from '../store/todos/todos.actions'
import Todo from '../components/Todo'

class TodoList extends PureComponent {
  handleToggleAll = e => {
    if (e.target.checked) {
      this.props.markAllComplete()
    } else {
      this.props.markAllIncomplete()
    }
  }

  render() {
    return (
      <section className="main">
        <input
          className="toggle-all"
          id="toggle-all"
          type="checkbox"
          onChange={this.handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <Todo
              key={todo.id}
              id={todo.id}
              text={todo.text}
              complete={todo.complete}
              editing={todo.editing}
              onDelete={this.props.deleteTodo}
              onStartEdit={this.props.startEditTodoText}
              onEndEdit={this.props.endEditTodoText}
              onSetComplete={this.props.setTodoComplete}
            />
          ))}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  todos: computeTodos(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteTodo,
      startEditTodoText,
      endEditTodoText,
      setTodoComplete,
      markAllComplete,
      markAllIncomplete,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList)
