import { UUID } from "../types.js";
import { taskLists, tasks } from "../runtime.js";
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
export function createTaskList(name: string = ""): TaskList {
  const taskList: TaskList = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: new Date(),
  };
  taskLists.value.push(taskList);
  console.log(`Task list "${taskList.name}" created with ID: ${taskList.id}`);

  return taskList;
}

export function deleteTaskList(listId: string): void {
  const foundIndex = taskLists.value.findIndex((list) => list.id === listId);

  if (foundIndex === -1) {
    return;
  }

  const deletedListItems: UUID[] = tasks.value
    .filter((task) => task.listId === listId)
    .map((task) => task.id);

  deletedListItems.forEach((id) => {
    deleteTask(id);
  });

  taskLists.value.splice(foundIndex, 1); // Remove the task from the array
}
