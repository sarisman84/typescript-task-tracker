import { UUID } from "../core/types.js";
export interface DragBehaviourDesc {
    cards: HTMLElement[];
    list: HTMLElement;
    listId: UUID;
}
export declare function applyDraggableBehaviour(desc: DragBehaviourDesc): void;
//# sourceMappingURL=drag-and-drop.d.ts.map