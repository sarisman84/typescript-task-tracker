import { createTask } from "../core/data management/task-data.js";
import { runtime } from "../core/runtime.js";
import { htmlUtils } from "../utility/html/html-utils.js";

export function drawNewTaskButton(targetListId: string): HTMLElement {
  const section: HTMLElement = htmlUtils.createElement(
    "section",
    "new-task-button",
    ["u-transparent", "card--empty"],
  );
  {
    const newTaskButton: HTMLButtonElement = htmlUtils.createElement(
      "button",
      "new-task-button",
      ["u-button", "u-button--create"],
    ) as HTMLButtonElement;

    newTaskButton.textContent = "New Task";
    newTaskButton.addEventListener("click", (event) => {
      createTask(targetListId);
      runtime.saveDataAndRefreshAppRenderer();
    });

    section.append(newTaskButton);
  }
  return section;
}
