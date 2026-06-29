import { drawNewListButton } from "../components/new-list-button.js";
import { drawNewTaskButton } from "../components/new-task-button.js";
import { drawTaskCard } from "../components/task-card.js";
import { drawTaskList } from "../components/task-list.js";
import { htmlUtils } from "../utility/html-utils.js";
import { app, taskLists, tasks } from "./data.js";
export function renderEmptyState(fullClear = false) {
    if (fullClear) {
        app.innerHTML = "";
    }
    const element = drawNewListButton();
    app.append(element);
}
/**
 * Renders all tasks and task lists into the application container.
 */
export function renderApp() {
    app.innerHTML = ""; // Clear the app container before rendering
    taskLists.forEach((taskList) => {
        const taskListElement = drawTaskList(taskList);
        const relatedTasks = tasks.filter((task) => task.listId === taskList.id);
        relatedTasks.forEach((task) => {
            // renderRelatedTask(task, taskListElement);
            const liElement = htmlUtils.createElement("li", []);
            const card = drawTaskCard(task);
            liElement.append(card);
            taskListElement.append(liElement);
        });
        const emptyTask = drawNewTaskButton(taskList.id);
        taskListElement.append(emptyTask);
    });
    const element = drawNewListButton();
    app.append(element);
}
//# sourceMappingURL=render.js.map