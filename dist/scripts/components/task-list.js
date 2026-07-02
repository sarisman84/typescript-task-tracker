import { deleteTaskList, } from "../core/data management/list-data.js";
import { app, runtime } from "../core/runtime.js";
import { htmlUtils } from "../utility/html/html-utils.js";
import stringUtils from "../utility/string-utils.js";
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
        return null;
    }
    const root = htmlUtils.createElement("article", "category");
    const wrapper = htmlUtils.createElement("div", "category__wrapper", ["category"]);
    root.setAttribute("aria-labelledby", "list-name");
    root.append(wrapper);
    wrapper.append(drawTaskListHeader(list));
    const unorderedList = htmlUtils.createElement("ul", "category__collection", ["category__collection"]);
    unorderedList.setAttribute("data-id", list.id);
    drawRelatedTaskCards(list, tasks, unorderedList, root);
    wrapper.append(unorderedList);
    wrapper.append(drawNewTaskButton(list.id));
    app.append(root);
    return root;
}
function drawRelatedTaskCards(list, tasks, listElement, root) {
    const entries = [];
    tasks.forEach((task, index) => {
        // renderRelatedTask(task, taskListElement);
        const entryElement = htmlUtils.createElement("li", "category__entry");
        entryElement.setAttribute("data-id", task.id);
        const { card, grabber } = drawTaskCard(task);
        entryElement.append(card);
        entries.push({ card: entryElement, grabber });
        if (index !== tasks.length - 1) {
            const divider = htmlUtils.createElement("div", "category__entry-divider", ["category__entry-divider"]);
            entryElement.append(divider);
        }
        listElement.append(entryElement);
    });
}
function drawTaskListHeader(list) {
    const header = htmlUtils.createElement("header", "category__header", ["category__header"]);
    header.oncontextmenu = (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevents the event from bubbling up to parent elements
        drawListContextMenu(list, event);
    };
    const contextMenu = htmlUtils.createElement("button", "category__context-menu", ["u-icon", "fa-ellipsis-vertical", "fa-solid"]);
    contextMenu.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        drawListContextMenu(list, contextMenu);
    };
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
        titleForms.onsubmit = (event) => {
            event.preventDefault();
            updateListName(titleInput, list);
        };
        titleForms.onmouseleave = () => {
            updateListName(titleInput, list);
        };
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