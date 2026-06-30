import { UUID, tasks, type Color, type Tag } from "../data.js";
import { renderApp } from "../render.js";

export {};

/**
 * Represents a single task.
 */
export type Task = {
  listId: string;
  id: UUID;
  description: string;
  tags: Tag[];
  createdAt: Date;
  editFlag: boolean;
};

/**
 * Creates a new task with the specified details.
 * @param title - The title of the task.
 * @param description - The description of the task.
 * @param listId - The ID of the list this task belongs to (default is 0).
 * @param status - The status of the task (default is "pending").
 */
export function createTask(listId: UUID): void {
  const task: Task = {
    listId: listId,
    id: crypto.randomUUID(),
    description: "",
    tags: [],
    createdAt: new Date(),
    editFlag: false,
  };

  tasks.push(task);
  console.log(
    `Task "${task.id}" created with ID: ${task.id} in list ID: ${task.listId}`,
  );

  renderApp();
}

export function deleteTask(taskId: UUID, updateRender: boolean = true): void {
  const foundIndex = tasks.findIndex((task) => task.id === taskId);
  if (foundIndex === -1) {
    return;
  }

  tasks.splice(foundIndex, 1); // Remove the task from the array
  if (updateRender) {
    renderApp(); // Re-render the app
  }

  console.log(`Task ${taskId} deleted successfully`);
}

export interface AddTagDesc {
  taskId: UUID;
  value: string;
  color: Color;
  updateRender?: boolean; // Optional parameter with default value of true
}

export function addTagToTask(desc: AddTagDesc): void {
  const task = tasks.find((t) => t.id === desc.taskId);
  if (!task) {
    return;
  }

  const tag: Tag = { name: desc.value, color: desc.color, id: UUID.new() };
  task.tags.push(tag);

  if (desc.updateRender) {
    renderApp(); // Re-render the app
  }
}

export function removeTagFromTask(
  taskId: UUID,
  tagId: UUID,
  updateRender: boolean = true,
): void {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return;
  }

  const index = task.tags.findIndex((tag) => tag.id === tagId);
  if (index === -1) {
    return;
  }

  task.tags.splice(index, 1);

  if (updateRender) {
    renderApp(); // Re-render the app
  }
}
