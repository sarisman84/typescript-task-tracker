import { app, UUID } from "../core/data.js";
import { htmlUtils } from "../utility/html/html-utils.js";
export {};
let contextMenu = undefined;
/**
 * Draws a context menu with the specified options.
 * Initializes the context menu if it hasn't been created yet, clears any existing items,
 * and populates it with links based on the provided options.
 *
 * @param options - Array of context menu option objects containing labels and click event handlers.
 * @returns The ContextMenu object containing the menu's id and element reference.
 */
export function drawContextMenu(options, openState = true) {
    if (!contextMenu) {
        contextMenu = initializeContextMenu();
    }
    clearMenu(true);
    const { element } = contextMenu;
    options.forEach((entry) => {
        const listEntry = htmlUtils.createElement("li", [
            "context-menu__link",
        ]);
        listEntry.events.onClick(() => {
            if (!entry.event()) {
                closeMenu();
            }
        });
        const link = htmlUtils.createElement("span", [
            "context-menu__label",
        ]);
        link.textContent = entry.label;
        listEntry.append(link);
        element.append(listEntry);
    });
    if (openState) {
        openMenu();
    }
    return contextMenu;
}
/**
 * Draws a custom context menu by appending a custom element to the menu.
 * Initializes the context menu if it hasn't been created yet, clears any existing items,
 * and appends the provided custom element.
 *
 * @param elementToAdd - The HTML element to add to the context menu.
 * @returns The ContextMenu object containing the menu's id and element reference.
 */
export function drawCustomContextMenu(elementToAdd) {
    if (!contextMenu) {
        contextMenu = initializeContextMenu();
    }
    clearMenu(true);
    contextMenu.element.append(elementToAdd);
    return contextMenu;
}
/**
 * Sets the position of the context menu on the page.
 * Updates the CSS left and top styles of the menu element to the specified coordinates.
 *
 * @param x - The horizontal position in pixels from the left edge of the viewport.
 * @param y - The vertical position in pixels from the top edge of the viewport.
 */
export function setContextMenuPos(x, y) {
    if (!contextMenu) {
        return;
    }
    contextMenu.element.style.left = `${x}px`;
    contextMenu.element.style.top = `${y}px`;
}
/**
 *  Sets the position of the context menu to the top-left corner of a target element.
 *  Updates the CSS left and top styles of the menu element to match the target element's position.
 *
 * @param targetElement - The HTMLElement whose position will be used as the reference for the menu's placement.
 */
export function setContextMenuPosToTarget(targetElement) {
    const rect = targetElement.getBoundingClientRect();
    setContextMenuPos(rect.left, rect.top);
}
/**
 * Closes the context menu by setting its data-state attribute to "close".
 * Triggers CSS transitions or animations defined for the close state.
 */
export function closeMenu() {
    if (!contextMenu) {
        return;
    }
    contextMenu.element.setAttribute("data-state", "close");
}
/**
 * Opens the context menu by setting its data-state attribute to "open".
 * Triggers CSS transitions or animations defined for the open state.
 */
export function openMenu() {
    if (!contextMenu) {
        return;
    }
    contextMenu.element.setAttribute("data-state", "open");
}
/**
 * Clears all items from the context menu.
 * Optionally closes the menu after clearing based on the fullyClear parameter.
 *
 * @param fullyClear - Whether to also close the menu after clearing its contents. Defaults to true.
 */
export function clearMenu(fullyClear = true) {
    if (!contextMenu) {
        return;
    }
    contextMenu.element.innerHTML = "";
    if (fullyClear) {
        closeMenu();
    }
}
function initializeContextMenu() {
    const menu = htmlUtils.createElement("ul", [
        "context-menu",
    ]);
    app.append(menu);
    return { id: UUID.new(), element: menu };
}
//# sourceMappingURL=context-menu.js.map