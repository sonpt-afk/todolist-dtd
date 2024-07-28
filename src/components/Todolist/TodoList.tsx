import React from "react";
import styles from "./todoList.module.scss";
import TaskList from "../TaskList/";
import TaskInput from "../TaskInput";
import { Todo } from "../../@types/todo.type";
import { useState } from "react";
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const doneTodos = todos.filter((todo) => todo.done);
  const notdoneTodos = todos.filter((todo) => !todo.done);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });
    });
  };

  const startEditTodo = (id: string) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    if (foundTodo) {
      setCurrentTodo(foundTodo);
    }
  };

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name };
      } // tra ve Todo
      return null; // tra ve null
    });
  };

  const finishEditTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === (currentTodo as Todo)?.id) {
          return currentTodo as Todo;
        }
        return todo;
      });
    });
    setCurrentTodo(null);
  };
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTodo={addTodo}
          currentTodo={currentTodo}
          editTodo={editTodo}
          finishEditTodo={finishEditTodo}
        />
        <TaskList
          todos={notdoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
        />
      </div>
    </div>
  );
};

export default TodoList;
