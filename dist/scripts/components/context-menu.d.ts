import { UUID } from "../core/data.js";
export {};
export interface ContextMenu {
    id: UUID;
    element: HTMLUListElement;
}
export interface ContextMenuOption {
    label: string;
    event: () => boolean | void;
}
/**
 * Draws a context menu with the specified options.
 * Initializes the context menu if it hasn't been created yet, clears any existing items,
 * and populates it with links based on the provided options.
 *
 * @param options - Array of context menu option objects containing labels and click event handlers.
 * @returns The ContextMenu object containing the menu's id and element reference.
 */
export declare function drawContextMenu(options: ContextMenuOption[], openState?: boolean): ContextMenu;
/**
 * Draws a custom context menu by appending a custom element to the menu.
 * Initializes the context menu if it hasn't been created yet, clears any existing items,
 * and appends the provided custom element.
 *
 * @param elementToAdd - The HTML element to add to the context menu.
 * @returns The ContextMenu object containing the menu's id and element reference.
 */
export declare function drawCustomContextMenu<TElement extends HTMLElement>(elementToAdd: TElement): ContextMenu;
/**
 * Sets the position of the context menu on the page.
 * Updates the CSS left and top styles of the menu element to the specified coordinates.
 *
 * @param x - The horizontal position in pixels from the left edge of the viewport.
 * @param y - The vertical position in pixels from the top edge of the viewport.
 */
export declare function setContextMenuPos(x: number, y: number): void;
/**
 *  Sets the position of the context menu to the top-left corner of a target element.
 *  Updates the CSS left and top styles of the menu element to match the target element's position.
 *
 * @param targetElement - The HTMLElement whose position will be used as the reference for the menu's placement.
 */
export declare function setContextMenuPosToTarget<TElement extends HTMLElement>(targetElement: TElement): void;
/**
 * Closes the context menu by setting its data-state attribute to "close".
 * Triggers CSS transitions or animations defined for the close state.
 */
export declare function closeMenu(): void;
/**
 * Opens the context menu by setting its data-state attribute to "open".
 * Triggers CSS transitions or animations defined for the open state.
 */
export declare function openMenu(): void;
/**
 * Clears all items from the context menu.
 * Optionally closes the menu after clearing based on the fullyClear parameter.
 *
 * @param fullyClear - Whether to also close the menu after clearing its contents. Defaults to true.
 */
export declare function clearMenu(fullyClear?: boolean): void;
//# sourceMappingURL=context-menu.d.ts.map