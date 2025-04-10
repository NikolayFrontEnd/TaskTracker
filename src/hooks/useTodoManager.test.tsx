import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTodoManager } from './useTodoManager';

describe('useTodoManager', () => {
  it('should initialize with empty arrays', () => {
    const { result } = renderHook(() => useTodoManager());
    
    expect(result.current.todos).toEqual([]);
    expect(result.current.completedTodos).toEqual([]);
    expect(result.current.activeTodos).toEqual([]);
  });

  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodoManager());
    
    act(() => {
      result.current.addTodo('Test todo');
    });
    
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].text).toBe('Test todo');
    expect(result.current.activeTodos.length).toBe(1);
    expect(result.current.completedTodos.length).toBe(0);
  });

  it('should not add empty todos', () => {
    const { result } = renderHook(() => useTodoManager());
    
    act(() => {
      result.current.addTodo('');
    });
    
    expect(result.current.todos.length).toBe(0);
  });

  it('should toggle a todo from active to completed', () => {
    const { result } = renderHook(() => useTodoManager());
    
    act(() => {
      result.current.addTodo('Test todo');
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.toggleTodo(todoId);
    });
    
    expect(result.current.completedTodos.length).toBe(1);
    expect(result.current.activeTodos.length).toBe(0);
    expect(result.current.completedTodos[0].id).toBe(todoId);
  });

  it('should toggle a todo from completed to active', () => {
    const { result } = renderHook(() => useTodoManager());
    
    act(() => {
      result.current.addTodo('Test todo');
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.toggleTodo(todoId);
    });
    
    act(() => {
      result.current.toggleTodo(todoId);
    });
    
    expect(result.current.completedTodos.length).toBe(0);
    expect(result.current.activeTodos.length).toBe(1);
    expect(result.current.activeTodos[0].id).toBe(todoId);
  });

  it('should clear completed todos', () => {
    const { result } = renderHook(() => useTodoManager());
    
    act(() => {
      result.current.addTodo('Test todo 1');
      result.current.addTodo('Test todo 2');
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.toggleTodo(todoId);
    });
    
    act(() => {
      result.current.clearCompleted();
    });
    
    expect(result.current.completedTodos.length).toBe(0);
  });
});