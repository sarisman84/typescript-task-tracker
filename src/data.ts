/**
 * Represents the status of a task.
 */
export type Status = "pending" | "in-progress" | "completed";

/**
 * Represents a single task.
 */
export type Task = {
  listId: number;
  id: number;
  description: string;
  status: Status;
  createdAt: Date;
  editFlag: boolean;
};

/**
 * Represents a task list.
 */
export type TaskList = {
  id: number;
  name: string;
  createdAt: Date;
};

/**
 * Type for HTML elements that may be null.
 */
export type HTMLElementOrNull = HTMLLIElement | HTMLDivElement | null;

/**
 * Array to store all tasks.
 */
export const tasks: Task[] = [];
export const taskLists: TaskList[] = [];
export const app: HTMLDivElement = document.getElementById(
  "app",
) as HTMLDivElement;
