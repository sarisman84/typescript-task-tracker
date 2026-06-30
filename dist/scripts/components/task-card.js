/**
 * Task card component for rendering individual tasks in the UI.
 *
 * Provides functions to construct DOM elements representing a task with its
 * header (date), body (description/content), and footer (tags).
 */
import { addTagToTask, deleteTask, } from "../core/data management/task-data.js";
import { renderApp } from "../core/render.js";
import { htmlUtils } from "../utility/html/html-utils.js";
import stringUtils from "../utility/string-utils.js";
import { ContextMenu } from "./context-menu.js";
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
    const { id } = task;
    const card = htmlUtils.createElement("form", ["card"]);
    card.id = card.name = `card_${id}`;
    card.events.onSubmit((event) => {
        event.preventDefault();
        renderApp();
    });
    // Create card header and its related elements.
    const header = drawTaskCardHeader(task);
    //Create card body and its related elements
    const body = drawTaskCardBody(task);
    // Create card footer and its related elements.
    const footer = drawTaskCardFooter(task);
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
function drawTaskCardFooter(task) {
    const footer = htmlUtils.createElement("footer", [
        "card__footer",
    ]);
    {
        const tagElements = task.tags.map((tag, index) => {
            const element = htmlUtils.createElement("span", [
                "card__tag",
            ]);
            element.id = `card__tag-${index}`; // Use index as ID for simplicity
            element.textContent = tag.name;
            element.setAttribute("data-tag-color", tag.color);
            return element;
        });
        const createTagButton = htmlUtils.createElement("button", [
            "u-button",
            "u-button--create",
        ]);
        createTagButton.id = "card__tag--create-button";
        createTagButton.textContent = "+";
        createTagButton.events.onClick((event) => {
            event.preventDefault();
            const tags = getAvailableTags(task);
            ContextMenu.openMenu(tags, createTagButton);
        });
        footer.append(...tagElements, createTagButton);
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
        body.events.onMouseLeave(() => {
            task.description = textArea.value;
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
        const deleteButton = htmlUtils.createElement("button", [
            "u-button",
            "u-button--delete",
        ]);
        deleteButton.textContent = "Delete";
        deleteButton.id = "card__delete-button";
        deleteButton.events.onClick(() => {
            deleteTask(task.id);
        });
        header.append(dateElement, deleteButton);
    }
    return header;
}
function getAvailableTags(task) {
    console.log(`[Log][TaskCard/getAvailableTags]: Fetching available tags for task ${task.id}...`);
    return [
        {
            label: "Pending",
            event: () => {
                addTagToTask({ task, value: "Pending", color: "green" });
            },
        },
        {
            label: "In-progress",
            event: () => {
                addTagToTask({ task, value: "In-progress", color: "yellow" });
            },
        },
        {
            label: "Completed",
            event: () => {
                addTagToTask({ task, value: "Completed", color: "black" });
            },
        },
    ];
}
//# sourceMappingURL=task-card.js.map