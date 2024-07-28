import React, { useState } from "react";
import styles from "./taskList.module.scss";
import { Todo } from "../../@types/todo.type";

interface TaskListProps {
  doneTaskList?: boolean;
  todos: Todo[];
  handleDoneTodo: (id: string, done: boolean) => void;
  startEditTodo: (id: string) => void;
  startDeleteTodo: (id: string) => void;
}

const TaskList = (props: TaskListProps) => {
  const {
    doneTaskList,
    todos,
    handleDoneTodo,
    startEditTodo,
    startDeleteTodo,
  } = props;

  return (
    <div>
      <h2 className={styles.title}>
        {doneTaskList ? "Hoàn thành" : "Chưa hoàn thành"}
      </h2>
      <h2 className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type="checkbox"
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={(e) => handleDoneTodo(todo.id, e.target.checked)}
            />
            <span
              className={`${styles.taskName} ${
                todo.done ? styles.taskNameDone : ""
              }`}
            >
              {todo.name}
            </span>
            <div className={styles.taskActions}>
              <button
                className={styles.taskBtn}
                onClick={() => {
                  startEditTodo(todo.id);
                }}
              >
                🖊
              </button>
              <button
                className={styles.taskBtn}
                onClick={() => {
                  startDeleteTodo(todo.id);
                }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </h2>
    </div>
  );
};

export default TaskList;
