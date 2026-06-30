import { createTaskList } from "../core/tasktracker.js";
import { htmlUtils } from "../utility/html/html-utils.js";
export function drawNewListButton() {
    const section = htmlUtils.createElement("section", [
        "task-list",
    ]);
    {
        const newListButton = htmlUtils.createElement("button", [
            "u-button",
            "u-button--create",
        ]);
        newListButton.textContent = "New List";
        newListButton.addEventListener("click", () => {
            createTaskList();
        });
        section.append(newListButton);
    }
    return section;
}
//# sourceMappingURL=new-list-button.js.map