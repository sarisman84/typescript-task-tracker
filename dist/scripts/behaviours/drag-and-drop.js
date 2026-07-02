import { tasks, runtime } from "../core/runtime.js";
import { UUID } from "../core/types.js";
let draggedElement = UUID.empty;
export function applyDraggableBehaviour(desc) {
    const { cards, list, listId } = desc;
    cards.forEach((cardElement) => {
        const taskId = cardElement.getAttribute("data-id") ?? UUID.empty;
        if (taskId == UUID.empty) {
            return;
        }
        applyDragBehaviourToCard(cardElement, listId, taskId);
    });
    applyDragBehaviourToList(list);
}
function applyDragBehaviourToCard(cardElement, parentListId, currentTaskId) {
    cardElement.draggable = true;
    function onStartDraggingCard(event) {
        queryAllCollections(parentListId).forEach((collection) => {
            collection.classList.add("marked-for-drop");
        });
        draggedElement = currentTaskId;
        const self = event.target;
        self.classList.add("card--lifted");
        event.dataTransfer.effectAllowed = "move";
    }
    cardElement.ondragstart = (e) => {
        onStartDraggingCard(e);
    };
}
function applyDragBehaviourToList(collection) {
    collection.ondragover = (e) => {
        e.preventDefault();
    };
    collection.ondrop = (e) => {
        e.preventDefault();
        queryAllCollections().forEach((collection) => {
            collection.classList.remove("marked-for-drop");
        });
        const targetElement = e.target;
        if (!targetElement.id.match("category__collection")) {
            return;
        }
        const targetListId = targetElement.parentElement?.parentElement?.getAttribute("data-id") ??
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
function queryAllCollections(...idsToAvoid) {
    const result = [];
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
        result.push(collection);
    }
    return result;
}
function queryCards(...idsToSearch) {
    const result = [];
    const foundCards = document.querySelectorAll("#category__entry");
    for (const card of foundCards) {
        const id = card.getAttribute("data-id");
        if (!id || !idsToSearch.find((cardId) => cardId === id)) {
            continue;
        }
        result.push(card);
    }
    return result;
}
//# sourceMappingURL=drag-and-drop.js.map