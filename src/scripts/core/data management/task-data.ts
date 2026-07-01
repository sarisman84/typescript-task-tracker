import { UUID, type Color, type Tag } from "../types.js";
import { tasks } from "../runtime.js";

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
}

export function deleteTask(taskId: UUID): void {
  const foundIndex = tasks.findIndex((task) => task.id === taskId);
  if (foundIndex === -1) {
    return;
  }

  tasks.splice(foundIndex, 1); // Remove the task from the array

  console.log(`Task ${taskId} deleted successfully`);
}

export interface AddTagDesc {
  task: Task;
  value: string;
  color: Color;
}

export function addTagToTask(desc: AddTagDesc): void {
  const tag: Tag = { name: desc.value, color: desc.color, id: UUID.new() };
  desc.task.tags.push(tag);

  console.log(`[Log][Task/${desc.task.id}]: Added tag ${tag.id}/${tag.name}!`);
}

export function removeTagFromTask(task: Task, tagId: UUID): void {
  const index = task.tags.findIndex((tag) => tag.id === tagId);
  if (index === -1) {
    return;
  }

  task.tags.splice(index, 1);

  console.log(`[Log][Task/${task.id}]: Removed tag ${tagId}!`);
}
