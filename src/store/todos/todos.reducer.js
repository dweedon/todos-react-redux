const todoState = {
  records: [
    { text: 'Learn React', completed: false },
    { text: 'Learn Redux', completed: false },
    { text: 'Eat Breakfast', completed: true },
  ],
}

export default function todosReducer(state = todoState) {
  return state
}
