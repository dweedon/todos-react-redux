import { createTodoService } from './todoService'

describe('todoService', () => {
  let todoService

  beforeEach(() => {
    todoService = createTodoService()
  })

  it('can add and get todos', async () => {
    const todo = await todoService.addTodo('hello')
    expect(todo).toMatchObject({ text: 'hello', completed: false })
    expect(await todoService.getTodos()).toEqual([todo])
  })

  it('can delete todos', async () => {
    const todo = await todoService.addTodo('foo')
    const todo2 = await todoService.addTodo('bar')
    await todoService.deleteTodo(todo.id)

    expect(await todoService.getTodos()).toContainEqual(todo2)
    expect(await todoService.getTodos()).not.toContainEqual(todo)
  })

  it('can edit todos', async () => {
    const todo = await todoService.addTodo('foo')
    await todoService.editTodo(todo.id, { completed: true, text: 'bar' })

    expect(await todoService.getTodos()).toContainEqual({
      id: todo.id,
      completed: true,
      text: 'bar',
    })
  })
})
