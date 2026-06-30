export {};
/**
 * Represents the state and content of a context menu.
 */
export interface ContextMenu {
    /** The content to display in the menu, either an array of options or a custom HTMLElement. */
    content: ContextMenuOption[] | HTMLElement | undefined;
    /** The position where the menu should be displayed. */
    position: {
        x: number;
        y: number;
    };
    /** Whether the menu is currently open. */
    openState: boolean;
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
export declare const ContextMenu: {
    /**
     * Opens a context menu with the specified content and position.
     *
     * @param content - The content to display in the menu, either an array of options or a custom HTMLElement.
     * @param position - The position where the menu should be displayed, as coordinates or an HTMLElement (uses its bounding rect).
     * @param openState - Whether the menu is initially open. Defaults to true.
     */
    openMenu<TElement extends HTMLElement>(content: ContextMenuOption[] | TElement, position: {
        x: number;
        y: number;
    } | TElement, openState?: boolean): void;
    /**
     * Closes the currently open context menu.
     */
    closeMenu(): void;
};
/**
 * Renders the context menu into the application root element based on current instructions.
 */
export declare function renderContextMenu(): void;
//# sourceMappingURL=context-menu.d.ts.map