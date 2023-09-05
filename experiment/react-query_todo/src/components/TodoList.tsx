import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTodo, fetchTodos } from '../api'
import { TodoCard } from './TodoCard'

export const TodoList = () => {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const {
    data: todos,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: () => fetchTodos(search),
    queryKey: ['todos', { search }],
    staleTime: Infinity,
    // cacheTime: 0,
  })

  const { mutateAsync: addTodoMutation, isLoading: addTodoLoading } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  return (
    <div>
      <div>
        <p>current search: {search}</p>
        <input type="text" ref={searchRef} />
        <button
          onClick={() => {
            if (searchRef.current) {
              const searchVal = searchRef.current.value
              setSearch(searchVal)
              searchRef.current.value = ''
            }
          }}
        >
          Search
        </button>
      </div>
      <div>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <button
          onClick={async () => {
            try {
              await addTodoMutation({ title })
              setTitle('')
            } catch (error) {
              console.error(error)
            }
          }}
        >
          Add Todo
        </button>
      </div>
      {isLoading ? (
        <div>loading todo...</div>
      ) : (
        <>{todos && todos.length ? todos.map(todo => <TodoCard key={todo.id} todo={todo} />) : <div>no data</div>}</>
      )}
      {!isLoading && isFetching && <div>check latest todos...</div>}
      {addTodoLoading && <div>push new todo...</div>}
    </div>
  )
}
