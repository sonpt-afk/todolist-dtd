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

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList todos={notdoneTodos} handleDoneTodo={handleDoneTodo} />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
        />
      </div>
    </div>
  );
};

export default TodoList;
