import { UUID, tasks } from "../data.js";
import { renderApp } from "../render.js";
export {};
/**
 * Creates a new task with the specified details.
 * @param title - The title of the task.
 * @param description - The description of the task.
 * @param listId - The ID of the list this task belongs to (default is 0).
 * @param status - The status of the task (default is "pending").
 */
export function createTask(listId) {
    const task = {
        listId: listId,
        id: crypto.randomUUID(),
        description: "",
        tags: [],
        createdAt: new Date(),
        editFlag: false,
    };
    tasks.push(task);
    console.log(`Task "${task.id}" created with ID: ${task.id} in list ID: ${task.listId}`);
    renderApp();
}
export function deleteTask(taskId, updateRender = true) {
    const foundIndex = tasks.findIndex((task) => task.id === taskId);
    if (foundIndex === -1) {
        return;
    }
    tasks.splice(foundIndex, 1); // Remove the task from the array
    if (updateRender) {
        renderApp(); // Re-render the ap
    }
    console.log(`Task ${taskId} deleted successfully`);
}
//# sourceMappingURL=task-data.js.map