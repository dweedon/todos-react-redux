import { selectTodos } from './todos.selectors'

describe('todo selectors', () => {
  it('can get all the todos', () => {
    const state = {
      todos: {
        records: [{ id: 1, text: 'hello', completed: false }],
      },
    }
    expect(selectTodos(state)).toEqual([
      { id: 1, text: 'hello', completed: false },
    ])
  })
})
