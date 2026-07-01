import { renderContextMenu } from "../components/context-menu.js";
import { drawNewListButton } from "../components/new-list-button.js";
import { drawNewTaskButton } from "../components/new-task-button.js";
import { drawTaskCard } from "../components/task-card.js";
import { drawTaskList } from "../components/task-list.js";
import { htmlUtils } from "../utility/html/html-utils.js";
import type { TaskList } from "./data management/list-data.js";
import type { Task } from "./data management/task-data.js";
import { app, pageRoot, runtime, taskLists, tasks } from "./runtime.js";

/**
 * Renders all tasks and task lists into the application container.
 */
export function refreshAppRender(): void {
  if (!app) {
    throw new Error("Application container not found");
  }
  app.innerHTML = ""; // Clear the app container before rendering
  renderContextMenu();
  renderTaskboard();

  const element = drawNewListButton();
  app.append(element);
}
export function renderTaskboard(): void {
  taskLists.value.forEach((taskList: TaskList) => {
    const relatedTasks: Task[] = tasks.value.filter(
      (task) => task.listId === taskList.id,
    );
    drawTaskList(taskList, relatedTasks);
  });
}
