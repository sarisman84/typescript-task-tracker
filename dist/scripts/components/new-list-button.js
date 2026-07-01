import { createTaskList } from "../core/data management/list-data.js";
import { htmlUtils } from "../utility/html/html-utils.js";
export function drawNewListButton() {
    const section = htmlUtils.createElement("section", "list-entry");
    const content = htmlUtils.createElement("div", "new-list", [
        "task-list",
    ]);
    {
        const newListButton = htmlUtils.createElement("button", "new-list--button", ["u-button", "u-button--create"]);
        newListButton.textContent = "New List";
        newListButton.addEventListener("click", () => {
            createTaskList();
        });
        content.append(newListButton);
    }
    section.append(content);
    return section;
}
//# sourceMappingURL=new-list-button.js.map