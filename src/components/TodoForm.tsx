import { useActionState } from "react";
import styles from './TodoForm.module.css';

interface TodoFormProps {
    onAddTodo: (text: string) => void;
    onClose: () => void;
  }
  
  export function TodoForm({ onAddTodo, onClose }: TodoFormProps) {
    const action = (_: any, formData: FormData) => {
      const text = formData.get("todoName") as string;
      
      if (text && text.trim() !== '') {
        onAddTodo(text);
        onClose(); 
      }
      
      return '';
    };

  const [_, formAction] = useActionState(action, "");

  return (
    <div className={styles.overlay} onClick={onClose}>
    <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.formTitle}>Добавить новую задачу</h2>
      <form action={formAction} className={styles.form}>
        <input
          name="todoName"
          type="text"
          className={styles.input}
          placeholder="Что нужно сделать?"
          autoFocus
        />
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={onClose}
          >
            Отмена
          </button>
          <button type="submit" className={styles.submitButton}>
            Добавить
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}