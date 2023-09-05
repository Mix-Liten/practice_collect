import { Todo } from '../entities/Todo'

const todos = [
  { id: 0, title: 'Learn HTML', completed: false },
  { id: 1, title: 'Learn CSS', completed: false },
  { id: 2, title: 'Learn JavaScript', completed: false },
  { id: 3, title: 'Learn React', completed: false },
  { id: 4, title: 'Learn Next.js', completed: false },
]

export const fetchTodos = async (query = ''): Promise<Todo[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))

  return [...filteredTodos]
}

export const addTodo = async (todo: Pick<Todo, 'title'>): Promise<Todo> => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const newTodo = new Todo(todos.length, todo.title)

  todos.push(newTodo)

  return newTodo
}

export const toggleTodoStatus = async (todo: Pick<Todo, 'id'>): Promise<Todo> => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const thisTodo = todos[todo.id]

  thisTodo.completed = !thisTodo.completed

  return thisTodo
}
