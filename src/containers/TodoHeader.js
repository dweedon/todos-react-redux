import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { addTodo } from '../store/todos/todos.actions'

class TodoHeader extends React.PureComponent {
  state = {
    inputText: '',
  }

  handleChange = e => {
    this.setState({ inputText: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const trimmed = this.state.inputText.trim()
    if (trimmed.length) {
      this.props.addTodo(trimmed)
      this.setState({ inputText: '' })
    }
  }

  render() {
    return (
      <header className="header">
        <form onSubmit={this.handleSubmit}>
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.inputText}
            onChange={this.handleChange}
          />
        </form>
      </header>
    )
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({ addTodo }, dispatch),
)(TodoHeader)
