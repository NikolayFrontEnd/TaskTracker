import styles from './TodoItem.module.css';
import { Todo } from "../hooks/useTodoManager";

interface TodoItemProps {
  todo: Todo;
  isCompleted: boolean;
  onToggle: (id: number) => void;
}

export function TodoItem({ todo, isCompleted, onToggle }: TodoItemProps) {
  return (
    <div className={styles.todoItem}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isCompleted}
        onChange={() => onToggle(todo.id)}
      />
      <span className={`${styles.todoText} ${isCompleted ? styles.completed : ''}`}>
        {todo.text}
      </span>
    </div>
  );
}