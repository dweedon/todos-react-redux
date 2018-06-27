import { connect } from 'react-redux'
import React from 'react'

import { addTodo } from '../store/todos/todos.actions'

class TodosHeader extends React.PureComponent {
  state = {
    newTodoText: '',
  }

  handleNewTodoTextChange = e => {
    this.setState({ newTodoText: e.target.value })
  }

  handleNewTodoKeyDown = e => {
    if (e.key === 'Escape') {
      e.preventDefault()
      this.setState({ newTodoText: '' })
    }
  }

  handleOnNewTodoSubmit = e => {
    e.stopPropagation()
    e.preventDefault()
    const trimmed = this.state.newTodoText.trim()
    if (trimmed !== '') {
      this.props.dispatchAddTodo(trimmed)
    }
    this.setState({ newTodoText: '' })
  }

  render() {
    return (
      <header className="header">
        <h1>{this.props.title}</h1>
        <form onSubmit={this.handleOnNewTodoSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodoText}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleNewTodoTextChange}
          />
        </form>
      </header>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchAddTodo: text => dispatch(addTodo(text)),
})

export default connect(
  null,
  mapDispatchToProps,
)(TodosHeader)
