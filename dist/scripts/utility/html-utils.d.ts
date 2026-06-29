import type { HTMLTag } from "./html-tag.js";
export interface HTMLContextMenuOption {
    name: string;
    selectEvent: () => void;
}
export interface HTMLContextMenu extends HTMLElement {
}
export declare const htmlUtils: {
    /**
     * Creates a new DOM element of the specified type with the given CSS classes.
     *
     * @param type - The tag name of the element to create (e.g., 'div', 'span', 'button').
     * @param classList - An optional array of CSS class names to apply to the element.
     * @returns The newly created HTMLElement, cast to the specified type T.
     */
    createElement<T extends HTMLElement>(type: HTMLTag, classList?: string[]): T;
    createForm(classList?: string[]): HTMLElement;
    createInput(classList?: string[]): HTMLInputElement;
    /**
     * Creates a dropdown (select) element with the given options and change handler.
     *
     * @param classList - An optional array of CSS class names to apply to the select element.
     * @param options - An array of strings representing the available options in the dropdown.
     * @param selectedValue - The value to initially select. Defaults to the first option if not provided or empty.
     * @param onChange - A callback function invoked when the user selects a different option. Receives the selected value as its argument.
     * @returns The newly created HTMLSelectElement with the specified options and change listener.
     */
    createDropdown(classList: string[] | undefined, options: string[], selectedValue: string | undefined, onChange: (value: string) => void): HTMLSelectElement;
    createContextMenu(options: HTMLContextMenuOption[], id: string | undefined, classList: {
        button: string[];
        menu: string[];
        options: string[];
    }): HTMLButtonElement;
};
//# sourceMappingURL=html-utils.d.ts.map