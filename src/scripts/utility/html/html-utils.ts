import type { HTMLTag } from "./html-tag.js";
import type { HTMLContextMenuOption } from "./custom types/html-context-menu.js";
import stringUtils from "../string-utils.js";

export {};

declare global {
  interface NodeListOf<TNode extends Node> {
    toArray(): TNode[];
  }
}

export const extensions = {
  applyNodeListOfExtensions<TNode extends Node>(
    value: NodeListOf<TNode>,
  ): void {
    value.toArray = (): TNode[] => Array.from(value.values());
  },
};

export const htmlUtils = {
  /**
   * Creates a new DOM element of the specified type with the given CSS classes.
   *
   * @param type - The tag name of the element to create (e.g., 'div', 'span', 'button').
   * @param classList - An optional array of CSS class names to apply to the element.
   * @returns The newly created HTMLElement, cast to the specified type T.
   */
  createElement<T extends HTMLElement>(
    type: HTMLTag,
    id?: string,
    classList: string[] = [],
  ): T {
    const element: T = document.createElement(type) as T;
    if (id) element.id = id; // Set the ID if provided

    if (classList && classList.length > 0) {
      const normalClasses = classList.filter((cls) => !cls.startsWith("fa-"));
      element.classList.add(...normalClasses); // Add all classes to the element

      const fontAwesomeClasses = classList.filter((cls) =>
        cls.startsWith("fa-"),
      );
      if (fontAwesomeClasses.length > 0) {
        const iconElement: HTMLElement = document.createElement("i");
        iconElement.id = `${id}-icon`;
        iconElement.classList.add(...fontAwesomeClasses); // Add all FA classes to the icon element
        element.append(iconElement); // Append the icon element to the main element
      }
    }
    return element;
  },

  createForm(id?: string, classList: string[] = []): HTMLElement {
    return this.createElement("form", id, classList);
  },

  createInput(id?: string, classList: string[] = []): HTMLInputElement {
    return this.createElement("input", id, classList);
  },

  createLabel(id?: string, classList: string[] = []): HTMLLabelElement {
    return this.createElement("label", id, classList);
  },

  getElementById<TElement extends HTMLElement>(id: string): TElement | null {
    const element: HTMLElement | null = document.getElementById(id);
    if (!element) {
      console.error(
        `[Error][htmlUtils.getElementById]: No element found with ID "${id}"`,
      );
      return null;
    }
    return element as TElement;
  },

  querySelector<TElement extends Element>(
    selector: string,
    root: Element | Document = document,
  ): TElement | null {
    return root.querySelector(selector);
  },

  querySelectorAll<TElement extends Element>(
    selector: string,
    root: Element | Document = document,
  ): TElement[] | Element[] {
    const result = root.querySelectorAll(selector);
    extensions.applyNodeListOfExtensions(result);
    return result.toArray();
  },
};
