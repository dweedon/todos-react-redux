import { Record, OrderedMap } from 'immutable'
import omit from 'lodash/fp/omit'
import uuid from 'uuid'

const TodoRecord = Record({
  id: '',
  text: '',
  completed: false,
})

const createTodo = text => TodoRecord({ text, id: uuid.v4() })
const delay = n => new Promise(resolve => setTimeout(resolve, n))

export function createTodoService() {
  let todos = OrderedMap()

  return {
    async addTodo(text) {
      await delay(50)
      const todo = createTodo(text)
      todos = todos.set(todo.id, todo)
      return todo.toJS()
    },
    async deleteTodo(id) {
      await delay(50)
      todos = todos.delete(id)
    },
    async editTodo(id, updates) {
      await delay(50)

      if (!todos.has(id)) {
        const error = new Error('Not Found')
        error.status = 404
        throw error
      }

      todos = todos.mergeIn([id], omit(['id'], updates))
      return todos.get(id).toJS()
    },
    async getTodos() {
      await delay(50)
      return todos.toList().toJS()
    },
  }
}

export default createTodoService()
