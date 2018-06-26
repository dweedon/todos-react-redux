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
          { text: action.payload, completed: false, id: state.nextId },
        ],
      }
    default:
      return state
  }
}
