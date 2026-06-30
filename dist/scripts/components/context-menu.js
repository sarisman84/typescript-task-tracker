import { app, UUID } from "../core/data.js";
import { renderApp } from "../core/render.js";
import { htmlUtils } from "../utility/html/html-utils.js";
export {};
/**
 * Namespace for managing context menus.
 */
export const ContextMenu = {
    /**
     * Opens a context menu with the specified content and position.
     *
     * @param content - The content to display in the menu, either an array of options or a custom HTMLElement.
     * @param position - The position where the menu should be displayed, as coordinates or an HTMLElement (uses its bounding rect).
     * @param openState - Whether the menu is initially open. Defaults to true.
     */
    openMenu(content, position, openState = true) {
        let pos;
        if (position instanceof HTMLElement) {
            const rect = position.getBoundingClientRect();
            pos = {
                x: rect.left,
                y: rect.top,
            };
        }
        else {
            pos = {
                x: position.x,
                y: position.y,
            };
        }
        currentInstructions = {
            content,
            position: pos,
            openState,
        };
        console.log(`[Log][ContextMenu/openMenu]: Opening context menu at ${pos.x}, ${pos.y} with content: ${content}`);
        renderApp();
    },
    /**
     * Closes the currently open context menu.
     */
    closeMenu() {
        currentInstructions.openState = false;
    },
};
/**
 * Renders the context menu into the application root element based on current instructions.
 */
export function renderContextMenu() {
    if (currentInstructions.content === undefined) {
        console.warn(`[Warn][ContextMenu/renderContextMenu]: No content to render in context menu. Skipping!`);
        return;
    }
    const { content, position, openState } = currentInstructions;
    const menu = htmlUtils.createElement("ul", [
        "context-menu",
    ]);
    {
        if (content instanceof HTMLElement) {
            menu.append(content);
        }
        else {
            const options = content;
            options.forEach((entry) => {
                const listEntry = htmlUtils.createElement("li", [
                    "context-menu__link",
                ]);
                listEntry.events.onClick(() => {
                    if (!entry.event()) {
                        currentInstructions.openState = false;
                        renderApp();
                    }
                });
                const link = htmlUtils.createElement("span", [
                    "context-menu__label",
                ]);
                link.textContent = entry.label;
                listEntry.append(link);
                menu.append(listEntry);
            });
        }
        menu.style.left = `${position.x}px`;
        menu.style.top = `${position.y}px`;
        menu.setAttribute("data-state", currentInstructions.openState ? "open" : "close");
    }
    app.append(menu);
}
let currentInstructions = {
    content: undefined,
    position: { x: 0, y: 0 },
    openState: false,
};
//# sourceMappingURL=context-menu.js.map