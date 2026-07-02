import { tasks, runtime } from "../core/runtime";
import { UUID } from "../core/types";
let canDrag = false;
export function applyDraggableBehavior(task, list, owner, card, grabber) {
    card.draggable = true;
    card.ondragstart = (event) => {
        if (!canDrag) {
            return;
        }
        const foundTask = getData(event);
        if (foundTask) {
            console.warn(`[Warn][List/${list.id}]: Task ${task.id} is already being dragged! `);
            return;
        }
        const self = event.currentTarget;
        self.classList.add("card--lifted"); // This is a hack to make the card look lifted when dragging
        setData(event, task);
        event.dataTransfer.items.add(`#task-card[data-task-id=\"${task.id}\"]`, "data/id");
        event.dataTransfer.effectAllowed = "move";
        console.log(`[Log][List/${list.id}/applyDraggableBehavior]: Started dragging task ${task.id} from list \"${list.name}\"`);
    };
    owner.ondrop = (event) => {
        event.preventDefault();
        console.log(`[Log][List/${list.id}/applyDraggableBehavior]: Attempting to drop something!`);
        const draggedTask = getData(event);
        if (!draggedTask) {
            return;
        }
        {
            const foundCard = getCardElementOfTask(draggedTask);
            console.log(foundCard);
            if (!foundCard)
                return; // If the card is not found, return early
            foundCard.classList.remove("card--lifted");
        }
        const element = event.currentTarget;
        moveTaskToList(draggedTask.id, element.getAttribute("data-id") ?? UUID.empty);
        console.log(`[Log][List/${list.id}/applyDraggableBehavior]: Dragged task of ${task.id} to ${list.name}`);
    };
    owner.ondragover = (event) => {
        event.preventDefault();
    };
}
function getCardElementOfTask(task) {
    return document.querySelector(`#task-card[data-task-id=\"${task.id}\"]`);
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
function getData(event) {
    if (!event.dataTransfer) {
        return null;
    }
    for (const item of event.dataTransfer.items) {
        if (item.kind === "string" && item.type === "data/task") {
            item.getAsString((data) => {
                return JSON.parse(data);
            });
        }
    }
    return null;
}
function setData(event, task) {
    if (!event.dataTransfer) {
        return;
    }
    event.dataTransfer.items.add(JSON.stringify(task), "data/task");
}
//# sourceMappingURL=applyDraggableBehavior.js.map