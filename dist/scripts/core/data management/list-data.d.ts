import { UUID } from "../data.js";
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
export declare function createTaskList(): TaskList;
export declare function deleteTaskList(listId: string, updateRender?: boolean): void;
//# sourceMappingURL=list-data.d.ts.map