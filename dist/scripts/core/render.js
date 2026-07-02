import { applyDraggableBehaviour, } from "../behaviours/drag-and-drop.js";
import { renderContextMenu } from "../components/context-menu.js";
import { drawNewListButton } from "../components/new-list-button.js";
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
    const collections = [];
    taskLists.value.forEach((taskList) => {
        const relatedTasks = tasks.value.filter((task) => task.listId === taskList.id);
        const categoryElement = drawTaskList(taskList, relatedTasks);
        if (!categoryElement) {
            return;
        }
        const collection = categoryElement.querySelector("#category__collection");
        collections.push({ collection, id: taskList.id });
    });
    collections.forEach((entry) => {
        const { collection, id } = entry;
        const cards = htmlUtils.querySelectorAll("#category__entry", collection);
        const desc = {
            collections: collections.map((c) => c.collection),
            entries: cards.map((card) => {
                return {
                    card: card,
                    grabber: card.querySelector("#task-card__grabber"),
                };
            }),
            listId: id,
        };
        applyDraggableBehaviour(desc);
    });
}
//# sourceMappingURL=render.js.map