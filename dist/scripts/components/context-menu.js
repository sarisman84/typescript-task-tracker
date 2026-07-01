import { UUID } from "../core/types.js";
import { app, runtime } from "../core/runtime.js";
import { htmlUtils } from "../utility/html/html-utils.js";
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
            cooldown: startTimer(),
        };
        console.log(`[Log][ContextMenu/openMenu]: Opening context menu at ${pos.x}, ${pos.y} with content: ${content}`);
        runtime.refreshAppRender();
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
    if (!app) {
        console.error(`[Error][ContextMenu/renderContextMenu]: App root element not found. Cannot render context menu.`);
        return;
    }
    if (currentInstructions.content === undefined) {
        console.warn(`[Warn][ContextMenu/renderContextMenu]: No content to render in context menu. Skipping!`);
        return;
    }
    const { content, position, openState } = currentInstructions;
    const menu = htmlUtils.createElement("ul", "context-menu", [
        "context-menu",
    ]);
    {
        if (content instanceof HTMLElement) {
            menu.append(content);
        }
        else {
            const options = content;
            options.forEach((entry) => {
                const listEntry = htmlUtils.createElement("li", "context-menu__link", ["context-menu__link"]);
                listEntry.events.onClick(() => {
                    if (!entry.event()) {
                        currentInstructions.openState = false;
                        runtime.refreshAppRender();
                    }
                });
                const link = htmlUtils.createElement("span", "context-menu__label", ["context-menu__label"]);
                link.textContent = entry.label;
                listEntry.append(link);
                menu.append(listEntry);
            });
        }
        menu.style.left = `${position.x}px`;
        menu.style.top = `${position.y}px`;
        menu.setAttribute("data-state", currentInstructions.openState ? "open" : "close");
    }
    app.events.onClick((event) => {
        if (currentInstructions.cooldown >= Date.now() ||
            !currentInstructions.openState ||
            menu.getAttribute("data-state") === "close") {
            return;
        }
        currentInstructions.openState = false;
        runtime.refreshAppRender();
        console.log(`[Log][ContextMenu/renderContextMenu/appClick]: Closing context menu due to click outside.`);
    });
    app.append(menu);
}
function startTimer() {
    return Date.now() + 50; // 1 second cooldown
}
let currentInstructions = {
    content: undefined,
    position: { x: 0, y: 0 },
    openState: false,
    cooldown: 0,
};
//# sourceMappingURL=context-menu.js.map