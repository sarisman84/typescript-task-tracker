import {
  type TaskList,
  type Task,
  taskLists,
  tasks,
} from "./data.js";
import { renderTasks } from "./render.js";

export interface CreateTaskListDesc {
  name: string;
}

export interface DeleteTaskListDesc {
  listId: number;
}

export interface CreateTaskDesc {
  description: string;
  // status: Status;
  listId: number;
}

export interface DeleteTaskDesc {
  taskId: number;
  updateRender: boolean;
}


let incrementedListId: number = 0;
let incrementedTaskId: number = 0;

/**
 * Creates a new task list with the specified name.
 * @param name - The name of the task list to create.
 */
export function createTaskList(description: CreateTaskListDesc): TaskList {
  const taskList: TaskList = {
    id: ++incrementedListId,
    name: description.name,
    createdAt: new Date(),
  };
  taskLists.push(taskList);
  console.log(`Task list "${taskList.name}" created with ID: ${taskList.id}`);

  renderTasks();

  return taskList;
}

export function deleteTaskList(description: DeleteTaskListDesc): void {
  const foundIndex = taskLists.findIndex(
    (list) => list.id === description.listId,
  );

  if (foundIndex === -1) {
    return;
  }

  const deletedListItems: number[] = tasks
    .filter((task) => task.listId === description.listId)
    .map((task) => task.id);

  deletedListItems.forEach((id) => {
    const deleteDesc: DeleteTaskDesc = {
      taskId: id,
      updateRender: false,
    };
    deleteTask(deleteDesc);
  });

  taskLists.splice(foundIndex, 1); // Remove the task from the array
  renderTasks();
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
    tags: [],
    createdAt: new Date(),
    editFlag: false,
  };

  tasks.push(task);
  console.log(
    `Task "${task.id}" created with ID: ${task.id} in list ID: ${task.listId}`,
  );

  renderTasks();
}

export function deleteTask(description: DeleteTaskDesc): void {
  const foundIndex = tasks.findIndex((task) => task.id === description.taskId);
  if (foundIndex === -1) {
    return;
  }

  tasks.splice(foundIndex, 1); // Remove the task from the array
  if (description.updateRender) {
    renderTasks(); // Re-render the ap
  }

  console.log(`Task ${description.taskId} deleted successfully`);
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
