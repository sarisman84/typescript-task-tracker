import { drawNewListButton } from "../components/new-list-button.js";
import { drawNewTaskButton } from "../components/new-task-button.js";
import { drawTaskCard } from "../components/task-card.js";
import { drawTaskList } from "../components/task-list.js";
import { htmlUtils } from "../utility/html/html-utils.js";
import { app, taskLists, tasks, type Task, type TaskList } from "./data.js";

export function renderEmptyState(fullClear: boolean = false): void {
  if (fullClear) {
    app.innerHTML = "";
  }
  const element = drawNewListButton();
  app.append(element);
}

/**
 * Renders all tasks and task lists into the application container.
 */
export function renderApp(): void {
  app.innerHTML = ""; // Clear the app container before rendering
  taskLists.forEach((taskList: TaskList) => {
    const taskListElement: HTMLElement = drawTaskList(taskList);
    const relatedTasks: Task[] = tasks.filter(
      (task) => task.listId === taskList.id,
    );

    relatedTasks.forEach((task: Task) => {
      // renderRelatedTask(task, taskListElement);
      const liElement: HTMLLIElement = htmlUtils.createElement("li", []);
      const card: HTMLFormElement = drawTaskCard(task);

      liElement.append(card);
      taskListElement.append(liElement);
    });

    const emptyTask: HTMLElement = drawNewTaskButton(taskList.id);
    taskListElement.append(emptyTask);
  });

  const element = drawNewListButton();

  app.append(element);
}
