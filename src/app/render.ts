import type { Task, TaskList } from "./data.js";
import { createElement } from "./utility.js";

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

    taskDescription.app.appendChild(taskListElement);
  });
}

/**
 * Renders a single task list into an HTML element.
 * @param taskList - The task list to render.
 * @returns An HTMLUListElement representing the rendered task list.
 */
export function renderList(taskList: TaskList): HTMLUListElement {
  const taskListElement: HTMLUListElement = document.createElement("ul");
  taskListElement.setAttribute("data-list-id", taskList.id.toString());
  taskListElement.classList.add("task-list"); // Add class for styling

  const listHeader: HTMLHeadingElement = document.createElement("h2");
  listHeader.textContent = taskList.name;
  listHeader.classList.add("task-list__title"); // Add class for styling
  taskListElement.appendChild(listHeader);

  console.log(`Rendering task list "${taskList.name}" with ID: ${taskList.id}`);
  return taskListElement;
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
function renderFooterOfTask(relatedTask: Task) {
  const footer: HTMLElement = createElement("footer", ["task__footer"]);

  const statusSpan: HTMLSpanElement = createElement("span", ["task__status"]);
  statusSpan.setAttribute("data-type", relatedTask.status);
  statusSpan.textContent = relatedTask.status; // Display the task's status

  const deleteButton: HTMLButtonElement = createElement("button", [
    "task__edit-button",
  ]) as HTMLButtonElement;

  footer.append(statusSpan, deleteButton);

  return footer;
}

function renderHeaderOfTask(relatedTask: Task) {
  const header: HTMLElement = createElement("header", ["task__header"]);

  const date: HTMLElement = createElement("time", [
    "task__date",
  ]) as HTMLElement;
  date.setAttribute("datetime", relatedTask.createdAt.toISOString());
  date.textContent = relatedTask.createdAt.toLocaleDateString();
  header.appendChild(date);

  return header;
}
