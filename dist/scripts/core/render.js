import { renderContextMenu } from "../components/context-menu.js";
import { drawNewListButton } from "../components/new-list-button.js";
import { drawNewTaskButton } from "../components/new-task-button.js";
import { drawTaskCard } from "../components/task-card.js";
import { drawTaskList } from "../components/task-list.js";
import { htmlUtils } from "../utility/html/html-utils.js";
import { app, pageRoot, runtime, taskLists, tasks } from "./runtime.js";
/**
 * Renders all tasks and task lists into the application container.
 */
export function refreshAppRender() {
    if (!app) {
        throw new Error("Application container not found");
    }
    app.innerHTML = ""; // Clear the app container before rendering
    renderContextMenu();
    renderTaskboard();
    const element = drawNewListButton();
    app.append(element);
}
export function renderTaskboard() {
    taskLists.value.forEach((taskList) => {
        const taskListElement = drawTaskList(taskList);
        const relatedTasks = tasks.value.filter((task) => task.listId === taskList.id);
        relatedTasks.forEach((task) => {
            // renderRelatedTask(task, taskListElement);
            const liElement = htmlUtils.createElement("li", "task-entry");
            const card = drawTaskCard(task);
            liElement.append(card);
            taskListElement.append(liElement);
        });
        const emptyTask = drawNewTaskButton(taskList.id);
        taskListElement.append(emptyTask);
    });
}
//# sourceMappingURL=render.js.map