import { addTodo, setComplete } from './todos.actions'
import { selectTodos } from './todos.selectors'
import configureStore from '../../configureStore'
import todosReducer from './todos.reducer'

describe('todo reducer', () => {
  it('can add a todo', () => {
    const state = {
      nextId: 1,
      records: [],
    }

    expect(todosReducer(state, addTodo('hello')).records).toEqual([
      {
        text: 'hello',
        id: 1,
        completed: false,
      },
    ])
  })

  it('can mark a todo complete without mutating it', () => {
    const state = {
      nextId: 1,
      records: [
        {
          text: 'hello',
          id: 1,
          completed: false,
        },
      ],
    }

    const result = todosReducer(state, setComplete(1, true)).records[0]

    expect(result.completed).toEqual(true)
    expect(result).not.toBe(state.records[0])
  })

  it('can really add a todo', async () => {
    const store = configureStore()

    await store.dispatch(addTodo('hello'))
    expect(selectTodos(store.getState())).toEqual([
      {
        text: 'hello',
        id: 1,
        completed: false,
      },
    ])
  })
})
