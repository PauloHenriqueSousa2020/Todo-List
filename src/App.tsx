// libs
import { FormEvent, useState } from "react";

//  components
import { Header } from "./components/Header";
import { Form } from "./components/Form";

// styles and assets
import styles from "./App.module.css";
import { EmptyTask } from "./components/EmptyTask";
import { Task } from "./components/Task";

export interface TaskInterface {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
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

  function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  function handleCompleteTask(task: TaskInterface) {
    const filteredTask = tasks.map(taskItem => {
      if (taskItem.id === task.id) {
        return { ...task, completed: !task.completed }
      }

      return taskItem
    });

    setTasks(filteredTask);
  }

  function handleRemoveTask(task: TaskInterface) {
    const filteredTask = tasks.filter(taskItem => taskItem.id !== task.id);

    setTasks(filteredTask);
  }

  const completedTask = tasks.filter(task => task.completed).length;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Form
          handleCreateNewTask={handleCreateNewTask}
          text={text}
          handleChangeText={handleChangeText}
        />

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
                <Task
                  key={task.id}
                  task={task}
                  handleCompleteTask={handleCompleteTask}
                  handleRemoveTask={handleRemoveTask}
                />
              ))}
            </div>
          ) : (
            <EmptyTask />
          )}
        </div>
      </div>
    </>
  )
}

export default App
