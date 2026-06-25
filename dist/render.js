import { app, taskLists, tasks } from "./data.js";
import { createTask, createTaskList, deleteTask, deleteTaskList, } from "./tasktracker.js";
import { HTML, Utility } from "./utility.js";
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
            renderRelatedTask(task, taskListElement);
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
    const section = HTML.createElement("section", ["task-list"]);
    {
        const newListButton = HTML.createElement("button", [
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
    const section = HTML.createElement("section", [
        "u-transparent",
        "task--empty",
    ]);
    {
        const newTaskButton = HTML.createElement("button", [
            "u-button",
            "u-button--create",
        ]);
        newTaskButton.textContent = "New Task";
        newTaskButton.addEventListener("click", (event) => {
            const newTaskDesc = {
                description: "New Task",
                listId: id,
                status: "pending",
            };
            createTask(newTaskDesc);
        });
        section.append(newTaskButton);
    }
    return section;
}
/**
 * Renders a single task within a task list.
 * @param relatedTask - The task to render.
 * @param taskListElement - The HTML element representing the parent task list.
 */
export function renderRelatedTask(relatedTask, taskListElement) {
    const entry = document.createElement("li");
    const article = HTML.createElement("article", ["task"]); // Create article element with class "task"
    {
        const header = renderHeaderOfTask(relatedTask);
        const footer = renderFooterOfTask(relatedTask);
        const content = HTML.createElement("textarea", [
            "task__description",
        ]);
        content.id = `${relatedTask.id}-desc`;
        content.textContent = relatedTask.description;
        content.rows = 5;
        content.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") {
                return;
            }
            if (Utility.isNullOrEmpty(content.value)) {
                return;
            }
            relatedTask.description = content.value;
            renderTasks();
            console.log(`Task ${relatedTask.id} updated!`);
        });
        article.append(header, content, footer);
    }
    entry.append(article);
    taskListElement.append(entry);
    console.log(`Task "${relatedTask.id}" added to list "${taskListElement.getAttribute("data-list-id")}"`);
}
/**
 * Renders a single task list into an HTML element.
 * @param taskList - The task list to render.
 * @returns An HTMLUListElement representing the rendered task list.
 */
function renderList(taskList) {
    const taskListElement = document.createElement("ul");
    taskListElement.setAttribute("data-list-id", taskList.id.toString());
    taskListElement.classList.add("task-list"); // Add class for styling
    const header = HTML.createElement("header", [
        "task-list__header",
    ]);
    {
        const listHeader = HTML.createElement("input", [
            "task-list__title",
        ]);
        listHeader.value = taskList.name;
        listHeader.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") {
                return;
            }
            const trueValue = listHeader.value.trim();
            if (Utility.isNullOrEmpty(trueValue)) {
                return;
            }
            taskList.name = listHeader.value;
            renderTasks();
            console.log(`List ${taskList.id} updated!`);
        });
        const deleteButton = HTML.createElement("button", [
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
function renderFooterOfTask(relatedTask) {
    const footer = HTML.createElement("footer", ["task__footer"]);
    const select = HTML.createDropdown(["task__status"], ["pending", "in-progress", "completed"], "", (newStatus) => {
        select.setAttribute("data-type", newStatus);
    });
    select.value = relatedTask.status;
    select.setAttribute("data-type", relatedTask.status);
    const deleteButton = HTML.createElement("button", [
        "u-button",
        "u-button--delete",
    ]);
    deleteButton.textContent = "Delete"; // Set button text to "Edit"
    deleteButton.addEventListener("click", (event) => {
        const deleteTaskDesc = {
            taskId: relatedTask.id,
            updateRender: true,
        };
        deleteTask(deleteTaskDesc);
    });
    footer.append(select, deleteButton);
    return footer;
}
function renderHeaderOfTask(relatedTask) {
    const header = HTML.createElement("header", ["task__header"]);
    header.setAttribute("aria-label", relatedTask.description); // Set data-id attribute to task id
    const date = HTML.createElement("time", [
        "task__date",
    ]);
    date.setAttribute("datetime", relatedTask.createdAt.toISOString());
    date.textContent = relatedTask.createdAt.toLocaleDateString();
    header.appendChild(date);
    return header;
}
//# sourceMappingURL=render.js.map