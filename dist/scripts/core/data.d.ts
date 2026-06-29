/**
 * Represents the status of a task.
 */
export type Tag = {
    name: string;
    color: "red" | "blue" | "green" | "yellow" | "purple" | "orange" | "pink" | "gray" | "black" | "white";
};
export type UUID = string;
export declare const UUID: {
    empty: string;
    isValid(uuid: string): boolean;
    "new"(): UUID;
};
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
 * Represents a task list.
 */
export type TaskList = {
    id: UUID;
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
export declare const tasks: Task[];
export declare const taskLists: TaskList[];
export declare const app: HTMLDivElement;
//# sourceMappingURL=data.d.ts.map