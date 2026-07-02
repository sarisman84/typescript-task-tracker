import { deleteTaskList, } from "../core/data management/list-data.js";
import { app, runtime } from "../core/runtime.js";
import { htmlUtils } from "../utility/html/html-utils.js";
import stringUtils from "../utility/string-utils.js";
import { applyDraggableBehavior } from "../behaviours/drag-and-drop.js";
import { ContextMenu } from "./context-menu.js";
import { drawNewTaskButton } from "./new-task-button.js";
import { drawTaskCard } from "./task-card.js";
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
export function drawTaskList(list, tasks) {
    if (!app) {
        console.error(`[Error]: App container not found. Cannot render task list.`);
        return { dropArea: null, article: null }; // Return an empty div to avoid further errors
    }
    const article = htmlUtils.createElement("article", "category");
    const wrapper = htmlUtils.createElement("div", "category__wrapper", ["category"]);
    article.setAttribute("data-id", list.id);
    article.setAttribute("aria-labelledby", "list-name");
    article.append(wrapper);
    wrapper.append(drawTaskListHeader(list));
    const dropArea = htmlUtils.createElement("div", "category__drop-area", ["category__drop-area", "fa-box-tissue", "fa-solid"]);
    const unorderedList = htmlUtils.createElement("ul", "category__collection", ["category__collection"]);
    drawRelatedTaskCards(list, tasks, unorderedList, dropArea);
    wrapper.append(unorderedList);
    wrapper.append(dropArea);
    wrapper.append(drawNewTaskButton(list.id));
    app.append(article);
    return { dropArea, article };
}
function drawRelatedTaskCards(list, tasks, article, dropArea) {
    tasks.forEach((task) => {
        // renderRelatedTask(task, taskListElement);
        const liElement = htmlUtils.createElement("li", "task-entry");
        liElement.setAttribute("data-task-id", task.id);
        liElement.setAttribute("data-list-id", task.listId);
        const { card, grabber } = drawTaskCard(task);
        applyDraggableBehavior(task, list, dropArea, card, grabber);
        liElement.append(card);
        article.append(liElement);
    });
}
function drawTaskListHeader(list) {
    const header = htmlUtils.createElement("header", "category__header", ["category__header"]);
    header.events.onContextMenu((event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevents the event from bubbling up to parent elements
        drawListContextMenu(list, event);
    });
    const contextMenu = htmlUtils.createElement("button", "category__context-menu", ["u-icon", "fa-ellipsis-vertical", "fa-solid"]);
    contextMenu.events.onClick((event) => {
        event.preventDefault();
        event.stopPropagation();
        drawListContextMenu(list, contextMenu);
    });
    header.append(drawTitleForms(list), contextMenu);
    return header;
}
function drawListContextMenu(list, position) {
    const options = [
        {
            label: "Delete List",
            event: () => {
                deleteTaskList(list.id);
                runtime.saveDataAndRefreshAppRenderer();
            },
        },
    ];
    ContextMenu.openMenu(options, position);
}
/**
 * Draws a form containing a label and input for editing the list title.
 *
 * Creates a small form with:
 * - A "List Name" label linked to an input element by ID
 * - An input field with id "list-name" that can be referenced for accessibility
 *
 * @returns A `<form>` element containing the title label and input
 */
function drawTitleForms(list) {
    const titleForms = htmlUtils.createElement("form");
    {
        const label = htmlUtils.createElement("label", "category__title-label", ["sc-only"]);
        label.textContent = "List Name";
        label.setAttribute("for", "list-name");
        const titleInput = htmlUtils.createElement("input", "category__title", ["category__title"]);
        titleInput.type = "text";
        titleInput.id = titleInput.name = "list-name";
        titleInput.value = list.name;
        titleInput.placeholder = "New List";
        titleForms.events.onSubmit((event) => {
            event.preventDefault();
            updateListName(titleInput, list);
        });
        titleForms.events.onMouseLeave(() => {
            updateListName(titleInput, list);
        });
        titleForms.append(label, titleInput);
    }
    return titleForms;
}
function updateListName(titleInput, list) {
    const trueValue = titleInput.value.trim();
    if (stringUtils.isStringNullOrEmpty(trueValue) ||
        titleInput.value === list.name) {
        return;
    }
    list.name = titleInput.value;
    runtime.saveDataAndRefreshAppRenderer();
    console.log(`[Log][List/${list.id}]: Name Updated to ${list.name}`);
}
//# sourceMappingURL=task-list.js.map