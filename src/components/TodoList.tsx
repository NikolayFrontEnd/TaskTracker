import styles from './TodoList.module.css';
import { Todo } from "../hooks/useTodoManager";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  completedTodos: Todo[];
  onToggle: (id: number) => void;
  onClearCompleted?: () => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export function TodoList({ 
  todos, 
  completedTodos, 
  onToggle,
  onClearCompleted,
  activeFilter = 'All',
  onFilterChange
}: TodoListProps) {
  const itemsLeft = todos.length - completedTodos.length;
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>todos</h1>
      
      {todos.map(todo => {
        const isCompleted = completedTodos.some(item => item.id === todo.id);
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isCompleted={isCompleted}
            onToggle={onToggle}
          />
        );
      })}
      
      <div className={styles.footer}>
        <span>{itemsLeft} items left</span>
        
        <div className={styles.filters}>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'All' ? styles.filterButtonActive : ''}`}
            onClick={() => onFilterChange && onFilterChange('All')}
          >
            All
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'Active' ? styles.filterButtonActive : ''}`}
            onClick={() => onFilterChange && onFilterChange('Active')}
          >
            Active
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'Completed' ? styles.filterButtonActive : ''}`}
            onClick={() => onFilterChange && onFilterChange('Completed')}
          >
            Completed
          </button>
        </div>
        
        {completedTodos.length > 0 && (
          <button 
            className={styles.clearButton}
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}