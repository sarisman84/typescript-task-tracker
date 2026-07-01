import { UUID } from "../core/types.js";
import { app, runtime } from "../core/runtime.js";
import { htmlUtils } from "../utility/html/html-utils.js";

/**
 * Represents the state and content of a context menu.
 */
interface ContextMenu {
  /** The content to display in the menu, either an array of options or a custom HTMLElement. */
  content: ContextMenuOption[] | HTMLElement | undefined;
  /** The position where the menu should be displayed. */
  position: { x: number; y: number };
  /** Whether the menu is currently open. */
  openState: boolean;
  cooldown: number; // A cooldown timer to prevent rapid toggling of the menu
}

/**
 * Represents a single option in a context menu.
 */
export interface ContextMenuOption {
  /** The label text to display for this option. */
  label: string;
  /** The callback function executed when this option is selected. If it returns false, the menu will close. */
  event: () => boolean | void;
}

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
  openMenu<TElement extends HTMLElement>(
    content: ContextMenuOption[] | TElement,
    position: { x: number; y: number } | TElement | PointerEvent,
    openState: boolean = true,
  ): void {
    let pos: { x: number; y: number } = { x: 0, y: 0 };
    const type = Object.prototype.toString.call(position).slice(8, -1);

    if (type === "PointerEvent") {
      pos = {
        x: (position as PointerEvent).clientX,
        y: (position as PointerEvent).clientY,
      };
    } else if (type.match(/HTML.*Element/)) {
      const rect = (position as HTMLElement).getBoundingClientRect();
      pos = {
        x: rect.left,
        y: rect.top,
      };
    } else if (type === "Object") {
      pos = {
        x: (position as { x: number; y: number }).x,
        y: (position as { x: number; y: number }).y,
      };
    }

    currentInstructions = {
      content,
      position: pos,
      openState,
      cooldown: startTimer(),
    };

    console.log(
      `[Log][ContextMenu/openMenu]: Opening context menu at ${pos.x}, ${pos.y} with content: ${content}`,
    );
    runtime.refreshAppRender();
  },

  /**
   * Closes the currently open context menu.
   */
  closeMenu(): void {
    currentInstructions.openState = false;
  },
};

/**
 * Renders the context menu into the application root element based on current instructions.
 */
export function renderContextMenu(): void {
  if (!app) {
    console.error(
      `[Error][ContextMenu/renderContextMenu]: App root element not found. Cannot render context menu.`,
    );
    return;
  }
  if (currentInstructions.content === undefined) {
    console.warn(
      `[Warn][ContextMenu/renderContextMenu]: No content to render in context menu. Skipping!`,
    );
    return;
  }

  const { content, position, openState } = currentInstructions;

  const menu: HTMLUListElement = htmlUtils.createElement("ul", "context-menu", [
    "context-menu",
  ]);
  {
    if (content instanceof HTMLElement) {
      menu.append(content as HTMLElement);
    } else {
      const options: ContextMenuOption[] = content as ContextMenuOption[];
      options.forEach((entry) => {
        const listEntry: HTMLLIElement = htmlUtils.createElement(
          "li",
          "context-menu__link",
          ["context-menu__link"],
        );
        listEntry.events.onClick(() => {
          if (!entry.event()) {
            currentInstructions.openState = false;
            runtime.refreshAppRender();
          }
        });
        const link: HTMLElement = htmlUtils.createElement(
          "span",
          "context-menu__label",
          ["context-menu__label"],
        );
        link.textContent = entry.label;

        listEntry.append(link);
        menu.append(listEntry);
      });
    }

    menu.style.left = `${position.x}px`;
    menu.style.top = `${position.y}px`;

    menu.setAttribute(
      "data-state",
      currentInstructions.openState ? "open" : "close",
    );
  }
  app.events.onClick((event: PointerEvent) => {
    if (
      currentInstructions.cooldown >= Date.now() ||
      !currentInstructions.openState ||
      menu.getAttribute("data-state") === "close"
    ) {
      return;
    }

    currentInstructions.openState = false;
    runtime.refreshAppRender();
    console.log(
      `[Log][ContextMenu/renderContextMenu/appClick]: Closing context menu due to click outside.`,
    );
  });

  app.append(menu);
}

function startTimer(): number {
  return Date.now() + 50; // 1 second cooldown
}

let currentInstructions: ContextMenu = {
  content: undefined,
  position: { x: 0, y: 0 },
  openState: false,
  cooldown: 0,
};
