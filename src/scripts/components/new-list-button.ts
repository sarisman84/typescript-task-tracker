import { createTaskList } from "../core/data management/list-data.js";
import { htmlUtils } from "../utility/html/html-utils.js";

export function drawNewListButton(): HTMLElement {
  const section: HTMLElement = htmlUtils.createElement("section", "list-entry");
  const content: HTMLDivElement = htmlUtils.createElement("div", "new-list", [
    "task-list",
  ]);
  {
    const newListButton: HTMLButtonElement = htmlUtils.createElement(
      "button",
      "new-list--button",
      ["u-button", "u-button--create"],
    ) as HTMLButtonElement;
    newListButton.textContent = "New List";
    newListButton.addEventListener("click", () => {
      createTaskList();
    });

    content.append(newListButton);
  }
  section.append(content);

  return section;
}
