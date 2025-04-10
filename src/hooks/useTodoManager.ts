import { useState } from "react";

export interface Todo {
  id: number;
  text: string;
}

export function useTodoManager() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);

  const toggleTodo = (id: number) => {
    const todoTask = todos.find(todo => todo.id === id);
    
    if (!todoTask) return;

    if (completedTodos.some(todo => todo.id === id)) {
      setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
      setActiveTodos([...activeTodos, todoTask]);
    } else {
      setCompletedTodos([...completedTodos, todoTask]);
      setActiveTodos(activeTodos.filter(todo => todo.id !== id));
    }
  };

  const addTodo = (text: string) => {
    if (!text || text.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: text,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setActiveTodos(prevActive => [...prevActive, newTodo]);
  };
  const clearCompleted = () => {
    const completedIds = completedTodos.map(todo => todo.id);
    
    setTodos(prevTodos => prevTodos.filter(todo => !completedIds.includes(todo.id)));
    
    setCompletedTodos([]);
  }
  
  return {
    todos,
    completedTodos,
    activeTodos,
    toggleTodo,
    addTodo,
    clearCompleted
  };
}