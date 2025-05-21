import { useShape } from '@electric-sql/react'
import styles from "../styles/App.module.css"
import type { Row } from '@electric-sql/client'

interface Task extends Row {
  id: number
  title: string
  completed: boolean
  inserted_at: string
}

export default function Component() {
  const { data: tasks, error } = useShape<Task>({
    url: 'http://localhost:3000/v1/shape',
    params: {
      table: 'tasks',
      include: ['id', 'title', 'completed', 'inserted_at'] as const
    }
  })

  if (error) return <p className={styles.error}>Error: {error.message}</p>
  if (!tasks) return <p>Loading…</p>
  if (tasks.length === 0) return <p>No tasks found</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Synced Tasks</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td className={task.completed ? styles.completed : styles.pending}>
                {task.completed ? '✅ Completed' : '⏳ Pending'}
              </td>
              {/* parse the ISO date string into a JS Date */}
              <td>{new Date(task.inserted_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
