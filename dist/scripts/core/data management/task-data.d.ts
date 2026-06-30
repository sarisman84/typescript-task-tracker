import { UUID } from "../data.js";
/**
 * Creates a new task with the specified details.
 * @param title - The title of the task.
 * @param description - The description of the task.
 * @param listId - The ID of the list this task belongs to (default is 0).
 * @param status - The status of the task (default is "pending").
 */
export declare function createTask(listId: UUID): void;
export declare function deleteTask(taskId: UUID, updateRender?: boolean): void;
//# sourceMappingURL=task-data.d.ts.map