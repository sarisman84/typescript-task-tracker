import { app, type Task, type TaskList } from "../core/data.js";
import { renderApp } from "../core/render.js";
import { deleteTaskList } from "../core/tasktracker.js";
import { htmlUtils } from "../utility/html-utils.js";
import stringUtils from "../utility/string-utils.js";
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
export function drawTaskList(list: TaskList): HTMLElement {
  const ulEntry: HTMLUListElement = htmlUtils.createElement("ul");
  const article: HTMLDivElement = htmlUtils.createElement("article", [
    "task-list",
  ]);
  article.setAttribute("aria-labelledby", "list-name");

  const header: HTMLElement = htmlUtils.createElement("header", [
    "task-list__header",
  ]);

  const deleteButton: HTMLButtonElement = htmlUtils.createElement("button", [
    "u-button",
    "u-button--delete",
  ]) as HTMLButtonElement;
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
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
function drawTitleForms(list: TaskList): HTMLFormElement {
  const titleForms: HTMLFormElement = htmlUtils.createElement("form");
  {
    const label: HTMLLabelElement = htmlUtils.createElement("label", [
      "sc-only",
    ]);
    label.textContent = "List Name";
    label.setAttribute("for", "list-name");

    const titleInput: HTMLInputElement = htmlUtils.createElement("input", [
      "task-list__title",
    ]);
    titleInput.type = "text";
    titleInput.id = titleInput.name = "list-name";
    titleInput.value = list.name;
    titleInput.placeholder = "New List";

    titleForms.addEventListener("submit", (event) => {
      event.preventDefault();

      const trueValue: string = titleInput.value.trim();
      if (stringUtils.isStringNullOrEmpty(trueValue)) {
        return;
      }
      list.name = titleInput.value;
      renderApp();
      console.log(`[Log][List/${list.id}]: Name Updated to ${list.name}`);
    });

    titleForms.append(label, titleInput);
  }
  return titleForms;
}
