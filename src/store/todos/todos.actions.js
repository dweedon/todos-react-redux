export const addTodo = payload => ({
  type: 'ADD_TODO',
  payload,
})

export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  payload: id,
})

export const setTodoComplete = (id, complete) => ({
  type: 'SET_TODO_COMPLETE',
  payload: { id, complete },
})

export const startEditTodoText = id => ({
  type: 'START_EDIT_TODO_TEXT',
  payload: { id },
})

export const endEditTodoText = (id, text) => ({
  type: 'END_EDIT_TODO_TEXT',
  payload: { id, text },
})

export const markAllComplete = () => ({
  type: 'MARK_ALL_COMPLETE',
})

export const markAllIncomplete = () => ({
  type: 'MARK_ALL_INCOMPLETE',
})
