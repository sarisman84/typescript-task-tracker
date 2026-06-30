import { deleteTaskList, } from "../core/data management/list-data.js";
import { app } from "../core/data.js";
import { renderApp } from "../core/render.js";
import { htmlUtils } from "../utility/html/html-utils.js";
import stringUtils from "../utility/string-utils.js";
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
export function drawTaskList(list) {
    const ulEntry = htmlUtils.createElement("ul");
    const article = htmlUtils.createElement("article", [
        "task-list",
    ]);
    article.setAttribute("aria-labelledby", "list-name");
    const header = htmlUtils.createElement("header", [
        "task-list__header",
    ]);
    const deleteButton = htmlUtils.createElement("button", [
        "u-button",
        "u-button--delete",
    ]);
    deleteButton.textContent = "Delete";
    deleteButton.events.onClick(() => {
        deleteTaskList(list.id);
    });
    header.append(drawTitleForms(list), deleteButton);
    article.append(header);
    ulEntry.append(article);
    app.append(ulEntry);
    return article;
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
        const label = htmlUtils.createElement("label", [
            "sc-only",
        ]);
        label.textContent = "List Name";
        label.setAttribute("for", "list-name");
        const titleInput = htmlUtils.createElement("input", [
            "task-list__title",
        ]);
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
    if (stringUtils.isStringNullOrEmpty(trueValue)) {
        return;
    }
    list.name = titleInput.value;
    renderApp();
    console.log(`[Log][List/${list.id}]: Name Updated to ${list.name}`);
}
//# sourceMappingURL=task-list.js.map