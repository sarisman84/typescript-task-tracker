/**
 * Task card component for rendering individual tasks in the UI.
 *
 * Provides functions to construct DOM elements representing a task with its
 * header (date), body (description/content), and footer (tags).
 */
import type { Tag, Task } from "../core/data.js";
/** Data structure describing the content rendered in a task card. */
export type DrawTaskCardDesc = {
    /** The description or content of the task. */
    content: string;
    /** Associated tags for the task. */
    tags: Tag[];
    /** The creation date of the task. */
    date: Date;
    /** Unique identifier for the task. */
    id: string;
};
/**
 * Draws (renders) a complete task card element.
 *
 * Constructs a `<form>` element containing a header with the creation date,
 * a body with the task description, and a footer with associated tags.
 *
 * @param task - The task object to render.
 * @returns A form element representing the task card.
 */
export declare function drawTaskCard(task: Task): HTMLFormElement;
//# sourceMappingURL=task-card.d.ts.map