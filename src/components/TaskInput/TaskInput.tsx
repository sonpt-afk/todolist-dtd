import React, { useState } from "react";
import styles from "./taskInput.module.scss";
import { Todo } from "../../@types/todo.type";

interface TaskInputProps {
  addTodo: (title: string) => void;
  editTodo: (title: string) => void;
  currentTodo: Todo | null;
  finishEditTodo: () => void;
}

const TaskInput = (props: TaskInputProps) => {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props;
  const [title, setTitle] = useState<string>("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (currentTodo) {
      editTodo(value);
    } else {
      setTitle(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (currentTodo) {
      finishEditTodo();
    } else {
      addTodo(title);
      setTitle("");
    }
  };
  return (
    <div>
      <h1 className={styles.title}>Todolist TS</h1>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="input a task"
          value={currentTodo ? currentTodo.title : title}
          onChange={onChangeInput}
        />
        <button type="submit" className={styles.button}>
          {currentTodo ? "✔" : "➕"}
        </button>
      </form>
    </div>
  );
};

export default TaskInput;