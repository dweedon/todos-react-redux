const todoState = {
  nextId: 1,
  records: [],
}

export default function todosReducer(state = todoState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        nextId: state.nextId + 1,
        records: [
          ...state.records,
          {
            id: state.nextId,
            text: action.payload,
            complete: false,
            editing: false,
          },
        ],
      }
    case 'SET_TODO_COMPLETE':
      return {
        ...state,
        records: state.records.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, complete: action.payload.complete }
          }

          return todo
        }),
      }
    case 'START_EDIT_TODO_TEXT':
      return {
        ...state,
        records: state.records.map(todo => {
          if (todo.editing) {
            return { ...todo, editing: false }
          }
          if (todo.id === action.payload.id) {
            return { ...todo, editing: true }
          }

          return todo
        }),
      }
    case 'END_EDIT_TODO_TEXT':
      return {
        ...state,
        records: state.records.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.text, editing: false }
          }

          return todo
        }),
      }
    case 'DELETE_TODO':
      return {
        ...state,
        records: state.records.filter(todo => todo.id !== action.payload),
      }
    case 'MARK_ALL_COMPLETE':
      return {
        ...state,
        records: state.records.map(todo => ({ ...todo, complete: true })),
      }
    case 'MARK_ALL_INCOMPLETE':
      return {
        ...state,
        records: state.records.map(todo => ({ ...todo, complete: false })),
      }
    default:
      return state
  }
}
