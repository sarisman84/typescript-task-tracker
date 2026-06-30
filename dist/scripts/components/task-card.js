import { deleteTask } from "../core/tasktracker.js";
import { htmlUtils } from "../utility/html/html-utils.js";
import stringUtils from "../utility/string-utils.js";
/**
 * Draws (renders) a complete task card element.
 *
 * Constructs a `<form>` element containing a header with the creation date,
 * a body with the task description, and a footer with associated tags.
 *
 * @param task - The task object to render.
 * @returns A form element representing the task card.
 */
export function drawTaskCard(task) {
    const { description, createdAt, tags, id } = task;
    const card = htmlUtils.createElement("form", ["card"]);
    card.id = card.name = `card_${id}`;
    // Create card header and its related elements.
    const header = drawTaskCardHeader(task);
    //Create card body and its related elements
    const body = drawTaskCardBody(task);
    // Create card footer and its related elements.
    const footer = drawTaskCardFooter(tags);
    card.append(header, body, footer);
    return card;
}
/**
 * Draws the footer of a task card containing tag elements.
 *
 * Creates a `<footer>` element with child `<span>` elements for each tag,
 * setting the tag name as text content and the color as a data attribute.
 *
 * @param tags - Array of tags to display in the footer.
 * @returns A footer element containing the tag spans.
 */
function drawTaskCardFooter(tags) {
    const footer = htmlUtils.createElement("footer", [
        "card__footer",
    ]);
    {
        const tagElements = tags.map((tag, index) => {
            const element = htmlUtils.createElement("span", [
                "card__tag",
            ]);
            element.id = `card__tag-${index}`; // Use index as ID for simplicity
            element.textContent = tag.name;
            element.setAttribute("data-tag-color", tag.color);
            return element;
        });
        footer.append(...tagElements);
    }
    return footer;
}
/**
 * Draws the body of a task card containing the description.
 *
 * Creates a `<div>` with a label and a textarea element for displaying
 * and potentially editing the task description.
 *
 * @param description - The text content to display in the body.
 * @returns A body div element containing the label and textarea.
 */
function drawTaskCardBody(task) {
    const body = htmlUtils.createForm(["card__body"]);
    {
        const label = htmlUtils.createElement("label", [
            "sc-only",
        ]);
        label.id = "task-card__label";
        label.textContent = "Description";
        const textArea = htmlUtils.createElement("textarea", [
            "card__content",
        ]);
        textArea.id = "card__content";
        textArea.placeholder = "Describe your task...";
        textArea.value = task.description;
        textArea.rows = 5;
        label.setAttribute("for", "card__content");
        body.append(label, textArea);
        body.events.onSubmit((event) => {
            event.preventDefault();
            task.description = textArea.value;
        });
        body.events.onKeyDown((event) => {
            if (event.shiftKey || event.key != "Enter") {
                return;
            }
            task.description = textArea.value;
            textArea.blur();
        });
    }
    return body;
}
/**
 * Draws the header of a task card containing the creation date and context menu.
 *
 * Creates a `<header>` element with a paragraph showing the formatted
 * creation date and a context menu button for actions like deletion.
 *
 * @param task - The task object containing creation date information.
 * @returns A header element containing the date and context menu.
 */
function drawTaskCardHeader(task) {
    const header = htmlUtils.createElement("header", [
        "card__header",
    ]);
    {
        header.id = "card__header";
        const dateElement = htmlUtils.createElement("p", [
            "card__date",
        ]);
        dateElement.id = "card__date";
        dateElement.textContent = stringUtils.formatDate(task.createdAt);
        //TODO: Figure out how to make context menus work properly. This is a placeholder for now.
        // const contextMenuOptions: HTMLContextMenuOption[] = [
        //   { name: "Delete", selectEvent: () => {} },
        // ];
        // const contextMenu: HTMLButtonElement = htmlUtils.createContextMenu(
        //   contextMenuOptions,
        //   "card__context-menu",
        //   { button: ["card__context-menu"], menu: [], options: [] },
        // );
        const deleteButton = htmlUtils.createElement("button", [
            "u-button",
            "u-button--delete",
        ]);
        deleteButton.textContent = "Delete";
        deleteButton.id = "card__delete-button";
        // deleteButton.addEventListener("click", () => {
        //   deleteTask(task.id);
        // });
        deleteButton.events.onClick(() => {
            deleteTask(task.id);
        });
        header.append(dateElement, deleteButton);
    }
    return header;
}
//# sourceMappingURL=task-card.js.map