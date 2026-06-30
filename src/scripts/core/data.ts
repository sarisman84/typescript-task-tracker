import stringUtils from "../utility/string-utils.js";
import type { TaskList } from "./data management/list-data.js";
import type { Task } from "./data management/task-data.js";

export {};

/**
 * Represents the status of a task.
 */

export type Color =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "orange"
  | "pink"
  | "gray"
  | "black"
  | "white";

export type Tag = {
  name: string;
  color: Color;
  id: UUID;
};

export type UUID = string;
export const UUID = {
  empty: "00000000-0000-0000-0000-000000000000",
  isValid(uuid: string): boolean {
    return (
      uuid.length === 36 &&
      !stringUtils.isStringNullOrEmpty(uuid) &&
      !uuid.match(this.empty)
    );
  },

  new(): UUID {
    return crypto.randomUUID(); // TODO: Use a proper UUID generator library like 'uuid' or 'nanoid' instead of crypto.randomUUID() for better compatibility and performance.
  },
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
