import { UUID } from "../types.js";
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
export declare function createTaskList(name?: string): TaskList;
export declare function deleteTaskList(listId: string): void;
//# sourceMappingURL=list-data.d.ts.map