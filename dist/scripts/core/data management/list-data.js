import { UUID } from "../types.js";
import { taskLists, tasks } from "../runtime.js";
import { deleteTask } from "./task-data.js";
export {};
/**
 * Creates a new task list with the specified name.
 * @param name - The name of the task list to create.
 */
export function createTaskList(name = "") {
    const taskList = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: new Date(),
    };
    taskLists.value.push(taskList);
    console.log(`Task list "${taskList.name}" created with ID: ${taskList.id}`);
    return taskList;
}
export function deleteTaskList(listId) {
    const foundIndex = taskLists.value.findIndex((list) => list.id === listId);
    if (foundIndex === -1) {
        return;
    }
    const deletedListItems = tasks.value
        .filter((task) => task.listId === listId)
        .map((task) => task.id);
    deletedListItems.forEach((id) => {
        deleteTask(id);
    });
    taskLists.value.splice(foundIndex, 1); // Remove the task from the array
}
//# sourceMappingURL=list-data.js.map