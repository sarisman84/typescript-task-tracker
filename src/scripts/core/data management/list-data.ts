import { taskLists, UUID, tasks } from "../data.js";
import { renderApp } from "../render.js";
import { deleteTask } from "./task-data.js";

export {};

/**
 * Represents a task list.
 */
export type TaskList = {
  id: UUID;
  name: string;
  createdAt: Date;
};

/**
 * Creates a new task list with the specified name.
 * @param name - The name of the task list to create.
 */
export function createTaskList(): TaskList {
  const taskList: TaskList = {
    id: crypto.randomUUID(),
    name: "",
    createdAt: new Date(),
  };
  taskLists.push(taskList);
  console.log(`Task list "${taskList.name}" created with ID: ${taskList.id}`);

  renderApp();

  return taskList;
}

export function deleteTaskList(
  listId: string,
  updateRender: boolean = true,
): void {
  const foundIndex = taskLists.findIndex((list) => list.id === listId);

  if (foundIndex === -1) {
    return;
  }

  const deletedListItems: UUID[] = tasks
    .filter((task) => task.listId === listId)
    .map((task) => task.id);

  deletedListItems.forEach((id) => {
    deleteTask(id, false);
  });

  taskLists.splice(foundIndex, 1); // Remove the task from the array
  if (updateRender) {
    renderApp();
  }
}
