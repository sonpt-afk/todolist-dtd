import React, { useEffect, useState } from "react";
import styles from "./todoList.module.scss";
import TaskList from "../TaskList/";
import TaskInput from "../TaskInput";
import { Todo } from "../../@types/todo.type";
import apiClient from "../../api/apiClient";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await apiClient.get<Todo[]>("/todos?_limit=10");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const doneTodos = todos.filter((todo) => todo.completed);
  const notdoneTodos = todos.filter((todo) => !todo.completed);

  const addTodo = async (title: string) => {
    try {
      const response = await apiClient.post<Todo>("/todos", {
        title,
        completed: false,
        userId: 1,
      });
      setTodos((prevTodos) => [response.data, ...prevTodos]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDoneTodo = async (id: number, completed: boolean) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, completed };

    try {
      await apiClient.put(`/todos/${id}`, updatedTodo);
      setTodos((prev) => {
        return prev.map((todo) => {
          if (todo.id === id) {
            return updatedTodo;
          }
          return todo;
        });
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const startEditTodo = (id: number) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    if (foundTodo) {
      setCurrentTodo(foundTodo);
    }
  };

  const editTodo = (title: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, title };
      }
      return null;
    });
  };

  const finishEditTodo = async () => {
    if (currentTodo) {
      try {
        await apiClient.put(`/todos/${currentTodo.id}`, {
          title: currentTodo.title,
        });
        setTodos((prev) => {
          return prev.map((todo) => {
            if (todo.id === currentTodo.id) {
              return currentTodo;
            }
            return todo;
          });
        });
        setCurrentTodo(null);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const startDeleteTodo = async (id: number) => {
    try {
      await apiClient.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
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
          startDeleteTodo={startDeleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          startDeleteTodo={startDeleteTodo}
        />
      </div>
    </div>
  );
};

export default TodoList;