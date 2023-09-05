import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TodoList } from './components/TodoList'
import { useState } from 'react'

const queryClient = new QueryClient()

function App() {
  const [show, setShow] = useState(true)
  return (
    <QueryClientProvider client={queryClient}>
      <button onClick={() => setShow(!show)}>toggle show demo</button>
      {show && <TodoList />}
    </QueryClientProvider>
  )
}

export default App
