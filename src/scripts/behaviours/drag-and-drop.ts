import type { TaskList } from "../core/data management/list-data.js";
import type { Task } from "../core/data management/task-data.js";
import { tasks, runtime } from "../core/runtime.js";
import { UUID } from "../core/types.js";

let draggedElement: UUID = UUID.empty;
let temp: Element | null;
export function applyDraggableBehavior(
  task: Task,
  list: TaskList,
  dropArea: HTMLElement,
  card: HTMLElement,
  grabber: HTMLElement,
) {
  card.draggable = true;

  card.ondragstart = (e) => {
    onStartCardDragging(e, dropArea, card, task, list);
  };
  document.ondrop = (e) => {
    onCardDropped(e, dropArea, card, task, list);
  };

  document.ondragover = (event: DragEvent) => {
    event.preventDefault();
    const underneath = document.elementFromPoint(event.clientX, event.clientY);
    if (!underneath) return;
    console.log(underneath.id);
  };
}

function setDropAreaToActive(
  dropAreaId: string | null | undefined,
  value: boolean,
) {
  if (dropAreaId) {
    document.querySelectorAll("#category__drop-area").forEach((element) => {
      const area: HTMLElement = element as HTMLElement;
      const id: UUID | null | undefined =
        area.parentElement?.parentElement?.getAttribute("data-id");
      if (id && id === dropAreaId || !id) {
        return;
      }
      area.setAttribute("data-state", value ? "active" : "inactive");

    });
  }
}

function moveTaskToList(targetTaskId: UUID, listIdToMoveTo: UUID): void {
  const taskIndex = tasks.value.findIndex((t) => t.id === targetTaskId);
  if (
    taskIndex === -1 ||
    !tasks.value[taskIndex] ||
    listIdToMoveTo === tasks.value[taskIndex]?.id ||
    listIdToMoveTo === UUID.empty
  )
    return; // If the task is already in the list, return early

  tasks.value[taskIndex].listId = listIdToMoveTo; // Update the task's list ID to the new list ID

  runtime.saveDataAndRefreshAppRenderer(); // Save and refresh the app renderer
}

function onCardDropped(
  event: DragEvent,
  dropArea: HTMLElement,
  card: HTMLElement,
  task: Task,
  list: TaskList,
): void {
  event.preventDefault();
  if (draggedElement === UUID.empty) {
    console.warn(
      "[Warn][List/${list.id}/applyDraggableBehavior]: No dragged element found! (This is a bug)`",
    );
    return;
  }

  console.log(
    `[Log][List/${list.id}/applyDraggableBehavior]: Attempting to drop something!`,
  );

  card.classList.remove("card--lifted");

  const id: UUID | null | undefined = (
    event.target as HTMLElement
  ).parentElement?.parentElement?.getAttribute("data-id");

  if (id) {
    moveTaskToList(draggedElement, id);
    console.log(
      `[Log][List/${id}/applyDraggableBehavior]: Dragged task of ${task.id} to ${list.name}`,
    );
  } else {
    console.log(
      `[Warn][List/${id}/applyDraggableBehavior]: Could not find drop area! (This is a bug)`,
    );
  }

  setDropAreaToActive(id, false);

  draggedElement = UUID.empty;
}

function onStartCardDragging(
  event: DragEvent,
  dropArea: HTMLElement,
  card: HTMLElement,
  task: Task,
  list: TaskList,
): void {
  const dropAreaId: UUID | null | undefined =
    dropArea.parentElement?.parentElement?.getAttribute("data-id");
  setDropAreaToActive(dropAreaId, true);

  const self: HTMLElement = event.target as HTMLElement;
  self.classList.add("card--lifted"); // This is a hack to make the card look lifted when dragging
  draggedElement = task.id;

  event.dataTransfer!.effectAllowed = "move";

  console.log(
    `[Log][List/${list.id}/applyDraggableBehavior]: Started dragging task ${task.id} from list \"${list.name}\"`,
  );
}
