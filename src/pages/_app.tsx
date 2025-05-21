import { useShape } from '@electric-sql/react'

function Component() {
  const { data, error } = useShape({
    url: 'http://localhost:3000/v1/shape',
    params: {
      table: 'tasks',
      include: ['id', 'title', 'completed', 'inserted_at'],
    },
  })

  if (error) return <p>Error: {error.message}</p>

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

export default Component
