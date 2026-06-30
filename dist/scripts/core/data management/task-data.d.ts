import { UUID, type Color, type Tag } from "../data.js";
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
export declare function createTask(listId: UUID): void;
export declare function deleteTask(taskId: UUID, updateRender?: boolean): void;
export interface AddTagDesc {
    taskId: UUID;
    value: string;
    color: Color;
    updateRender?: boolean;
}
export declare function addTagToTask(desc: AddTagDesc): void;
export declare function removeTagFromTask(taskId: UUID, tagId: UUID, updateRender?: boolean): void;
//# sourceMappingURL=task-data.d.ts.map