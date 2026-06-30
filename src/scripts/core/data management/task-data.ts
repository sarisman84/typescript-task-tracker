import { UUID, type Task, tasks } from "../data.js";
import { renderApp } from "../render.js";

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
    renderApp(); // Re-render the ap
  }

  console.log(`Task ${taskId} deleted successfully`);
}

// export function updateTaskStatus(description: UpdateTaskStatusDesc): void {
//   const task: Task | undefined = tasks.find((t) => t.id === description.taskId);
//   if (task === undefined) {
//     console.error(`Task with ID ${description.taskId} not found`);
//     return;
//   }
//   task.status = description.newStatus;
//   renderTasks();
// }
