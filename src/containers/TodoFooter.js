import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React from 'react'
import compose from 'lodash/fp/flowRight'

import { clearCompletedTodos } from '../store/todos/todos.actions'
import { computeIncompleteTodoCount } from '../store/todos/todos.selectors'
import FilterLink from '../components/FilterLink'

class TodoFooter extends React.Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.incompleteTodoCount} items left</strong>
        </span>
        <ul className="filters">
          <FilterLink to="/">All</FilterLink>
          <FilterLink to="/active">Active</FilterLink>
          <FilterLink to="/completed">Completed</FilterLink>
        </ul>
        <button
          className="clear-completed"
          onClick={this.props.clearCompletedTodos}
        >
          Clear completed
        </button>
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  incompleteTodoCount: computeIncompleteTodoCount(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearCompletedTodos,
    },
    dispatch,
  )

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TodoFooter)
