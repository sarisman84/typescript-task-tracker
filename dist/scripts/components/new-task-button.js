import { createTask } from "../core/data management/task-data.js";
import { htmlUtils } from "../utility/html/html-utils.js";
export function drawNewTaskButton(targetListId) {
    const section = htmlUtils.createElement("section", [
        "u-transparent",
        "task--empty",
    ]);
    {
        const newTaskButton = htmlUtils.createElement("button", [
            "u-button",
            "u-button--create",
        ]);
        newTaskButton.textContent = "New Task";
        newTaskButton.addEventListener("click", (event) => {
            createTask(targetListId);
        });
        section.append(newTaskButton);
    }
    return section;
}
//# sourceMappingURL=new-task-button.js.map