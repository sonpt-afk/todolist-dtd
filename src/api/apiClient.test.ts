/// <reference types="jest" />
import apiClient from "./apiClient";
import { Todo } from "../@types/todo.type";

describe("JSONPlaceholder API Integration Tests", () => {
  it("should fetch all todos", async () => {
    const response = await apiClient.get<Todo[]>("/todos");
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });

  it("should create a new todo", async () => {
    const newTodo = {
      title: "My new task",
      completed: false,
      userId: 1,
    };
    const response = await apiClient.post<Todo>("/todos", newTodo);
    expect(response.status).toBe(201);
    expect(response.data.title).toBe(newTodo.title);
    expect(response.data.completed).toBe(newTodo.completed);
    expect(response.data.userId).toBe(newTodo.userId);
    expect(response.data.id).toBeDefined();
  });

  it("should update a todo", async () => {
    const updatedTodo = {
      title: "My updated task",
      completed: true,
    };
    const response = await apiClient.put<Todo>("/todos/1", updatedTodo);
    expect(response.status).toBe(200);
    expect(response.data.title).toBe(updatedTodo.title);
    expect(response.data.completed).toBe(updatedTodo.completed);
  });

  it("should delete a todo", async () => {
    const response = await apiClient.delete("/todos/1");
    expect(response.status).toBe(200);
  });
});
