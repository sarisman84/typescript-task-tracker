import { type TaskList } from "./data.js";
export interface CreateTaskListDesc {
    name: string;
}
export interface DeleteTaskListDesc {
    listId: number;
}
export interface CreateTaskDesc {
    description: string;
    listId: number;
}
export interface DeleteTaskDesc {
    taskId: number;
    updateRender: boolean;
}
/**
 * Creates a new task list with the specified name.
 * @param name - The name of the task list to create.
 */
export declare function createTaskList(description: CreateTaskListDesc): TaskList;
export declare function deleteTaskList(description: DeleteTaskListDesc): void;
/**
 * Creates a new task with the specified details.
 * @param title - The title of the task.
 * @param description - The description of the task.
 * @param listId - The ID of the list this task belongs to (default is 0).
 * @param status - The status of the task (default is "pending").
 */
export declare function createTask(description: CreateTaskDesc): void;
export declare function deleteTask(description: DeleteTaskDesc): void;
//# sourceMappingURL=tasktracker.d.ts.map