import {
  applyDraggableBehaviour,
  type DragBehaviourDesc,
} from "../behaviours/drag-and-drop.js";
import { renderContextMenu } from "../components/context-menu.js";
import { drawNewListButton } from "../components/new-list-button.js";
import { drawTaskList } from "../components/task-list.js";
import { htmlUtils } from "../utility/html/html-utils.js";
import type { TaskList } from "./data management/list-data.js";
import type { Task } from "./data management/task-data.js";
import { app, pageRoot, runtime, taskLists, tasks } from "./runtime.js";
import { UUID } from "./types.js";

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
  const collections: { collection: HTMLElement; id: UUID }[] = [];
  taskLists.value.forEach((taskList: TaskList) => {
    const relatedTasks: Task[] = tasks.value.filter(
      (task) => task.listId === taskList.id,
    );
    const categoryElement: HTMLElement | null = drawTaskList(
      taskList,
      relatedTasks,
    );
    if (!categoryElement) {
      return;
    }
    const collection = categoryElement.querySelector(
      "#category__collection",
    ) as HTMLElement;
    collections.push({ collection, id: taskList.id });
  });

  collections.forEach((entry) => {
    const { collection, id } = entry;
    const cards = htmlUtils.querySelectorAll("#category__entry", collection);
    const desc: DragBehaviourDesc = {
      collections: collections.map((c) => c.collection),
      entries: cards.map((card) => {
        return {
          card: card as HTMLElement,
          grabber: card.querySelector("#task-card__grabber") as HTMLElement,
          taskId: card.getAttribute("data-id") ?? UUID.empty,
        };
      }),
    };
    applyDraggableBehaviour(desc);
  });
}
