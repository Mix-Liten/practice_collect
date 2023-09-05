import { useMutation } from '@tanstack/react-query'
import { toggleTodoStatus } from '../api'
import { Todo } from '../entities/Todo'

interface TodoCardProps {
  todo: Todo
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const { mutateAsync: toggleTodoStatusMutation, isLoading } = useMutation({
    mutationFn: toggleTodoStatus,
  })

  return (
    <div className="todo-card">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={async () => {
          try {
            await toggleTodoStatusMutation({ id: todo.id })
          } catch (error) {
            console.error(error)
          }
        }}
      />
      <span>{todo.title}</span>
      {isLoading && <span> - updating...</span>}
    </div>
  )
}
