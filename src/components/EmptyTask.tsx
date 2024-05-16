// icons and styles
import clipboard from "../assets/clipboard.svg"
import styles from "./EmptyTask.module.css"

export function EmptyTask() {
  return (
    <div className={styles.emptyTasks}>
      <img src={clipboard} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}