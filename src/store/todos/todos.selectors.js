import log from '../../helpers/log'

export const selectTodos = state => state.todos.records
export const selectFilter = state => {
  switch (log(state.router.location.pathname)) {
    case '/active':
      return 'active'
    case '/completed':
      return 'completed'
    default:
      return 'none'
  }
}

const computeActiveTodos = state =>
  selectTodos(state).filter(todo => !todo.complete)
const computeCompletedTodos = state =>
  selectTodos(state).filter(todo => todo.complete)

export const computeTodos = state => {
  switch (selectFilter(state)) {
    case 'active':
      return computeActiveTodos(state)
    case 'completed':
      return computeCompletedTodos(state)
    default:
      return selectTodos(state)
  }
}

export const computeIncompleteTodoCount = state =>
  state.todos.records.filter(todo => !todo.complete).length
