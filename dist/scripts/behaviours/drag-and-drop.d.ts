import { UUID } from "../core/types.js";
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
export declare function applyDraggableBehaviour(desc: DragBehaviourDesc): void;
//# sourceMappingURL=drag-and-drop.d.ts.map