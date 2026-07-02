import { type TaskList } from "../core/data management/list-data.js";
import type { Task } from "../core/data management/task-data.js";
/**
 * Renders a task list with a title form and task cards.
 *
 * Creates a `<ul>` element containing an `<article>` with:
 * - A header section with a name input form bound to the provided `TaskList`
 * - A card for each task in the provided array
 *
 * @param list - The `TaskList` object whose metadata (e.g., name) is used for the header input
 * @param tasks - The array of `Task` objects to render as cards within the list
 * @returns A populated `<ul>` element containing the rendered task list
 */
export declare function drawTaskList(list: TaskList, tasks: Task[]): {
    dropArea: HTMLElement | null;
    article: HTMLElement | null;
};
//# sourceMappingURL=task-list.d.ts.map