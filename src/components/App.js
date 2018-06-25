import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import React from 'react'

import {
  addTodo,
  deleteTodo,
  endEditTodoText,
  markAllComplete,
  markAllIncomplete,
  setTodoComplete,
  startEditTodoText,
} from '../store/todos/todos.actions'
import { selectTodos } from '../store/todos/todos.selectors'

class App extends React.Component {
  state = {
    newTodoText: '',
    editText: '',
  }

  onChangeComplete = e => {
    this.props.setTodoComplete(!e.target.checked)
  }

  onChangeNewTodoText = e => {
    this.setState({ newTodoText: e.target.value })
  }

  onChangeEditText = e => {
    this.setState({ editText: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.newTodoText.length) {
      this.props.addTodo(this.state.newTodoText)
      this.setState({ newTodoText: '' })
    }
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <form onSubmit={this.handleSubmit}>
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.newTodoText}
              onChange={this.onChangeNewTodoText}
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label>Mark all as complete</label>
          <ul className="todo-list">
            {this.props.todos.map(todo => (
              <li
                className={[
                  todo.editing ? 'editing' : '',
                  todo.complete ? 'complete' : '',
                ].join(' ')}
                key={todo.id}
              >
                {todo.editing ? (
                  <input
                    className="edit"
                    value={this.state.editText}
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (this.state.editText === '') {
                          this.props.deleteTodo(todo.id)
                        } else {
                          this.props.endEditTodoText(
                            todo.id,
                            this.state.editText,
                          )
                        }
                      }
                      if (e.key === 'Escape') {
                        e.preventDefault()
                        this.props.endEditTodoText(todo.id, todo.text)
                      }
                    }}
                    onChange={this.onChangeEditText}
                  />
                ) : (
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.complete}
                      onChange={e =>
                        this.props.setTodoComplete(todo.id, e.target.checked)
                      }
                    />
                    <label
                      htmlFor="toggle"
                      onDoubleClick={() => {
                        this.props.startEditTodoText(todo.id)
                        this.setState({ editText: todo.text })
                      }}
                    >
                      {todo.text}
                    </label>
                    <button
                      className="destroy"
                      onClick={() => this.props.deleteTodo(todo.id)}
                    />
                  </div>
                )}
              </li>
            ))}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTodo,
      deleteTodo,
      setTodoComplete,
      startEditTodoText,
      endEditTodoText,
      markAllComplete,
      markAllIncomplete,
    },
    dispatch,
  )

const WrappedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default hot(module)(WrappedApp)
