import { createTaskList } from "../core/data management/list-data.js";
import { runtime } from "../core/runtime.js";
import { htmlUtils } from "../utility/html/html-utils.js";
export function drawNewListButton() {
    const section = htmlUtils.createElement("section", "category__empty");
    const content = htmlUtils.createElement("div", "category__content", ["category"]);
    {
        const newListButton = htmlUtils.createElement("button", "new-list--button", ["u-button", "u-button--create"]);
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
//# sourceMappingURL=new-list-button.js.map