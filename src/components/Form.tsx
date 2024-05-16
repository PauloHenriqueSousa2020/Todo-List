// icons and styles
import { PlusCircle } from "phosphor-react";
import styles from "./Form.module.css";

interface FormProps {
  handleCreateNewTask: (e: React.FormEvent<HTMLFormElement>) => void;
  text: string,
  handleChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Form({
  handleCreateNewTask,
  text,
  handleChangeText
}: FormProps) {
  return (
    <form onSubmit={handleCreateNewTask} className={styles.wrapper}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        onChange={handleChangeText}
        value={text}
      />
      <button
        type="submit">
        Criar <PlusCircle size={20} />
      </button>
    </form>
  )
}