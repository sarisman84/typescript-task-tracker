import { tasks, runtime } from "../core/runtime.js";
import { UUID } from "../core/types.js";
let draggedElement = UUID.empty;
let temp;
export function applyDraggableBehavior(task, list, dropArea, card, grabber) {
    card.draggable = true;
    card.ondragstart = (e) => {
        onStartCardDragging(e, dropArea, card, task, list);
    };
    document.ondrop = (e) => {
        onCardDropped(e, dropArea, card, task, list);
    };
    document.ondragover = (event) => {
        event.preventDefault();
        const underneath = document.elementFromPoint(event.clientX, event.clientY);
        if (!underneath)
            return;
        console.log(underneath.id);
    };
}
function setDropAreaToActive(dropAreaId, value) {
    if (dropAreaId) {
        document.querySelectorAll("#category__drop-area").forEach((element) => {
            const area = element;
            const id = area.parentElement?.parentElement?.getAttribute("data-id");
            if (id && id === dropAreaId || !id) {
                return;
            }
            area.setAttribute("data-state", value ? "active" : "inactive");
        });
    }
}
function moveTaskToList(targetTaskId, listIdToMoveTo) {
    const taskIndex = tasks.value.findIndex((t) => t.id === targetTaskId);
    if (taskIndex === -1 ||
        !tasks.value[taskIndex] ||
        listIdToMoveTo === tasks.value[taskIndex]?.id ||
        listIdToMoveTo === UUID.empty)
        return; // If the task is already in the list, return early
    tasks.value[taskIndex].listId = listIdToMoveTo; // Update the task's list ID to the new list ID
    runtime.saveDataAndRefreshAppRenderer(); // Save and refresh the app renderer
}
function onCardDropped(event, dropArea, card, task, list) {
    event.preventDefault();
    if (draggedElement === UUID.empty) {
        console.warn("[Warn][List/${list.id}/applyDraggableBehavior]: No dragged element found! (This is a bug)`");
        return;
    }
    console.log(`[Log][List/${list.id}/applyDraggableBehavior]: Attempting to drop something!`);
    card.classList.remove("card--lifted");
    const id = event.target.parentElement?.parentElement?.getAttribute("data-id");
    if (id) {
        moveTaskToList(draggedElement, id);
        console.log(`[Log][List/${id}/applyDraggableBehavior]: Dragged task of ${task.id} to ${list.name}`);
    }
    else {
        console.log(`[Warn][List/${id}/applyDraggableBehavior]: Could not find drop area! (This is a bug)`);
    }
    setDropAreaToActive(id, false);
    draggedElement = UUID.empty;
}
function onStartCardDragging(event, dropArea, card, task, list) {
    const dropAreaId = dropArea.parentElement?.parentElement?.getAttribute("data-id");
    setDropAreaToActive(dropAreaId, true);
    const self = event.target;
    self.classList.add("card--lifted"); // This is a hack to make the card look lifted when dragging
    draggedElement = task.id;
    event.dataTransfer.effectAllowed = "move";
    console.log(`[Log][List/${list.id}/applyDraggableBehavior]: Started dragging task ${task.id} from list \"${list.name}\"`);
}
//# sourceMappingURL=drag-and-drop.js.map