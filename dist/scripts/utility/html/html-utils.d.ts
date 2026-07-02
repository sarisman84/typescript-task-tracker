import type { HTMLTag } from "./html-tag.js";
export {};
declare global {
    interface NodeListOf<TNode extends Node> {
        toArray(): TNode[];
    }
}
export declare const extensions: {
    applyNodeListOfExtensions<TNode extends Node>(value: NodeListOf<TNode>): void;
};
export declare const htmlUtils: {
    /**
     * Creates a new DOM element of the specified type with the given CSS classes.
     *
     * @param type - The tag name of the element to create (e.g., 'div', 'span', 'button').
     * @param classList - An optional array of CSS class names to apply to the element.
     * @returns The newly created HTMLElement, cast to the specified type T.
     */
    createElement<T extends HTMLElement>(type: HTMLTag, id?: string, classList?: string[]): T;
    createForm(id?: string, classList?: string[]): HTMLElement;
    createInput(id?: string, classList?: string[]): HTMLInputElement;
    createLabel(id?: string, classList?: string[]): HTMLLabelElement;
    getElementById<TElement extends HTMLElement>(id: string): TElement | null;
    querySelector<TElement extends Element>(selector: string, root?: Element | Document): TElement | null;
    querySelectorAll<TElement extends Element>(selector: string, root?: Element | Document): TElement[] | Element[];
};
//# sourceMappingURL=html-utils.d.ts.map