/**
 * Task card component for rendering individual tasks in the UI.
 *
 * Provides functions to construct DOM elements representing a task with its
 * header (date), body (description/content), and footer (tags).
 */
import { addTagToTask, deleteTask, removeTagFromTask, } from "../core/data management/task-data.js";
import { runtime } from "../core/runtime.js";
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
    const card = htmlUtils.createElement("form", `card_${id}`, [
        "card",
    ]);
    card.name = card.id;
    card.events.onSubmit((event) => {
        event.preventDefault();
        runtime.saveDataAndRefreshAppRenderer();
    });
    card.events.onContextMenu((event) => {
        event.preventDefault();
        drawTaskContextMenu(task, event);
    });
    // Create card header and its related elements.
    const { header, grabber } = drawTaskCardHeader(task, card);
    //Create card body and its related elements
    const body = drawTaskCardBody(task);
    // Create card footer and its related elements.
    const footer = drawTaskCardFooter(task);
    card.append(header, body, footer);
    return { card, grabber };
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
    const footer = htmlUtils.createElement("footer", "task-card__footer", ["card__footer"]);
    {
        const tagElements = task.tags.map((tag, index) => {
            const element = htmlUtils.createElement("span", `card__tag-${index}`, ["card__tag"]);
            element.textContent = tag.name;
            element.setAttribute("data-tag-color", tag.color);
            element.events.onContextMenu((event) => {
                event.preventDefault();
                event.stopPropagation();
                const options = [
                    {
                        label: "Delete Tag",
                        event: () => {
                            removeTagFromTask(task, tag.id); // Implement this function
                        },
                    },
                ];
                ContextMenu.openMenu(options, event);
            });
            return element;
        });
        const createTagButton = htmlUtils.createElement("button", "task-card__tag--create-button", ["u-icon", "fa-square-plus", "fa-regular"]);
        createTagButton.events.onClick((event) => {
            event.preventDefault();
            const tags = getAvailableTags(task);
            ContextMenu.openMenu(tags, createTagButton);
            console.log(`[Log][TaskCard/drawTaskCardFooter/createTagButton]: Opened context menu for task ${task.id} with tags: ${tags.map((tag) => tag.label)}`);
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
    const body = htmlUtils.createForm("task-card__content", [
        "card__body",
    ]);
    {
        const textArea = drawContentTextArea(task, body);
        // Add event listeners to handle saving the description on submit, keydown, and mouse leave events.
        registerBodyEventListeners(body, task, textArea);
    }
    return body;
}
function drawContentTextArea(task, body) {
    const label = htmlUtils.createElement("label", "task-card__label", ["sc-only"]);
    label.textContent = "Description";
    const textArea = htmlUtils.createElement("textarea", "task-card__description", ["card__content"]);
    // Set attributes and initial value for the textarea
    {
        textArea.id = "card__content";
        textArea.placeholder = "Describe your task...";
        textArea.value = task.description;
        textArea.rows = 5;
        label.setAttribute("for", "card__content");
        body.append(label, textArea);
    }
    return textArea;
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
function drawTaskCardHeader(task, card) {
    const header = htmlUtils.createElement("header", "task-card__header", ["card__header"]);
    const grabber = htmlUtils.createElement("button", "task-card__grabber", ["card__grabber", "u-icon", "fa-solid", "fa-grip"]);
    header.id = "card__header";
    const dateElement = htmlUtils.createElement("p", "task-card__date", ["card__date"]);
    dateElement.textContent = stringUtils.formatDate(task.createdAt);
    const contextMenuButton = htmlUtils.createElement("button", "task-card__context-menu-button", ["card__context-menu", "u-icon", "fa-solid", "fa-ellipsis-vertical"]);
    contextMenuButton.events.onClick((event) => {
        event.preventDefault();
        drawTaskContextMenu(task, contextMenuButton);
    });
    header.append(dateElement, grabber, contextMenuButton);
    return { header, grabber };
}
function drawTaskContextMenu(task, position) {
    const options = [
        {
            label: "Delete Task",
            event: () => {
                deleteTask(task.id);
                runtime.saveDataAndRefreshAppRenderer();
            },
        },
    ];
    ContextMenu.openMenu(options, position);
}
function registerBodyEventListeners(body, task, textArea) {
    {
        body.events.onSubmit((event) => {
            event.preventDefault();
            task.description = textArea.value;
            runtime.saveDataAndRefreshAppRenderer();
        });
        body.events.onKeyDown((event) => {
            if (event.shiftKey || event.key != "Enter") {
                return;
            }
            task.description = textArea.value;
            textArea.blur();
            runtime.saveDataAndRefreshAppRenderer();
        });
        body.events.onMouseLeave(() => {
            if (task.description === textArea.value) {
                return;
            }
            task.description = textArea.value;
            runtime.saveDataAndRefreshAppRenderer();
        });
    }
}
function getAvailableTags(task) {
    console.log(`[Log][TaskCard/getAvailableTags]: Fetching available tags for task ${task.id}...`);
    function optionEvent(label, color) {
        const result = {
            label,
            event: () => {
                console.log(`[Log][TaskCard/getAvailableTags/optionEvent]: Adding tag "${label}" to task ${task.id}...`);
                addTagToTask({ task, value: label, color });
                runtime.saveDataAndRefreshAppRenderer();
            },
        };
        return result;
    }
    return [
        optionEvent("Pending", "red"),
        optionEvent("In Progress", "blue"),
        optionEvent("Completed", "green"),
    ];
}
let draggedElement = null; // Track the dragged element
//# sourceMappingURL=task-card.js.map