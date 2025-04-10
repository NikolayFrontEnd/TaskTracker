import { useState } from "react";
import { TodoForm } from "./components/todoForm";
import { TodoList } from "./components/TodoList";
import { useTodoManager } from "./hooks/useTodoManager";
import './App.css'
function App() {
  const { 
    todos, 
    completedTodos, 
    activeTodos, 
    toggleTodo, 
    addTodo,
    clearCompleted 
  } = useTodoManager();
  
  const [open, setOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const openBar = () => {
    setOpen(true);
  };

  const closeBar = () => {
    setOpen(false);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredTodos = activeFilter === 'All' 
    ? todos 
    : activeFilter === 'Active' 
      ? activeTodos 
      : completedTodos;

  return (
    <div className="contain">
      <div className="todoApps">
        <TodoList 
          todos={filteredTodos}
          completedTodos={completedTodos}
          onToggle={toggleTodo}
          onClearCompleted={clearCompleted}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        {!open &&    <button onClick={openBar} className="openButton">
         +
          </button>}
        {open && <TodoForm onAddTodo={addTodo} onClose={closeBar} />}
      </div>
    </div>
  );
}

export default App;

