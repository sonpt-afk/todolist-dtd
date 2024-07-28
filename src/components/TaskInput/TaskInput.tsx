import React, { useState } from "react";
import styles from "./taskInput.module.scss";

interface TaskInputProps {
  addTodo: (name: string) => void;
}

const TaskInput = (props: TaskInputProps) => {
  const { addTodo } = props;
  const [name, setName] = useState<string>("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    addTodo(name);
    setName("");
  };
  return (
    <div>
      <h1 className={styles.title}>Todolist TS</h1>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="input a task"
          value={name}
          onChange={onChangeInput}
        />
        <button type="submit" className={styles.button}>
          ➕
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
