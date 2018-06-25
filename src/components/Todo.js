import React, { PureComponent } from 'react'

class Todo extends PureComponent {
  state = {
    inputText: '',
  }

  getClassName() {
    return [
      this.props.editing ? 'editing' : '',
      this.props.complete ? 'complete' : '',
    ].join(' ')
  }

  handleInputKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.endTodoEdit()
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      this.cancelTodoEdit()
    }
  }

  handleInputChange = e => {
    this.setState({ inputText: e.target.value })
  }

  toggleComplete = () => {
    this.props.onSetComplete(this.props.id, !this.props.complete)
  }

  deleteTodo = () => {
    this.props.onDelete(this.props.id)
  }

  startTodoEdit = () => {
    this.props.onStartEdit(this.props.id)
    this.setState({ inputText: this.props.text })
  }

  endTodoEdit = () => {
    if (this.state.inputText === '') {
      this.props.onDelete(this.props.id)
    } else {
      this.props.onEndEdit(this.props.id, this.state.inputText)
    }
  }

  cancelTodoEdit = () => {
    this.props.onEndEdit(this.props.id, this.props.text)
  }

  renderEdit() {
    return (
      <input
        className="edit"
        autoFocus
        value={this.state.inputText}
        onKeyDown={this.handleInputKeyDown}
        onChange={this.handleInputChange}
      />
    )
  }

  renderView() {
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.complete}
          onChange={this.toggleComplete}
        />
        <label htmlFor="toggle" onDoubleClick={this.startTodoEdit}>
          {this.props.text}
        </label>
        <button className="destroy" onClick={this.deleteTodo} />
      </div>
    )
  }

  render() {
    return (
      <li className={this.getClassName()}>
        {this.props.editing ? this.renderEdit() : this.renderView()}
      </li>
    )
  }
}

export default Todo
