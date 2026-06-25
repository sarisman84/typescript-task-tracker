import type { TaskList, Status, Task } from "./data.js";
import { renderTasks, type TaskDesc } from "./render.js";

export interface CreateTaskListDesc extends TaskDesc {
  name: string;
}

export interface DeleteTaskListDesc extends TaskDesc {
  listId: number;
}

export interface CreateTaskDesc extends TaskDesc {
  description: string;
  status: Status;
  listId: number;
}

export interface DeleteTaskDesc extends TaskDesc {
  taskId: number;
  updateRender?: boolean;
}

export interface UpdateTaskStatusDesc extends TaskDesc {
  taskId: number;
  newStatus: Status;
}

let incrementedListId: number = 0;
let incrementedTaskId: number = 0;

/**
 * Creates a new task list with the specified name.
 * @param name - The name of the task list to create.
 */
export function createTaskList(description: CreateTaskListDesc): void {
  const taskList: TaskList = {
    id: ++incrementedListId,
    name: description.name,
    createdAt: new Date(),
  };
  description.taskLists.push(taskList);
  console.log(`Task list "${taskList.name}" created with ID: ${taskList.id}`);

  renderTasks(description);
}

export function deleteTaskList(description: DeleteTaskListDesc): void {
  const foundIndex = description.taskLists.findIndex(
    (list) => list.id === description.listId,
  );

  if (foundIndex === -1) {
    return;
  }

  const deletedListItems: number[] = description.tasks
    .filter((task) => task.listId === description.listId)
    .map((task) => task.id);

  deletedListItems.forEach((id) => {
    const deleteDesc: DeleteTaskDesc = {
      tasks: description.tasks,
      app: description.app,
      taskLists: description.taskLists,
      taskId: id,
      updateRender: false,
    };
    deleteTask(deleteDesc);
  });

  renderTasks(description);
}

/**
 * Creates a new task with the specified details.
 * @param title - The title of the task.
 * @param description - The description of the task.
 * @param listId - The ID of the list this task belongs to (default is 0).
 * @param status - The status of the task (default is "pending").
 */
export function createTask(description: CreateTaskDesc): void {
  const task: Task = {
    listId: description.listId,
    id: ++incrementedTaskId,
    description: description.description,
    status: description.status,
    createdAt: new Date(),
    editFlag: false,
  };

  description.tasks.push(task);
  console.log(
    `Task "${task.id}" created with ID: ${task.id} in list ID: ${task.listId}`,
  );

  renderTasks(description);
}

export function deleteTask(description: DeleteTaskDesc): void {
  const foundIndex = description.tasks.findIndex(
    (task) => task.id === description.taskId,
  );
  if (foundIndex === -1) {
    return;
  }

  description.tasks.splice(foundIndex, 1); // Remove the task from the array
  if (description.updateRender) {
    renderTasks(description); // Re-render the ap
  }
}

export function updateTaskStatus(description: UpdateTaskStatusDesc): void {
  const task: Task | undefined = description.tasks.find(
    (t) => t.id === description.taskId,
  );
  if (task === undefined) {
    console.error(`Task with ID ${description.taskId} not found`);
    return;
  }
  task.status = description.newStatus;
  renderTasks(description);
}
