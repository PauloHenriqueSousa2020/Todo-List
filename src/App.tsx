// libs
import { FormEvent, useState } from "react";
import { Check, PlusCircle, Trash } from "phosphor-react";

//  components
import { Header } from "./components/Header";

// styles and assets
import clipboard from "./assets/clipboard.svg"
import styles from "./App.module.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');

  function handleCreateNewTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTasks([{
      id: tasks.length + 1,
      text,
      completed: false
    }, ...tasks]);

    setText("")
  }

  function handleCompleteTask(task: Task) {
    const filteredTask = tasks.map(taskItem => {
      if (taskItem.id === task.id) {
        return { ...task, completed: !task.completed }
      }

      return taskItem
    });

    setTasks(filteredTask);
  }

  function handleRemoveTask(task: Task) {
    const filteredTask = tasks.filter(taskItem => taskItem.id !== task.id);

    setTasks(filteredTask);
  }

  const completedTask = tasks.filter(task => task.completed).length;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleCreateNewTask} className={styles.wrapper}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button
            type="submit">
            Criar <PlusCircle size={20} />
          </button>
        </form>
        <div className={styles.content}>
          <div className={styles.tasksContent}>
            <label className={styles.createdTasks}>
              Tarefas criadas
              <span>{tasks.length}</span>
            </label>
            <label className={styles.completedTasks}>
              Concluídas
              <span>{completedTask}</span>
            </label>
          </div>

          {tasks.length > 0 ? (
            <div className={styles.taskContainer}>
              {tasks.map(task => (
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
              ))}
            </div>
          ) : (
            <div className={styles.emptyTasks}>
              <img src={clipboard} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
