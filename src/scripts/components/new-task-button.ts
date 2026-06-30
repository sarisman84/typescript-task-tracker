import { createTask } from "../core/tasktracker.js";
import { htmlUtils } from "../utility/html/html-utils.js";

export function drawNewTaskButton(targetListId: string): HTMLElement {
  const section: HTMLElement = htmlUtils.createElement("section", [
    "u-transparent",
    "task--empty",
  ]);
  {
    const newTaskButton: HTMLButtonElement = htmlUtils.createElement("button", [
      "u-button",
      "u-button--create",
    ]) as HTMLButtonElement;

    newTaskButton.textContent = "New Task";
    newTaskButton.addEventListener("click", (event) => {
      createTask(targetListId);
    });

    section.append(newTaskButton);
  }
  return section;
}
