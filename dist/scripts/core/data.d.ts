import type { TaskList } from "./data management/list-data.js";
import type { Task } from "./data management/task-data.js";
export {};
/**
 * Represents the status of a task.
 */
export type Color = "red" | "blue" | "green" | "yellow" | "purple" | "orange" | "pink" | "gray" | "black" | "white";
export type Tag = {
    name: string;
    color: Color;
    id: UUID;
};
export type UUID = string;
export declare const UUID: {
    empty: string;
    isValid(uuid: string): boolean;
    "new"(): UUID;
};
/**
 * Type for HTML elements that may be null.
 */
export type HTMLElementOrNull = HTMLLIElement | HTMLDivElement | null;
/**
 * Array to store all tasks.
 */
export declare const tasks: Task[];
export declare const taskLists: TaskList[];
export declare const app: HTMLDivElement;
//# sourceMappingURL=data.d.ts.map