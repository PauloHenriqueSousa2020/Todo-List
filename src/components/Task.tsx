import { Check, Trash } from "phosphor-react";
import styles from "./Task.module.css";
import { TaskInterface } from "../App";

interface TaskComponentProps {
  task: TaskInterface;
  handleCompleteTask: (task: TaskInterface) => void;
  handleRemoveTask: (task: TaskInterface) => void;
}

export function Task({ task, handleCompleteTask, handleRemoveTask }: TaskComponentProps) {
  return (
    <div className={styles.task} key={task.id}>
      <div className={styles.taskWrapper}>
        <label htmlFor="checkbox" onClick={() => handleCompleteTask(task)}>
          <input readOnly type="checkbox" />
          <span className={task.completed ? `${styles.completedTaskCheckbox}` : `${styles.taskCheckbox}`}>
            {task.completed && <Check />}
          </span>
        </label>

        <p className={`${styles.taskText} ${task.completed ? `${styles.completedTaskText}` : ''}`}>{task.text}</p>
      </div>
      <button onClick={() => handleRemoveTask(task)} className={styles.removeTask}>
        <Trash size={20} />
      </button>
    </div>
  )
}