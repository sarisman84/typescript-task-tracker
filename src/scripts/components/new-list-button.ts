import type { TaskList } from "../core/data.js";
import { createTaskList } from "../core/tasktracker.js";
import { htmlUtils } from "../utility/html-utils.js";

export function drawNewListButton(): HTMLElement {
  const section: HTMLElement = htmlUtils.createElement("section", [
    "task-list",
  ]);
  {
    const newListButton: HTMLButtonElement = htmlUtils.createElement("button", [
      "u-button",
      "u-button--create",
    ]) as HTMLButtonElement;
    newListButton.textContent = "New List";
    newListButton.addEventListener("click", () => {
      createTaskList();
    });

    section.append(newListButton);
  }

  return section;
}
