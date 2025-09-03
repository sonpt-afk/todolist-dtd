import React from "react";
import styles from "./taskList.module.scss";
import { Todo } from "../../@types/todo.type";

interface TaskListProps {
  doneTaskList?: boolean;
  todos: Todo[];
  handleDoneTodo: (id: number, completed: boolean) => void;
  startEditTodo: (id: number) => void;
  startDeleteTodo: (id: number) => void;
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
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type="checkbox"
              className={styles.taskCheckbox}
              checked={todo.completed}
              onChange={(e) => handleDoneTodo(todo.id, e.target.checked)}
            />
            <span
              className={`${styles.taskName} ${
                todo.completed ? styles.taskNameDone : ""
              }`}
            >
              {todo.title}
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
      </div>
    </div>
  );
};

export default TaskList;