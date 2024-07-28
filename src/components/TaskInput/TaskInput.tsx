import React, { useState } from "react";
import styles from "./taskInput.module.scss";
import { Todo } from "../../@types/todo.type";

interface TaskInputProps {
  addTodo: (name: string) => void;
  editTodo: (name: string) => void;
  currentTodo: Todo | null;
  finishEditTodo: () => void;
}

const TaskInput = (props: TaskInputProps) => {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props;
  const [name, setName] = useState<string>("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (currentTodo) {
      editTodo(value);
    } else {
      setName(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (currentTodo) {
      finishEditTodo();
    } else {
      addTodo(name);
      setName("");
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
          value={currentTodo ? currentTodo.name : name}
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
