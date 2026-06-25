import { app, taskLists, tasks, type Task, type TaskList } from "./data.js";
import {
  createTaskList,
  deleteTask,
  deleteTaskList,
  type CreateTaskListDesc,
  type DeleteTaskDesc,
  type DeleteTaskListDesc,
} from "./tasktracker.js";
import { createDropdown, createElement } from "./utility.js";

export interface TaskDesc {
  taskLists: TaskList[];
  app: HTMLDivElement;
  tasks: Task[];
}

/**
 * Renders all tasks and task lists into the application container.
 */
export function renderTasks(taskDescription: TaskDesc): void {
  taskDescription.app.innerHTML = ""; // Clear the app container before rendering
  taskDescription.taskLists.forEach((taskList: TaskList) => {
    const taskListElement: HTMLUListElement = renderList(taskList);
    const relatedTasks: Task[] = taskDescription.tasks.filter(
      (task) => task.listId === taskList.id,
    );

    relatedTasks.forEach((task: Task) => {
      renderRelatedTask(task, taskListElement);
    });

    taskDescription.app.append(taskListElement);
  });

  const section: HTMLElement = createElement("section", ["task-list"]);
  {
    const newListButton: HTMLButtonElement = createElement("button", [
      "task-list__new-list-button",
    ]) as HTMLButtonElement;
    newListButton.textContent = "New List";
    newListButton.addEventListener("click", (event) => {
      const description: CreateTaskListDesc = {
        name: "New List",
        app,
        taskLists,
        tasks,
      };

      createTaskList(description);
    });

    section.append(newListButton);
  }
  taskDescription.app.append(section);
}

/**
 * Renders a single task within a task list.
 * @param relatedTask - The task to render.
 * @param taskListElement - The HTML element representing the parent task list.
 */
export function renderRelatedTask(
  relatedTask: Task,
  taskListElement: HTMLUListElement,
): void {
  const entry: HTMLLIElement = document.createElement("li");

  const article: HTMLElement = createElement("article", ["task"]); // Create article element with class "task"
  {
    const header: HTMLElement = renderHeaderOfTask(relatedTask);
    const footer: HTMLElement = renderFooterOfTask(relatedTask);

    const content: HTMLParagraphElement = createElement("p", [
      "task__description",
    ]) as HTMLParagraphElement;
    content.textContent = relatedTask.description;

    article.append(header, content, footer);
  }

  entry.append(article);

  taskListElement.append(entry);
  console.log(
    `Task "${relatedTask.id}" added to list "${taskListElement.getAttribute("data-list-id")}"`,
  );
}

/**
 * Renders a single task list into an HTML element.
 * @param taskList - The task list to render.
 * @returns An HTMLUListElement representing the rendered task list.
 */
function renderList(taskList: TaskList): HTMLUListElement {
  const taskListElement: HTMLUListElement = document.createElement("ul");

  taskListElement.setAttribute("data-list-id", taskList.id.toString());
  taskListElement.classList.add("task-list"); // Add class for styling

  //   const listHeader: HTMLHeadingElement = document.createElement("h2");
  //   listHeader.textContent = taskList.name;
  //   listHeader.classList.add("task-list__title"); // Add class for styling
  //   taskListElement.append(listHeader);

  const header: HTMLElement = createElement("header", ["task-list__header"]);
  {
    const listHeader: HTMLHeadingElement = document.createElement("h2");
    listHeader.textContent = taskList.name;
    listHeader.classList.add("task-list__title"); // Add class for styling

    const deleteButton: HTMLButtonElement = createElement("button", [
      "task-list__delete-button",
    ]) as HTMLButtonElement;
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
      const description: DeleteTaskListDesc = {
        listId: taskList.id,
        app,
        tasks,
        taskLists,
      };

      deleteTaskList(description);
    });
    header.append(listHeader, deleteButton); // Append the heading to the header element
  }
  taskListElement.append(header);

  console.log(`Rendering task list "${taskList.name}" with ID: ${taskList.id}`);
  return taskListElement;
}

function renderFooterOfTask(relatedTask: Task) {
  const footer: HTMLElement = createElement("footer", ["task__footer"]);

  const select: HTMLSelectElement = createDropdown(
    ["task__status"],
    ["pending", "in-progress", "completed"],
    "",
    (newStatus: string) => {
      select.setAttribute("data-type", newStatus);
    },
  ); // Create dropdown with status options"], [)

  select.value = relatedTask.status;
  select.setAttribute("data-type", relatedTask.status);

  const deleteButton: HTMLButtonElement = createElement("button", [
    "task__delete-button",
  ]) as HTMLButtonElement;
  deleteButton.textContent = "Delete"; // Set button text to "Edit"
  deleteButton.addEventListener("click", (event) => {
    const deleteTaskDesc: DeleteTaskDesc = {
      app,
      tasks,
      taskLists,
      taskId: relatedTask.id,
      updateRender: true,
    };

    deleteTask(deleteTaskDesc);
  });

  footer.append(select, deleteButton);

  return footer;
}

function renderHeaderOfTask(relatedTask: Task) {
  const header: HTMLElement = createElement("header", ["task__header"]);
  header.setAttribute("aria-label", relatedTask.description); // Set data-id attribute to task id

  const date: HTMLElement = createElement("time", [
    "task__date",
  ]) as HTMLElement;
  date.setAttribute("datetime", relatedTask.createdAt.toISOString());
  date.textContent = relatedTask.createdAt.toLocaleDateString();
  header.appendChild(date);

  return header;
}
