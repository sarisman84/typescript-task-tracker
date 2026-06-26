import { type Task } from "./data.js";
export declare function renderDefaultState(fullClear?: boolean): void;
/**
 * Renders all tasks and task lists into the application container.
 */
export declare function renderTasks(): void;
/**
 * Renders a single task within a task list.
 * @param relatedTask - The task to render.
 * @param taskListElement - The HTML element representing the parent task list.
 */
export declare function renderRelatedTask(relatedTask: Task, taskListElement: HTMLUListElement): void;
//# sourceMappingURL=render.d.ts.map