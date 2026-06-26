import { drawTaskCard, } from "../components/task-card.js";
import { htmlUtils } from "../utility/html-utils.js";
import stringUtils from "../utility/string-utils.js";
import { app, taskLists, tasks } from "./data.js";
import { createTask, createTaskList, deleteTask, deleteTaskList, } from "./tasktracker.js";
export function renderDefaultState(fullClear = false) {
    if (fullClear) {
        app.innerHTML = "";
    }
    const { list, element } = renderEmptyTaskList();
    app.append(element);
}
/**
 * Renders all tasks and task lists into the application container.
 */
export function renderTasks() {
    app.innerHTML = ""; // Clear the app container before rendering
    taskLists.forEach((taskList) => {
        const taskListElement = renderList(taskList);
        const relatedTasks = tasks.filter((task) => task.listId === taskList.id);
        relatedTasks.forEach((task) => {
            // renderRelatedTask(task, taskListElement);
            const liElement = htmlUtils.createElement("li", []);
            const card = drawTaskCard(task);
            liElement.append(card);
            taskListElement.append(liElement);
        });
        const emptyTask = renderEmptyTask(taskList.id);
        taskListElement.append(emptyTask);
        app.append(taskListElement);
    });
    const { list, element } = renderEmptyTaskList();
    app.append(element);
}
function renderEmptyTaskList() {
    let taskList = { id: -1, name: "", createdAt: new Date() };
    const section = htmlUtils.createElement("section", [
        "task-list",
    ]);
    {
        const newListButton = htmlUtils.createElement("button", [
            "u-button",
            "u-button--create",
        ]);
        newListButton.textContent = "New List";
        newListButton.addEventListener("click", (event) => {
            const description = {
                name: "New List",
            };
            taskList = createTaskList(description);
        });
        section.append(newListButton);
    }
    return { list: taskList, element: section };
}
function renderEmptyTask(id = -1) {
    if (id === -1) {
        const desc = {
            name: "New List",
        };
        id = createTaskList(desc).id;
    }
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
            const newTaskDesc = {
                description: "New Task",
                listId: id,
            };
            createTask(newTaskDesc);
        });
        section.append(newTaskButton);
    }
    return section;
}
// /**
//  * Renders a single task within a task list.
//  * @param relatedTask - The task to render.
//  * @param taskListElement - The HTML element representing the parent task list.
//  */
// export function renderRelatedTask(
//   relatedTask: Task,
//   taskListElement: HTMLUListElement,
// ): void {
//   const entry: HTMLLIElement = document.createElement("li");
//   const article: HTMLElement = htmlUtils.createElement("article", ["task"]); // Create article element with class "task"
//   {
//     const header: HTMLElement = renderHeaderOfTask(relatedTask);
//     const footer: HTMLElement = renderFooterOfTask(relatedTask);
//     const content: HTMLTextAreaElement = htmlUtils.createElement("textarea", [
//       "task__description",
//     ]) as HTMLTextAreaElement;
//     content.id = `${relatedTask.id}-desc`;
//     content.textContent = relatedTask.description;
//     content.rows = 5;
//     content.addEventListener("keydown", (event: KeyboardEvent) => {
//       if (event.key !== "Enter") {
//         return;
//       }
//       if (stringUtils.isStringNullOrEmpty(content.value)) {
//         return;
//       }
//       relatedTask.description = content.value;
//       renderTasks();
//       console.log(`Task ${relatedTask.id} updated!`);
//     });
//     article.append(header, content, footer);
//   }
//   entry.append(article);
//   taskListElement.append(entry);
//   console.log(
//     `Task "${relatedTask.id}" added to list "${taskListElement.getAttribute("data-list-id")}"`,
//   );
// }
/**
 * Renders a single task list into an HTML element.
 * @param taskList - The task list to render.
 * @returns An HTMLUListElement representing the rendered task list.
 */
function renderList(taskList) {
    const taskListElement = document.createElement("ul");
    taskListElement.setAttribute("data-list-id", taskList.id.toString());
    taskListElement.classList.add("task-list"); // Add class for styling
    const header = htmlUtils.createElement("header", [
        "task-list__header",
    ]);
    {
        const listHeader = htmlUtils.createElement("input", [
            "task-list__title",
        ]);
        listHeader.value = taskList.name;
        listHeader.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") {
                return;
            }
            const trueValue = listHeader.value.trim();
            if (stringUtils.isStringNullOrEmpty(trueValue)) {
                return;
            }
            taskList.name = listHeader.value;
            renderTasks();
            console.log(`List ${taskList.id} updated!`);
        });
        const deleteButton = htmlUtils.createElement("button", [
            "u-button",
            "u-button--delete",
        ]);
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (event) => {
            const description = {
                listId: taskList.id,
            };
            deleteTaskList(description);
        });
        header.append(listHeader, deleteButton); // Append the heading to the header element
    }
    taskListElement.append(header);
    console.log(`Rendering task list "${taskList.name}" with ID: ${taskList.id}`);
    return taskListElement;
}
// function renderFooterOfTask(relatedTask: Task) {
//   const footer: HTMLElement = htmlUtils.createElement("footer", ["task__footer"]);
//   const select: HTMLSelectElement = htmlUtils.createDropdown(
//     ["task__status"],
//     ["pending", "in-progress", "completed"],
//     "",
//     (newStatus: string) => {
//       select.setAttribute("data-type", newStatus);
//       relatedTask.status = newStatus as Status;
//     },
//   );
//   select.value = relatedTask.status;
//   select.setAttribute("data-type", relatedTask.status);
//   const deleteButton: HTMLButtonElement = htmlUtils.createElement("button", [
//     "u-button",
//     "u-button--delete",
//   ]) as HTMLButtonElement;
//   deleteButton.textContent = "Delete"; // Set button text to "Edit"
//   deleteButton.addEventListener("click", (event) => {
//     const deleteTaskDesc: DeleteTaskDesc = {
//       taskId: relatedTask.id,
//       updateRender: true,
//     };
//     deleteTask(deleteTaskDesc);
//   });
//   footer.append(select, deleteButton);
//   return footer;
// }
// function renderHeaderOfTask(relatedTask: Task) {
//   const header: HTMLElement = htmlUtils.createElement("header", ["task__header"]);
//   header.setAttribute("aria-label", relatedTask.description); // Set data-id attribute to task id
//   const date: HTMLElement = htmlUtils.createElement("time", [
//     "task__date",
//   ]) as HTMLElement;
//   date.setAttribute("datetime", relatedTask.createdAt.toISOString());
//   date.textContent = relatedTask.createdAt.toLocaleDateString();
//   header.appendChild(date);
//   return header;
// }
//# sourceMappingURL=render.js.map