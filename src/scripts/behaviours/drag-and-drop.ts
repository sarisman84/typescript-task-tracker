import type { TaskList } from "../core/data management/list-data.js";
import type { Task } from "../core/data management/task-data.js";
import { tasks, runtime } from "../core/runtime.js";
import { UUID } from "../core/types.js";

let draggedElement: UUID = UUID.empty;

export interface DragBehaviourDesc {
  cards: HTMLElement[];
  list: HTMLElement;
  listId: UUID;
}

export function applyDraggableBehaviour(desc: DragBehaviourDesc) {
  const { cards, list, listId } = desc;

  cards.forEach((cardElement: HTMLElement) => {
    const taskId: UUID = cardElement.getAttribute("data-id") ?? UUID.empty;
    if (taskId == UUID.empty) {
      return;
    }
    applyDragBehaviourToCard(cardElement, listId, taskId);
  });

  applyDragBehaviourToList(list);
}

function applyDragBehaviourToCard(
  cardElement: HTMLElement,
  parentListId: UUID,
  currentTaskId: UUID,
) {
  cardElement.draggable = true;
  function onStartDraggingCard(event: DragEvent) {
    queryAllCollections(parentListId).forEach((collection) => {
      collection.classList.add("marked-for-drop");
    });

    draggedElement = currentTaskId;
    const self = event.target as HTMLElement;
    self.classList.add("card--lifted");

    event.dataTransfer!.effectAllowed = "move";
  }

  cardElement.ondragstart = (e: DragEvent) => {
    onStartDraggingCard(e);
  };
}

function applyDragBehaviourToList(collection: HTMLElement) {
  collection.ondragover = (e: DragEvent) => {
    e.preventDefault();
  };

  collection.ondrop = (e: DragEvent) => {
    e.preventDefault();

    queryAllCollections().forEach((collection) => {
      collection.classList.remove("marked-for-drop");
    });

    const targetElement: HTMLElement = e.target as HTMLElement;
    if (!targetElement.id.match("category__collection")) {
      return;
    }
    const targetListId: UUID =
      targetElement.parentElement?.parentElement?.getAttribute("data-id") ??
      UUID.empty;

    if (targetListId === UUID.empty) {
      return;
    }

    const taskId = draggedElement;
    const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return;
    }

    const task = tasks.value[taskIndex];
    if (!task) {
      return;
    }

    task.listId = targetListId;
    runtime.saveDataAndRefreshAppRenderer();
  };
}

function queryAllCollections(...idsToAvoid: UUID[]): HTMLElement[] {
  const result: HTMLElement[] = [];
  const foundCollections = document.querySelectorAll("#category__collection");
  for (const collection of foundCollections) {
    const parent = collection.parentElement;
    if (!parent) {
      continue;
    }

    const id = parent.getAttribute("data-id");
    if (!id || idsToAvoid.find((colId) => colId === id)) {
      continue;
    }

    result.push(collection as HTMLElement);
  }
  return result;
}

function queryCards(...idsToSearch: UUID[]): HTMLElement[] {
  const result: HTMLElement[] = [];
  const foundCards = document.querySelectorAll("#category__entry");
  for (const card of foundCards) {
    const id = card.getAttribute("data-id");
    if (!id || !idsToSearch.find((cardId) => cardId === id)) {
      continue;
    }
    result.push(card as HTMLElement);
  }
  return result;
}
