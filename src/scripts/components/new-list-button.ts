import { createTaskList } from "../core/data management/list-data.js";
import { runtime } from "../core/runtime.js";
import { htmlUtils } from "../utility/html/html-utils.js";

export function drawNewListButton(): HTMLElement {
  const section: HTMLElement = htmlUtils.createElement(
    "section",
    "category__empty",
  );
  const content: HTMLDivElement = htmlUtils.createElement(
    "div",
    "category__content",
    ["category"],
  );
  {
    const newListButton: HTMLButtonElement = htmlUtils.createElement(
      "button",
      "new-list--button",
      ["u-button", "u-button--create"],
    ) as HTMLButtonElement;
    newListButton.textContent = "New List";
    newListButton.addEventListener("click", () => {
      createTaskList();
      runtime.saveDataAndRefreshAppRenderer();
    });

    content.append(newListButton);
  }
  section.append(content);

  return section;
}
