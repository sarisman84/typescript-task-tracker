/**
 * Drag and drop behaviour for task cards between collections.
 *
 * This module implements HTML5 drag-and-drop functionality that allows users to
 * reassign tasks from one list (category) to another by dragging card elements.
 * The actual DOM manipulation is kept minimal; the primary side effect is updating
 * the task's `listId` in the runtime data store, which triggers a renderer refresh.
 */
import { tasks, runtime } from "../core/runtime.js";
import { UUID } from "../core/types.js";

/** The ID of the task currently being dragged, or empty if nothing is being dragged. */
let draggedElement: UUID = UUID.empty;

/**
 * Description for applying drag-and-drop behaviour to a set of cards and collections.
 */
export interface DragBehaviourDesc {
  /** The list container elements that serve as valid drop targets. */
  collections: HTMLElement[];
  /** Pairs of card elements and their associated grabber elements. */
  entries: {
    /** The task card element. */
    card: HTMLElement;
    /** The grabber/handle element used to initiate a drag. */
    grabber: HTMLElement;
  }[];
  /** The list ID that the cards in `entries` originally belong to. */
  listId: UUID;
}

/**
 * Applies drag-and-drop behaviour to the provided entries and collections.
 *
 * For each card/grabber pair, enables dragging when the grabber is hovered.
 * For each collection, makes it a valid drop target by handling `dragover`
 * and `drop` events.
 *
 * @param desc - The description containing collections, entries, and list information.
 */
export function applyDraggableBehaviour(desc: DragBehaviourDesc) {
  const { collections, entries, listId } = desc;

  entries.forEach(({ card, grabber }) => {
    applyDragBehaviourToCard(collections, grabber, card, listId);
  });

  collections.forEach((_, index: number) => {
    applyDragBehaviourToCollection(collections, index);
  });
}

/**
 * Applies drag-to-start behaviour to a single card via its grabber element.
 *
 * When the user hovers over the grabber, the card becomes draggable. On drag
 * start, all collections are visually marked as drop targets and the card is
 * lifted visually. The dragged task ID is stored in module state.
 *
 * @param collections - All valid drop target collections.
 * @param grabber - The element that initiates a drag when hovered.
 * @param cardElement - The card element to make draggable.
 * @param parentListId - The list this card currently belongs to (unused for logic but passed through).
 * @param currentTaskId - The ID of the task associated with this card.
 */
function applyDragBehaviourToCard(
  collections: HTMLElement[],
  grabber: HTMLElement,
  cardElement: HTMLElement,
  currentTaskId: UUID,
) {
  /** When hovering the grabber, enable dragging on the card. */
  grabber.onmouseenter = () => {
    cardElement.draggable = true;
  };

  /** When leaving the grabber, disable dragging to avoid accidental drags. */
  grabber.onmouseleave = () => {
    cardElement.draggable = false;
  };

  /**
   * Callback invoked when a drag operation begins on this card.
   * Marks all collections as potential drop targets and lifts the card visually.
   */
  function onStartDraggingCard(event: DragEvent) {
    collections.forEach((collection) => {
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

/**
 * Applies drop-target behaviour to a single collection element.
 *
 * Prevents the default drag-over handling to allow dropping, and on `drop`
 * moves the currently dragged task into this collection's list. If the drop
 * target is not a valid category collection, or if the task doesn't exist
 * in the store, the drop is silently ignored.
 *
 * @param collection - The collection element to make droppable.
 */
function applyDragBehaviourToCollection(
  collections: HTMLElement[],
  currentCollectionIndex: number,
) {
  const collection = collections[currentCollectionIndex];
  if (!collection) {
    return;
  }
  /** Allow this collection to be a drop target by preventing default drag-over behaviour. */
  collection.ondragover = (e: DragEvent) => {
    e.preventDefault();
  };

  /**
   * Handle a drop event on this collection.
   *
   * Validates that the drop target is a valid category collection and that the
   * dragged task exists in the store. If so, updates the task's `listId` to this
   * collection's ID and refreshes the app renderer.
   */
  collection.ondrop = (e: DragEvent) => {
    e.preventDefault();

    collections.forEach((collection) => {
      collection.classList.remove("marked-for-drop");
    });

    const targetElement: HTMLElement = e.target as HTMLElement;
    if (!targetElement.id.match("category__collection")) {
      return;
    }
    const targetListId: UUID =
      targetElement.getAttribute("data-id") ?? UUID.empty;

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
